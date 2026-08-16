import { useEffect, type ReactNode } from "react";
import { Logo } from "@/components/Logo";
import { ScrollButtons } from "@/components/ScrollToTop";
import { PHONE_DISPLAY, PHONE_TEL, SUPPORT_EMAIL, PRICE, inr } from "@/config";

function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  useEffect(() => {
    document.title = `${title} — The AI Workshop`;
  }, [title]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 flex h-16 items-center justify-between">
          <a href="/" className="flex items-center">
            <Logo iconClassName="h-9 w-auto" textClassName="text-xl" />
          </a>
          <a href="/book" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Reserve a seat
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#c8553d] mb-3">
          The AI Workshop
        </p>
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated {updated}</p>
        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-foreground/90">{children}</div>
      </main>

      <footer className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <a href="/" className="hover:text-foreground">Home</a>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            <a href="/privacy" className="hover:text-foreground">Privacy</a>
            <a href="/terms" className="hover:text-foreground">Terms</a>
            <a href="/refund" className="hover:text-foreground">Refunds</a>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-foreground">{SUPPORT_EMAIL}</a>
            <a href={`tel:${PHONE_TEL}`} className="hover:text-foreground">{PHONE_DISPLAY}</a>
          </div>
        </div>
      </footer>
      <ScrollButtons />
    </div>
  );
}

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section>
    <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">{title}</h2>
    {children}
  </section>
);

export function PrivacyPage() {
  return (
    <LegalLayout title="Privacy policy" updated="16 August 2026">
      <p>
        This policy describes how The AI Workshop (&quot;we&quot;) handles personal information when you
        use theaiworkshop.in or book a seat.
      </p>
      <Section title="What we collect">
        <p>
          When you reserve a seat we collect your name, email address and phone number. If you pay
          online, Razorpay also processes your payment details — we never see or store card or UPI
          credentials.
        </p>
      </Section>
      <Section title="How we use it">
        <ul className="list-disc pl-5 space-y-1">
          <li>Confirm your booking and send workshop details</li>
          <li>Share the venue and reminders on email and WhatsApp</li>
          <li>Account for seats and payments</li>
          <li>Answer support questions</li>
        </ul>
      </Section>
      <Section title="Who we share it with">
        <p>
          Razorpay processes online payments. We send confirmation mail through Gmail SMTP. After
          you book we invite you to a WhatsApp group for this workshop. We do not sell your data.
        </p>
      </Section>
      <Section title="Analytics">
        <p>
          If advertising pixels (Meta, Google) are enabled, they may collect device and usage data
          to measure ads. They are off unless those IDs are configured.
        </p>
      </Section>
      <Section title="How long we keep it">
        <p>
          Registration records are kept for this workshop and reasonable follow-up (typically up to
          24 months), then deleted or anonymised unless the law requires otherwise.
        </p>
      </Section>
      <Section title="Your rights">
        <p>
          Email {SUPPORT_EMAIL} to access, correct or delete your information. We are based in
          Kolkata, India.
        </p>
      </Section>
    </LegalLayout>
  );
}

export function TermsPage() {
  return (
    <LegalLayout title="Terms of use" updated="16 August 2026">
      <p>
        By reserving a seat you agree to these terms. The workshop is an in-person, beginner-friendly
        session in Salt Lake, Kolkata.
      </p>
      <Section title="The workshop">
        <p>
          You get a two-hour live session, a finished reel from footage you bring or sample clips we
          provide, and access to the workshop WhatsApp group. A Claude subscription is required for
          the editing workflow and is billed by Anthropic, not by us. The ticket price of {inr(PRICE)}{" "}
          does not include that subscription.
        </p>
      </Section>
      <Section title="Your responsibilities">
        <ul className="list-disc pl-5 space-y-1">
          <li>Show up on time with a laptop that can join the session</li>
          <li>Behave respectfully toward hosts and other participants</li>
          <li>Do not record or republish the session without our written permission</li>
        </ul>
      </Section>
      <Section title="Photos">
        <p>
          We may photograph the room for community recaps. Tell a host at the start if you do not
          want to appear in photos.
        </p>
      </Section>
      <Section title="Not professional advice">
        <p>
          This is a hands-on skills workshop, not legal, financial or career advice, and not an
          accredited course.
        </p>
      </Section>
      <Section title="Contact">
        <p>
          {SUPPORT_EMAIL} · {PHONE_DISPLAY}
        </p>
      </Section>
    </LegalLayout>
  );
}

export function RefundPage() {
  return (
    <LegalLayout title="Refund policy" updated="16 August 2026">
      <Section title="Online payments">
        <p>
          Full refund of {inr(PRICE)} if you email {SUPPORT_EMAIL} at least 48 hours before the
          workshop start time. After that, tickets can be transferred to another person but are not
          refunded. No-shows are not refunded.
        </p>
      </Section>
      <Section title="Pay at the venue">
        <p>
          Venue holds are free until you pay cash on the day. We release an unclaimed hold 15 minutes
          after the session starts.
        </p>
      </Section>
      <Section title="If we cancel">
        <p>
          If we cancel or reschedule and you cannot attend the new date, we refund online payments
          in full and release venue holds.
        </p>
      </Section>
      <Section title="How to request a refund">
        <p>
          Email {SUPPORT_EMAIL} with the name and email you booked with (and the Razorpay payment ID
          if you have it). Refunds go back to the original payment method and usually take 5–7
          business days after we approve them.
        </p>
      </Section>
    </LegalLayout>
  );
}
