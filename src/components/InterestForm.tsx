import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, ArrowRight, Bell } from "lucide-react";
import { trackLead } from "@/analytics";

/**
 * "Show of interest" form. No payment, no commitment — a lightweight way for
 * people who want future / similar workshops to put their hand up so we can
 * notify them when the next one is announced. Submissions POST to /api/interest.
 */
export function InterestForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [interest, setInterest] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contact) return;
    setLoading(true);
    try {
      const res = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, interest }),
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
    <Card className="border-primary/20">
      <CardContent className="pt-8 pb-6 px-6 sm:px-8">
        {submitted ? (
          <div className="text-center py-6">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">You're on the list! 🎉</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Thanks for raising your hand. We'll reach out the moment a workshop that fits
              what you're after is announced.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
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
                <label className="text-sm font-medium text-foreground">Phone or Email</label>
                <Input
                  placeholder="So we can reach you"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                  className="h-12"
                />
              </div>
            </div>
            <div className="space-y-2 text-left">
              <label className="text-sm font-medium text-foreground">
                What would you love to learn?{" "}
                <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <Textarea
                placeholder="e.g. Using AI for my business, automating WhatsApp replies, building an online store…"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                rows={3}
                className="resize-none"
              />
            </div>
            <Button type="submit" size="lg" className="w-full mt-2" disabled={loading}>
              {loading ? "Submitting..." : "Notify me about future workshops"}{" "}
              {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
            </Button>
            <p className="text-center text-xs text-muted-foreground pt-1 flex items-center justify-center gap-1.5">
              <Bell className="h-3.5 w-3.5" />
              No spam — just a heads-up when something relevant comes up.
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
