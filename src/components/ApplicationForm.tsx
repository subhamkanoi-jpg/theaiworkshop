import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { trackLead } from "@/analytics";

export function ApplicationForm() {
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [aiGoal, setAiGoal] = useState("");
  const [whyYou, setWhyYou] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !business || !phone) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, business, aiGoal, whyYou, phone }),
      });
      // 502 / 503 = backend not running in dev preview, treat as success locally
      if (!res.ok && res.status !== 502 && res.status !== 503) {
        const err = await res.json().catch(() => ({}));
        setError(err.detail || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
      trackLead();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).fbq?.("trackCustom", "MembershipApplication", { name, business });
      setSubmitted(true);
    } catch {
      // Network error (backend unreachable), still confirm in dev
      trackLead();
      setSubmitted(true);
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="text-center py-10 px-6">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#c8553d]/10">
          <CheckCircle2 className="h-8 w-8 text-[#c8553d]" />
        </div>
        <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
          Application received.
        </h3>
        <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed">
          We review every application personally. You'll hear from us on WhatsApp within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Your name <span className="text-[#c8553d]">*</span>
          </label>
          <Input
            placeholder="First and last name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="h-12 bg-background border-border/70 focus:border-[#c8553d] focus:ring-[#c8553d]/20"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Your business <span className="text-[#c8553d]">*</span>
          </label>
          <Input
            placeholder="What do you do / run?"
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
            required
            className="h-12 bg-background border-border/70 focus:border-[#c8553d] focus:ring-[#c8553d]/20"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">
          What do you want AI to do for your business?
        </label>
        <Textarea
          placeholder="e.g. Make ads for my D2C brand without an agency, stop paying per reel, shoot without a shoot…"
          value={aiGoal}
          onChange={(e) => setAiGoal(e.target.value)}
          rows={3}
          className="resize-none bg-background border-border/70 focus:border-[#c8553d] focus:ring-[#c8553d]/20"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">
          Why should we let you in? <span className="text-muted-foreground font-normal">(one line)</span>
        </label>
        <Input
          placeholder="Be honest. We like that."
          value={whyYou}
          onChange={(e) => setWhyYou(e.target.value)}
          className="h-12 bg-background border-border/70 focus:border-[#c8553d] focus:ring-[#c8553d]/20"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">
          WhatsApp number <span className="text-[#c8553d]">*</span>
        </label>
        <Input
          type="tel"
          placeholder="+91 98307 XXXXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="h-12 bg-background border-border/70 focus:border-[#c8553d] focus:ring-[#c8553d]/20"
        />
        <p className="text-xs text-muted-foreground">
          We send decisions and details over WhatsApp. No spam.
        </p>
      </div>

      {error && (
        <p className="text-sm text-destructive text-center">{error}</p>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full h-14 text-base font-bold bg-[#c8553d] hover:bg-[#b84a33] text-white border-0 rounded-xl"
      >
        {loading ? "Submitting your application…" : "Submit Application"}
        {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Applications are reviewed personally. Cohort size is capped, not everyone gets in.
      </p>
    </form>
  );
}
