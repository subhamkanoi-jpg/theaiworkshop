import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  IndianRupee,
  BadgeCheck,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  Lock,
  Gift,
  Phone,
} from "lucide-react";
import { trackBeginCheckout, trackPurchase, trackContact } from "@/analytics";
import {
  PRICE,
  MARKET_VALUE,
  WORKSHOP_DATE_LABEL,
  inr,
  valueStack,
  WHATSAPP_URL,
  PHONE_TEL,
  PHONE_DISPLAY,
} from "@/config";

/**
 * The booking experience (offer summary + payment form), shared by the home
 * page (#register section) and the standalone /book page.
 */
function apiError(data: unknown, fallback: string) {
  if (data && typeof data === "object" && "detail" in data) {
    const detail = (data as { detail: unknown }).detail;
    if (typeof detail === "string") return detail;
  }
  return fallback;
}

export function Registration() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"online" | "venue">("online");

  const handleVenuePayment = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(apiError(data, "Could not reserve your seat. Please try again."));
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    if (paymentMethod === "venue") {
      await handleVenuePayment();
      return;
    }

    setLoading(true);
    setError("");
    trackBeginCheckout(PRICE, email, phone, name);

    try {
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });

      const orderData = await orderRes.json().catch(() => ({}));
      if (!orderRes.ok) {
        setError(apiError(orderData, "Failed to create order. Please try again."));
        setLoading(false);
        return;
      }

      if (!orderData.razorpay_key_id) {
        setError("Payment is not available right now. Please contact support.");
        setLoading(false);
        return;
      }

      const options = {
        key: orderData.razorpay_key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "The AI Workshop",
        description: `Workshop Registration — ${WORKSHOP_DATE_LABEL}`,
        order_id: orderData.order_id,
        prefill: {
          name: name,
          email: email,
          contact: phone,
        },
        theme: {
          color: "#c8553d",
        },
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          if (verifyRes.ok) {
            trackPurchase(PRICE, email, phone, name);
            setSubmitted(true);
          } else {
            setError(
              `Payment went through but confirmation failed. Contact support with payment ID ${response.razorpay_payment_id}.`
            );
          }
          setLoading(false);
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rzp = new (window as any).Razorpay(options);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rzp.on("payment.failed", function (response: any) {
        setError(response?.error?.description || "Payment failed. Please try again.");
        setLoading(false);
      });
      rzp.open();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div data-reveal-children className="grid md:grid-cols-2 gap-6 items-start">
      {/* Offer summary */}
      <Card className="order-2 md:order-1 border-primary/20 bg-primary/5">
        <CardContent className="p-5 sm:p-8">
          <div className="flex items-end gap-3">
            <span className="text-4xl font-extrabold text-foreground flex items-center">
              <IndianRupee className="h-7 w-7" />{PRICE}
            </span>
            <span className="text-lg text-muted-foreground line-through mb-1">{inr(MARKET_VALUE)}</span>
            <span className="mb-1.5 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-bold text-accent">
              Community price
            </span>
          </div>
          <p className="mt-1 text-sm font-medium text-primary">Community pricing · Workshop #3 · The Magic of AI</p>

          <div className="mt-6 space-y-3">
            {valueStack.map((row, i) => (
              <div key={i} className="flex items-center justify-between gap-3 text-sm">
                <span className="flex items-start gap-2 text-foreground">
                  <BadgeCheck className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  {row.item}
                </span>
                <span className="text-muted-foreground whitespace-nowrap">{row.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-border pt-5">
            <p className="text-sm font-semibold text-muted-foreground mb-2">
              How much you actually save
            </p>
            <div className="rounded-xl bg-accent/10 border border-accent/20 p-4 flex items-start gap-3">
              <TrendingUp className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
              <div>
                <p className="text-2xl font-extrabold text-foreground">₹3,000–₹8,000 a kit</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  what a freelancer charges for a week of posts and a bio — made in the room, reusable on Tuesday.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
            * A free Google account is enough. Paid Claude or ChatGPT is welcome if you already live there — the recipe is the same. The {inr(PRICE)} covers the hall — any surplus goes back into the community.
          </p>

          <div className="mt-5 rounded-xl bg-background/70 border border-border p-4 flex gap-3">
            <ShieldCheck className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Our promise:</strong> spend the 3 hours with us and
              you&apos;ll leave with a week of work made from how you talk — or we&apos;ll work with you until you do.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      <Card className="order-1 md:order-2">
        <CardContent className="pt-6 pb-5 px-5 sm:pt-8 sm:pb-6 sm:px-6">
          {submitted ? (
            <div className="text-center py-6">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {paymentMethod === "venue" ? "Seat reserved! 🎉" : "You're in! 🎉"}
              </h3>
              <p className="text-muted-foreground">
                {paymentMethod === "venue"
                  ? `Your seat for ${WORKSHOP_DATE_LABEL} is reserved. Please bring ${inr(PRICE)} cash to pay at the venue — we'll hold your spot until 15 minutes before the session.`
                  : `Payment successful — your seat for ${WORKSHOP_DATE_LABEL} is confirmed, and a confirmation email is on its way.`}
              </p>

              <div className="mt-6 rounded-xl border border-[#25D366]/30 bg-[#25D366]/5 p-5 text-left">
                <p className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#25D366] text-white text-xs">1</span>
                  One last step
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Join the workshop WhatsApp group — it's where we'll share the venue, timings, reminders, and where you'll meet your cohort. Don't skip this!
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContact("whatsapp")}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1ebe57] transition-colors"
                >
                  <MessageCircle className="h-5 w-5" /> Join the Workshop Group
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Payment method toggle */}
              <div className="space-y-2 text-left">
                <label className="text-sm font-medium text-foreground">How would you like to pay?</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("online")}
                    className={`flex flex-col items-center justify-center gap-1 rounded-xl border-2 p-3 min-h-[4.25rem] text-sm font-medium transition-colors ${
                      paymentMethod === "online"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    <Lock className="h-4 w-4" />
                    Pay Online
                    <span className="text-xs font-normal opacity-75">UPI · Cards · Netbanking</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("venue")}
                    className={`flex flex-col items-center justify-center gap-1 rounded-xl border-2 p-3 min-h-[4.25rem] text-sm font-medium transition-colors ${
                      paymentMethod === "venue"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    <Phone className="h-4 w-4" />
                    Pay at Venue
                    <span className="text-xs font-normal opacity-75">Cash on the day</span>
                  </button>
                </div>
                {paymentMethod === "venue" && (
                  <p className="text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">
                    Reserve your seat now — bring <strong className="text-foreground">{inr(PRICE)} cash</strong> on the day. We'll hold your spot until 15 minutes before the session starts.
                  </p>
                )}
              </div>

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
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
              </div>
              {error && (
                <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}
              <Button type="submit" size="lg" className="w-full mt-2 min-h-12 text-base" disabled={loading}>
                {loading
                  ? "Processing..."
                  : paymentMethod === "venue"
                  ? `Reserve · pay ${inr(PRICE)} at venue`
                  : `Pay ${inr(PRICE)}`}
                {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
              </Button>
              {paymentMethod === "online" && (
                <div className="flex items-center justify-center gap-4 pt-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Lock className="h-3.5 w-3.5" /> Secured by Razorpay</span>
                  <span className="inline-flex items-center gap-1"><Gift className="h-3.5 w-3.5" /> UPI · Cards · Netbanking</span>
                </div>
              )}
              <p className="text-center text-sm text-muted-foreground pt-2">
                Questions before you pay?{" "}
                <a
                  href={`tel:${PHONE_TEL}`}
                  onClick={() => trackContact("phone")}
                  className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                >
                  <Phone className="h-3.5 w-3.5" /> {PHONE_DISPLAY}
                </a>
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
