import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Users,
  Sparkles,
  CalendarDays,
} from "lucide-react";
import { trackLead, trackContact } from "@/analytics";
import { HOST_WHATSAPP_URL } from "@/config";

/**
 * "Become a Host" application form. No payment — just a lightweight pitch so
 * practitioners who've implemented AI in their own business can apply to run
 * a 3-hour hands-on workshop. Submissions POST to /api/become-host.
 */
export function BecomeHost() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [useCase, setUseCase] = useState("");
  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // The workshop can only run on a weekend. Parse the date in local time
  // (avoid `new Date("YYYY-MM-DD")`, which is treated as UTC and can shift the
  // weekday across timezones) and confirm it's a Saturday or Sunday.
  const isWeekend = (value: string) => {
    const [y, m, d] = value.split("-").map(Number);
    if (!y || !m || !d) return false;
    const day = new Date(y, m - 1, d).getDay(); // 0 = Sun, 6 = Sat
    return day === 0 || day === 6;
  };

  const handleDateChange = (value: string) => {
    setDate(value);
    if (value && !isWeekend(value)) {
      setDateError("Please pick a Saturday or Sunday — workshops only run on weekends.");
    } else {
      setDateError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !useCase || !date) return;
    if (!isWeekend(date)) {
      setDateError("Please pick a Saturday or Sunday — workshops only run on weekends.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/become-host", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, use_case: useCase, workshop_date: date }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.detail || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
      trackLead();
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 items-start">
      {/* Pitch */}
      <Card className="order-2 md:order-1 border-primary/20 bg-primary/5">
        <CardContent className="p-7 sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary mb-4">
            <Sparkles className="h-4 w-4" />
            Teach what you've built
          </div>
          <h3 className="text-2xl font-bold text-foreground">
            Have you put AI to work in your own business?
          </h3>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            If you've actually implemented an AI use-case — and you're confident enough to teach it
            in a 3-hour hands-on live workshop — we want to hear from you. This is how we
            democratize the workshop and grow it into a real community of learners.
          </p>

          <div className="mt-6 space-y-3 text-sm">
            <div className="flex items-start gap-2 text-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              You bring a real, proven use-case — not just theory.
            </div>
            <div className="flex items-start gap-2 text-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              We handle the venue, the crowd, and the logistics.
            </div>
            <div className="flex items-start gap-2 text-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              Workshops run on a Saturday or Sunday — pick a date that suits you.
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-background/70 border border-border p-4 flex gap-3">
            <Users className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">The vision:</strong> a community where anyone with
              a working AI use-case can teach it — and anyone curious can learn it.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      <Card className="order-1 md:order-2">
        <CardContent className="pt-8 pb-6 px-6">
          {submitted ? (
            <div className="text-center py-6">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Application received! 🎉</h3>
              <p className="text-muted-foreground">
                Thanks for stepping up to teach. We'll review your use-case and reach out on the
                number you shared to plan the details.
              </p>

              <div className="mt-6 rounded-xl border border-[#25D366]/30 bg-[#25D366]/5 p-5 text-left">
                <p className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#25D366] text-white text-xs">1</span>
                  One last step
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Join the <strong className="text-foreground">host community</strong> on WhatsApp —
                  it's where we coordinate dates, share what's working, and plan upcoming workshops
                  together. Don't skip this!
                </p>
                <a
                  href={HOST_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContact("whatsapp")}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1ebe57] transition-colors"
                >
                  <MessageCircle className="h-5 w-5" /> Join the Host Community
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2 text-left">
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <Input
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-12"
                />
              </div>
              <div className="space-y-2 text-left">
                <label className="text-sm font-medium text-foreground">Phone Number</label>
                <Input
                  type="tel"
                  placeholder="+91 98XXX XXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="h-12"
                />
              </div>
              <div className="space-y-2 text-left">
                <label className="text-sm font-medium text-foreground">
                  Your AI use-case <span className="text-muted-foreground font-normal">(a line or two)</span>
                </label>
                <Textarea
                  placeholder="e.g. I built an AI bot that handles customer support for my store and cut response time by 80%."
                  value={useCase}
                  onChange={(e) => setUseCase(e.target.value)}
                  required
                  rows={3}
                  className="resize-none"
                />
              </div>
              <div className="space-y-2 text-left">
                <label className="text-sm font-medium text-foreground">
                  Date you can conduct the workshop{" "}
                  <span className="text-muted-foreground font-normal">(Saturday or Sunday only)</span>
                </label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => handleDateChange(e.target.value)}
                  required
                  className="h-12"
                />
                {dateError && (
                  <p className="text-sm text-destructive flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4 flex-shrink-0" /> {dateError}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full mt-2"
                disabled={loading || !!dateError}
              >
                {loading ? "Submitting..." : "Apply to become a host"}{" "}
                {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
              </Button>
              <p className="text-center text-xs text-muted-foreground pt-1">
                We'll review every application personally and reach out to discuss the details.
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
