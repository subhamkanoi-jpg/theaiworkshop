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
  WORKSHOP_AMOUNT,
  PRICE,
  MARKET_VALUE,
  SAVINGS_PCT,
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
export function Registration() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    setLoading(true);
    trackBeginCheckout(PRICE, email, phone, name);

    try {
      // Step 1: Create Razorpay order
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: WORKSHOP_AMOUNT,
          currency: "INR",
          receipt: `workshop_${Date.now()}`,
          name,
          email,
          phone,
        }),
      });

      if (!orderRes.ok) {
        const err = await orderRes.json();
        alert(err.detail || "Failed to create order. Please try again.");
        setLoading(false);
        return;
      }

      const orderData = await orderRes.json();

      if (!orderData.razorpay_key_id) {
        alert("Payment configuration error: Razorpay key not available. Please contact support.");
        setLoading(false);
        return;
      }

      // Step 2: Open Razorpay checkout
      const options = {
        key: orderData.razorpay_key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "The AI Workshop",
        description: "Workshop Registration - 28 June 2026",
        order_id: orderData.order_id,
        prefill: {
          name: name,
          email: email,
          contact: phone,
        },
        theme: {
          color: "#7c3aed",
        },
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          // Step 3: Verify payment
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          if (verifyRes.ok) {
            // Step 4: Register user after successful payment
            await fetch("/api/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name,
                email,
                phone,
                payment_id: response.razorpay_payment_id,
              }),
            });
            trackPurchase(PRICE, email, phone, name);
            setSubmitted(true);
          } else {
            alert("Payment verification failed. Please contact support.");
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
        alert(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });
      rzp.open();
    } catch {
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 items-start">
      {/* Offer summary */}
      <Card className="order-2 md:order-1 border-primary/20 bg-primary/5">
        <CardContent className="p-7 sm:p-8">
          <div className="flex items-end gap-3">
            <span className="text-4xl font-extrabold text-foreground flex items-center">
              <IndianRupee className="h-7 w-7" />{PRICE}
            </span>
            <span className="text-lg text-muted-foreground line-through mb-1">{inr(MARKET_VALUE)}</span>
            <span className="mb-1.5 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-bold text-accent">
              SAVE {SAVINGS_PCT}%
            </span>
          </div>
          <p className="mt-1 text-sm font-medium text-primary">Early-bird price · Workshop #1</p>

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
                <p className="text-2xl font-extrabold text-foreground">₹10,000–₹20,000</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  what an agency charges to build a website — done yourself, in one afternoon.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
            * Domain not included. You'll buy your own for <strong className="text-foreground">₹199–599</strong> (depending on availability) — or use one you already own. It's the only extra, and we help you do it live in the session.
          </p>

          <div className="mt-5 rounded-xl bg-background/70 border border-border p-4 flex gap-3">
            <ShieldCheck className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Our promise:</strong> spend the 4 hours with us and
              you'll leave with a live website — or we'll work with you 1:1 until you do.
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
              <h3 className="text-xl font-bold text-foreground mb-2">You're in! 🎉</h3>
              <p className="text-muted-foreground">
                Payment successful — your seat for {WORKSHOP_DATE_LABEL} is confirmed, and a confirmation email is on its way.
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
              <Button type="submit" size="lg" className="w-full mt-2" disabled={loading}>
                {loading ? "Processing..." : `Pay ${inr(PRICE)} & confirm my seat`} {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
              </Button>
              <div className="flex items-center justify-center gap-4 pt-1 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Lock className="h-3.5 w-3.5" /> Secured by Razorpay</span>
                <span className="inline-flex items-center gap-1"><Gift className="h-3.5 w-3.5" /> UPI · Cards · Netbanking</span>
              </div>
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
