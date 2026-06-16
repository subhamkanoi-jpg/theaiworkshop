import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Logo } from "@/components/Logo";
import { trackBeginCheckout, trackPurchase } from "@/analytics";
import {
  Globe,
  Sparkles,
  Users,
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  Rocket,
  MessageCircle,
  Mail,
  Palette,
  Server,
  BadgeCheck,
  Menu,
  X,
  Linkedin,
  ShieldCheck,
  Star,
  ExternalLink,
  Gift,
  Zap,
  TrendingUp,
  IndianRupee,
  Lock,
  Phone,
} from "lucide-react";

// ──────────────────────────────────────────────────────────────────────────
// Editable config — update these as the workshop fills up / details change.
// ──────────────────────────────────────────────────────────────────────────
const WORKSHOP_AMOUNT = 79900; // amount in paise (₹799)
const PRICE = 799; // early-bird price (₹)
const MARKET_VALUE = 1599; // workshop's regular list price (early-bird is ₹799)
const TOTAL_SEATS = 25; // we cap each batch here so everyone gets real attention
const WORKSHOP_DATE_LABEL = "Sunday, 28 June 2026";
const WORKSHOP_TIME_LABEL = "12:00 – 4:00 PM";

const SAVINGS = MARKET_VALUE - PRICE;
const SAVINGS_PCT = Math.round((SAVINGS / MARKET_VALUE) * 100);
const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

// ──────────────────────────────────────────────────────────────────────────
// Portfolio — sites built with vibe coding.
// 👉 Drop screenshots into /public/portfolio/ and fill in real URLs below.
//    If an image is missing, a gradient placeholder shows automatically.
// ──────────────────────────────────────────────────────────────────────────
const portfolio = [
  { name: "UR Hospitality", tag: "Corporate Catering", url: "https://www.urhospitality.in", image: "/portfolio/ur-hospitality.png" },
  { name: "Shree Jee Infotech", tag: "IT Distribution", url: "https://www.shreejeeinfotech.com", image: "/portfolio/shreejee-infotech.png" },
  { name: "Subham Kanoi", tag: "Founder Portfolio", url: "https://www.subhamkanoi.com", image: "/portfolio/subham-kanoi.png" },
  // aakashdamani.com was down when we captured — gradient placeholder shows until a screenshot
  // is added at /portfolio/aakash-damani.png
  { name: "Aakash Damani", tag: "Personal Site", url: "https://www.aakashdamani.com", image: "/portfolio/aakash-damani.png" },
  { name: "The AI Workshop", tag: "This very site", url: "#", image: "/portfolio/aiworkshop.png" },
];

// ──────────────────────────────────────────────────────────────────────────
// Workshop hosts. Drop portraits in /public (square images work best).
// ──────────────────────────────────────────────────────────────────────────
const hosts = [
  {
    name: "Subham Kanoi",
    role: "The Instigator",
    image: "/subham.png",
    link: "https://www.linkedin.com/in/subhamkanoi/",
    linkType: "linkedin" as const,
    bio: `A Xavier's grad and founder of Urban Rasoi — Kolkata's own cloud kitchen for gourmet house parties and B2B corporate catering. The non-techie who started it all out of pure FOMO. If The AI Workshop had a first beta tester, it's him.`,
  },
  {
    name: "Yogesh Kanoi",
    role: "The Backbone",
    image: "/yogesh.png",
    link: "https://www.linkedin.com/in/yogesh-kanoi-37219a63/",
    linkType: "linkedin" as const,
    bio: `AI/ML engineer at LTI with half a decade of deep learning under his belt since 2020. He's the architect — the one who turns "can we do this?" into a working system. Every workshop blueprint runs through him first.`,
  },
  {
    name: "Neeraj Kanoi",
    role: "The Growth Guy",
    image: "/neeraj.png",
    link: "https://www.linkedin.com/in/neeraj-kanoi-marketing/",
    linkType: "linkedin" as const,
    bio: `The Bangalore techie who walked away from a safe IT job to join an AI startup as their Growth Lead at Wokelo AI. He knows what it takes to go from zero to scale — and he's bringing that energy here.`,
  },
];

function PortfolioThumb({ name, tag, image, url }: (typeof portfolio)[number]) {
  const [broken, setBroken] = useState(false);
  return (
    <a
      href={url}
      target={url !== "#" ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-2xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-lg transition-all"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {!broken ? (
          <img
            src={image}
            alt={name}
            loading="lazy"
            onError={() => setBroken(true)}
            className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 via-accent/10 to-primary/20">
            <Globe className="h-10 w-10 text-primary/50" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
          <ExternalLink className="h-4 w-4" />
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-3">
        <span className="font-semibold text-foreground">{name}</span>
        <span className="text-xs font-medium text-muted-foreground rounded-full bg-muted px-2.5 py-1">{tag}</span>
      </div>
    </a>
  );
}

function HostCard({
  name,
  role,
  bio,
  image,
  link,
  linkType,
}: {
  name: string;
  role: string;
  bio: string;
  image: string;
  link: string;
  linkType: "linkedin" | "website";
}) {
  const [broken, setBroken] = useState(false);
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="flex flex-col items-center text-center">
      <a href={link} target="_blank" rel="noopener noreferrer" className="group" aria-label={name}>
        <div className="h-32 w-32 sm:h-36 sm:w-36 overflow-hidden rounded-full ring-1 ring-border shadow-sm bg-muted">
          {!broken ? (
            <img
              src={image}
              alt={name}
              loading="lazy"
              onError={() => setBroken(true)}
              className="h-full w-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-secondary">
              <span className="text-3xl font-bold text-muted-foreground">{initials}</span>
            </div>
          )}
        </div>
      </a>
      <h3 className="mt-5 text-lg font-semibold text-foreground">{name}</h3>
      <p className="text-sm font-medium text-primary mt-0.5">{role}</p>
      <p className="mt-3 max-w-xs text-sm text-muted-foreground leading-relaxed">{bio}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
      >
        {linkType === "website" ? <Globe className="h-4 w-4" /> : <Linkedin className="h-4 w-4" />}
        {linkType === "website" ? "Website" : "LinkedIn"}
      </a>
    </div>
  );
}

function App() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    setLoading(true);
    trackBeginCheckout(PRICE);

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
            trackPurchase(PRICE);
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

      const rzp = new (window as any).Razorpay(options);
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

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      // Offset for the sticky nav so headings (and the form) aren't hidden under it.
      const NAV_OFFSET = 72;
      const y = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const workshopTopics = [
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Buying a Domain",
      desc: "Pick and purchase the perfect domain name for your brand or business — the right way.",
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Vibe Coding Your Website",
      desc: "Design a beautiful, modern website using AI — describe what you want, watch it appear.",
    },
    {
      icon: <Server className="h-6 w-6" />,
      title: "Free Hosting on Vercel",
      desc: "Put your website on the internet for free using the same platform top startups use.",
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Going Live",
      desc: "Connect your domain, hit deploy, and watch your site go live for the whole world to see.",
    },
  ];

  const whoIsThisFor = [
    "Small business owners who want a web presence",
    "Freelancers building their portfolio",
    "Students exploring AI and web tech",
    "Creatives & artists showcasing their work",
    "Anyone curious about AI — no tech background needed",
  ];

  const valueStack = [
    { item: "4-hour live, hands-on workshop", value: "₹5,000" },
    { item: "A real website — built, deployed & live", value: "₹10,000+" },
    { item: "Help buying & connecting your domain", value: "Included" },
    { item: "Free lifetime hosting setup (Vercel)", value: "₹2,000" },
    { item: "Printed cheat sheets & resource kit", value: "₹500" },
    { item: "Lifetime WhatsApp support community", value: "Priceless" },
    { item: "Certificate of completion", value: "✓" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Announcement Bar */}
      <button
        onClick={() => scrollTo("register")}
        className="block w-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-center text-xs sm:text-sm font-medium py-2.5 px-4 hover:opacity-95 transition-opacity"
      >
        <span className="inline-flex items-center gap-x-1.5 gap-y-0.5 flex-wrap justify-center">
          <Sparkles className="h-3.5 w-3.5 flex-shrink-0" />
          <span>Workshop #1 · Build your own website</span>
          <span className="hidden sm:inline">· Kolkata, Sun 28 June</span>
          <span>· Early-bird <strong>{inr(PRICE)}</strong></span>
          <span className="underline underline-offset-2">Reserve your spot →</span>
        </span>
      </button>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <button onClick={() => scrollTo("hero")} className="flex items-center gap-2">
              <Logo className="h-9 w-9" />
              <span className="text-lg font-bold text-foreground">The AI Workshop</span>
            </button>

            <div className="hidden md:flex items-center gap-7">
              <button onClick={() => scrollTo("workshop")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Workshop</button>
              <button onClick={() => scrollTo("roadmap")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">What's Next</button>
              <button onClick={() => scrollTo("work")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Our Work</button>
              <button onClick={() => scrollTo("team")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Hosts</button>
              <button onClick={() => scrollTo("faq")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">FAQ</button>
              <Button onClick={() => scrollTo("register")} size="sm">
                Book Your Seat — {inr(PRICE)} <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <button
              className="md:hidden text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-3">
              <button onClick={() => scrollTo("workshop")} className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground py-2">Workshop</button>
              <button onClick={() => scrollTo("roadmap")} className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground py-2">What's Next</button>
              <button onClick={() => scrollTo("work")} className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground py-2">Our Work</button>
              <button onClick={() => scrollTo("team")} className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground py-2">Hosts</button>
              <button onClick={() => scrollTo("faq")} className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground py-2">FAQ</button>
              <Button onClick={() => scrollTo("register")} size="sm" className="w-full">
                Book Your Seat — {inr(PRICE)} <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10" />
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2.5 rounded-full bg-primary/10 px-5 py-2 text-base sm:text-lg font-bold text-primary mb-4">
            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
            AI is for everyone
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
            Workshop #01 · Build Your Own Website
          </p>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <MapPin className="h-4 w-4" />
            Offline in Kolkata · {WORKSHOP_DATE_LABEL}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.08]">
            Build & launch{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              your own website
            </span>{" "}
            in one Sunday afternoon.
          </h1>

          {/* Compact value pointers — replaces the long paragraphs */}
          <div className="mt-8 flex flex-wrap items-start justify-center gap-x-8 sm:gap-x-12 gap-y-6">
            {[
              { icon: <Sparkles className="h-6 w-6" />, label: "No code" },
              { icon: <Clock className="h-6 w-6" />, label: "4 hours" },
              { icon: <Rocket className="h-6 w-6" />, label: "Go live" },
              { icon: <Globe className="h-6 w-6" />, label: "You own it" },
            ].map((p) => (
              <div key={p.label} className="flex flex-col items-center gap-2.5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {p.icon}
                </div>
                <span className="text-sm font-semibold text-foreground">{p.label}</span>
              </div>
            ))}
          </div>

          {/* Price pill */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-primary/20 bg-card px-5 py-2.5 shadow-sm">
            <span className="text-2xl font-extrabold text-foreground">{inr(PRICE)}</span>
            <span className="text-base text-muted-foreground line-through">{inr(MARKET_VALUE)}</span>
            <span className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-bold text-accent">
              SAVE {SAVINGS_PCT}%
            </span>
          </div>

          <p className="mt-3 text-sm text-muted-foreground">
            Agencies charge <strong className="text-foreground">₹10,000–₹20,000</strong> for the same thing.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" onClick={() => scrollTo("register")} className="text-base px-8 py-6 w-full sm:w-auto">
              Book Your Seat — {inr(PRICE)} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollTo("work")} className="text-base px-8 py-6 w-full sm:w-auto">
              See sites we built
            </Button>
          </div>

          <p className="mt-4 text-sm text-muted-foreground flex items-center justify-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-accent" />
            100% beginner-friendly · Secure Razorpay payment · Walk away with a live site
          </p>

          {/* Meta row */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{WORKSHOP_DATE_LABEL}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>{WORKSHOP_TIME_LABEL} (4 hrs)</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>A small batch of {TOTAL_SEATS}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Price Anchor / "The Math" Section */}
      <section className="py-16 sm:py-20 border-y border-border bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              The same website. A fraction of the price.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              You could hire someone — or you could learn to do it yourself in an afternoon and never
              pay for a website again.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {/* Agency */}
            <Card className="border-border/60 bg-background/60">
              <CardContent className="p-7">
                <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Hire an agency</p>
                <p className="mt-2 text-3xl font-extrabold text-foreground">₹10,000–₹20,000</p>
                <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><X className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" /> 2–3 week wait, endless back-and-forth</li>
                  <li className="flex items-start gap-2"><X className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" /> Pay again for every small change</li>
                  <li className="flex items-start gap-2"><X className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" /> You don't control or understand it</li>
                </ul>
              </CardContent>
            </Card>

            {/* Workshop */}
            <Card className="relative border-primary/40 bg-primary/5 shadow-lg">
              <div className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                BEST VALUE
              </div>
              <CardContent className="p-7">
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">This workshop</p>
                <p className="mt-2 text-3xl font-extrabold text-foreground">{inr(PRICE)} <span className="text-base font-medium text-muted-foreground">/ early bird</span></p>
                <ul className="mt-5 space-y-3 text-sm text-foreground">
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" /> Go live in a single 4-hour session</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" /> Edit & rebuild anytime — for free, forever</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" /> A skill you keep for life, not a one-off</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
            <TrendingUp className="h-4 w-4 text-accent" />
            One website pays for the workshop ~15× over. The skill pays forever.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              AI is for everyone — not just engineers
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We're building an AI community in Kolkata for the common person — business owners,
              freelancers, students, anyone curious. Our mission is simple: demystify AI and make it
              genuinely useful in your everyday life and work, one hands-on workshop at a time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Users className="h-8 w-8" />,
                title: "For Non-Techies",
                desc: "No coding prerequisites. If you can use WhatsApp, you can learn this.",
              },
              {
                icon: <Sparkles className="h-8 w-8" />,
                title: "Learn by Doing",
                desc: "Every workshop is hands-on. You leave with something real you've built.",
              },
              {
                icon: <MapPin className="h-8 w-8" />,
                title: "Offline & In-Person",
                desc: "Real human connection. Learn face-to-face with instructors who care.",
              },
            ].map((item, i) => (
              <Card key={i} className="group relative overflow-hidden border-border/50 hover:border-primary/30 transition-colors">
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Tools Section */}
      <section className="py-14 border-y border-border bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-muted-foreground mb-10 tracking-wide uppercase">
            The AI tools you'll actually use
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {/* ChatGPT */}
            <div className="flex items-center gap-2.5 opacity-60 hover:opacity-100 transition-opacity">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#10a37f]/10">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#10a37f"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/></svg>
              </div>
              <span className="text-base font-semibold text-foreground">ChatGPT</span>
            </div>

            {/* Gemini */}
            <div className="flex items-center gap-2.5 opacity-60 hover:opacity-100 transition-opacity">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#4285f4]/10">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#4285f4"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
              </div>
              <span className="text-base font-semibold text-foreground">Gemini</span>
            </div>

            {/* Claude */}
            <div className="flex items-center gap-2.5 opacity-60 hover:opacity-100 transition-opacity">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#d97757]/10">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#d97757"><circle cx="12" cy="12" r="10"/><path d="M8 12l2-6 2 6m-3.5-2h3" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <span className="text-base font-semibold text-foreground">Claude</span>
            </div>

            {/* Vercel */}
            <div className="flex items-center gap-2.5 opacity-60 hover:opacity-100 transition-opacity">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground/5">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 1L24 22H0z"/></svg>
              </div>
              <span className="text-base font-semibold text-foreground">Vercel</span>
            </div>

            {/* Cursor */}
            <div className="flex items-center gap-2.5 opacity-60 hover:opacity-100 transition-opacity">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#7c3aed]/10">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#7c3aed"><path d="M5.5 3l13 9-13 9V3z"/></svg>
              </div>
              <span className="text-base font-semibold text-foreground">Cursor</span>
            </div>

            {/* Copilot */}
            <div className="flex items-center gap-2.5 opacity-60 hover:opacity-100 transition-opacity">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0078d4]/10">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#0078d4"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2a8 8 0 014 1.5V8h-2v1h2v2h1v2h-1v2h-2v1h2v2.5A8 8 0 0112 20a8 8 0 01-4-1V17h2v-1H8v-2H7v-2h1V10h2V9H8V5.5A8 8 0 0112 4z"/></svg>
              </div>
              <span className="text-base font-semibold text-foreground">Copilot</span>
            </div>

            {/* Midjourney */}
            <div className="flex items-center gap-2.5 opacity-60 hover:opacity-100 transition-opacity">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0d47a1]/10">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#0d47a1"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <span className="text-base font-semibold text-foreground">Midjourney</span>
            </div>

            {/* Llama */}
            <div className="flex items-center gap-2.5 opacity-60 hover:opacity-100 transition-opacity">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0668E1]/10">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#0668E1"><circle cx="9" cy="7" r="2"/><circle cx="15" cy="7" r="2"/><path d="M12 12c-4 0-7 2-7 5v2h14v-2c0-3-3-5-7-5z"/></svg>
              </div>
              <span className="text-base font-semibold text-foreground">Llama</span>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Section */}
      <section id="workshop" className="py-20 sm:py-24 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent mb-4">
              <Rocket className="h-4 w-4" />
              Workshop #1 · Create & Host Your Website
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              From zero to a live website — in 4 hours
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Walk in with an idea. Walk out with a real website on the internet. No coding experience needed.
            </p>
          </div>

          {/* Workshop Details Card */}
          <Card className="mb-12 overflow-hidden border-primary/20">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                <div className="p-8 sm:p-10">
                  <h3 className="text-2xl font-bold text-foreground mb-6">What You'll Learn</h3>
                  <div className="space-y-6">
                    {workshopTopics.map((topic, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          {topic.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{topic.title}</h4>
                          <p className="text-sm text-muted-foreground mt-0.5">{topic.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-primary/5 p-8 sm:p-10 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-6">Workshop Details</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
                        <div>
                          <p className="font-medium text-foreground">{WORKSHOP_DATE_LABEL}</p>
                          <p className="text-sm text-muted-foreground">Mark your calendar</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                        <div>
                          <p className="font-medium text-foreground">{WORKSHOP_TIME_LABEL}</p>
                          <p className="text-sm text-muted-foreground">4 hours, hands-on</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                        <div>
                          <p className="font-medium text-foreground">Kolkata</p>
                          <p className="text-sm text-muted-foreground">Venue details on registration</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-primary flex-shrink-0" />
                        <div>
                          <p className="font-medium text-foreground">Just {TOTAL_SEATS} seats</p>
                          <p className="text-sm text-muted-foreground">Small batch for personal attention</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button onClick={() => scrollTo("register")} className="mt-8 w-full" size="lg">
                    Book Your Seat — {inr(PRICE)} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Who is this for + What you get */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-8 pb-6 px-6">
                <h3 className="text-xl font-bold text-foreground mb-6">Who Is This For?</h3>
                <ul className="space-y-3">
                  {whoIsThisFor.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-8 pb-6 px-6">
                <h3 className="text-xl font-bold text-foreground mb-6">No experience? Perfect.</h3>
                <p className="text-muted-foreground leading-relaxed">
                  This workshop is built from the ground up for absolute beginners. We don't assume you
                  know anything technical — we start from "what's a domain?" and end with your site live
                  on the internet.
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  If you can browse the web and type, you'll keep up. Three of us will be in the room to
                  make sure no one gets left behind.
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary">
                  <Sparkles className="h-4 w-4" />
                  You'll leave with a website — guaranteed.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What's Next / Roadmap Section */}
      <section id="roadmap" className="py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent mb-4">
              <TrendingUp className="h-4 w-4" />
              This is just the beginning
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              One workshop. The first of many.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Building your website is use-case #1 — the easiest way to see what AI can do for you.
              From here, every workshop tackles a real problem you face in your business.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            <Card className="relative border-primary/40 bg-primary/5 shadow-sm">
              <div className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                HAPPENING NOW
              </div>
              <CardContent className="p-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Globe className="h-6 w-6" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">Workshop #01</p>
                <h3 className="mt-1 text-lg font-semibold text-foreground">Build Your Own Website</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Go from idea to a live website you own — in a single afternoon, no code.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardContent className="p-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                  <Zap className="h-6 w-6" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Coming next</p>
                <h3 className="mt-1 text-lg font-semibold text-foreground">AI for Your Business</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Automate the busywork, market smarter, and serve customers faster — with everyday AI tools.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardContent className="p-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                  <Sparkles className="h-6 w-6" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">You decide</p>
                <h3 className="mt-1 text-lg font-semibold text-foreground">Your Use-Case, Next</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Tell us the problem you want solved. The community shapes which use-case we build next.
                </p>
              </CardContent>
            </Card>
          </div>

          <p className="mt-8 text-center text-muted-foreground">
            First-of-its-kind, use-case-based, and fully offline.{" "}
            <a
              href="https://chat.whatsapp.com/DNIePdAGNfL2cs1LDIs0DG"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline"
            >
              Join the community to shape what's next →
            </a>
          </p>
        </div>
      </section>

      {/* Our Work / Portfolio Section */}
      <section id="work" className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              <Star className="h-4 w-4" />
              Built with vibe coding
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Real sites we built — with the exact tools we teach
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              No agencies. No traditional coding. Every one of these started as a sentence typed into AI —
              the same way yours will.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {portfolio.map((p) => (
              <PortfolioThumb key={p.name} {...p} />
            ))}
          </div>

          <p className="mt-8 text-center text-muted-foreground">
            This very website? Vibe-coded too.{" "}
            <button onClick={() => scrollTo("register")} className="font-semibold text-primary hover:underline">
              Learn how to build your own →
            </button>
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 sm:py-24 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Meet Your Workshop Hosts
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Three brothers who believe AI should be for everyone — not just engineers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8 max-w-4xl mx-auto">
            {hosts.map((h) => (
              <HostCard key={h.name} {...h} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Got questions? We've got answers.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            <AccordionItem value="q1" className="border rounded-lg px-6 bg-background">
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                Do I need any coding experience?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                Absolutely not. This workshop is designed from the ground up for people with zero technical background. If you can use a browser and type, you can build a website with us. That's the whole point.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q-price" className="border rounded-lg px-6 bg-background">
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                Why is it only {inr(PRICE)} when websites cost so much more?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                {inr(PRICE)} is our early-bird price for Workshop #1 — we'd rather fill the room with people who'll spread the word than maximise ticket price. A website built by an agency runs ₹10,000–₹20,000. Here you learn to build it yourself, keep the skill, and never pay for a basic website again.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q-domain" className="border rounded-lg px-6 bg-background">
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                Is a domain name included in the {inr(PRICE)}?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                The {inr(PRICE)} covers the full workshop and everything you build in it. The one thing it doesn't include is your domain name — you'll buy your own for ₹199–599 depending on availability, and we'll help you pick and purchase it live in the session. Already own a domain? Bring it and we'll connect it for you, no extra cost.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q3" className="border rounded-lg px-6 bg-background">
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                Will I actually have a live website by the end?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                Yes! By the end of the 4 hours, you'll have a real website live on the internet that you built yourself. You'll walk away with something tangible — not just theory.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q2" className="border rounded-lg px-6 bg-background">
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                What do I need to bring?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                Just your laptop and a willingness to learn. We'll guide you through everything else — from setting up free tools to deploying your site. No software installs needed beforehand.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q4" className="border rounded-lg px-6 bg-background">
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                Is hosting really free?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                Yes. We'll teach you how to deploy on Vercel's free tier, which is more than enough for personal sites, portfolios, and small business pages. The only extra cost is your domain name (₹199–599 depending on availability) — or nothing at all if you already own one.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q5" className="border rounded-lg px-6 bg-background">
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                What if I need help after the workshop?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                You'll get access to our post-workshop WhatsApp support group where you can ask questions anytime. We're building a community, not just a one-off event.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q6" className="border rounded-lg px-6 bg-background">
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                Where in Kolkata is the workshop?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                Venue details will be shared with registered participants closer to the date. Rest assured, it'll be a comfortable, well-connected location in Kolkata.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q7" className="border rounded-lg px-6 bg-background">
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                Will there be more workshops after this?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                This is just the beginning. We're planning a series of workshops covering different AI topics — all designed for non-technical folks. Register for this one and you'll be the first to know about future sessions.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* WhatsApp Community Section */}
      <section className="py-12 bg-[#25D366]/5 border-y border-[#25D366]/20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold text-foreground">Not ready to book yet?</h3>
              <p className="text-sm text-muted-foreground">Join our WhatsApp community for AI tips and first dibs on future workshops.</p>
            </div>
            <a
              href="https://chat.whatsapp.com/DNIePdAGNfL2cs1LDIs0DG"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1ebe57] transition-colors"
            >
              Join the Community <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Reserve your seat
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We keep each batch to just {TOTAL_SEATS} people, so everyone gets real, hands-on
              attention. Save your spot for {WORKSHOP_DATE_LABEL}.
            </p>
          </div>

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
                        href="https://chat.whatsapp.com/DNIePdAGNfL2cs1LDIs0DG"
                        target="_blank"
                        rel="noopener noreferrer"
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
                      <a href="tel:+919830715557" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
                        <Phone className="h-3.5 w-3.5" /> +91 98307 15557
                      </a>
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Logo className="h-8 w-8" />
              <span className="font-bold text-foreground">The AI Workshop</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              <a
                href="tel:+919830715557"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="h-4 w-4" />
                +91 98307 15557
              </a>
              <a
                href="mailto:theaiworkshop.in@gmail.com"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                theaiworkshop.in@gmail.com
              </a>
              <a
                href="https://chat.whatsapp.com/DNIePdAGNfL2cs1LDIs0DG"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#25D366] hover:underline"
              >
                <MessageCircle className="h-4 w-4" />
                Community
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky mobile CTA bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-border bg-background/95 backdrop-blur-lg px-4 py-3 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-foreground">{inr(PRICE)}</span>
            <span className="text-sm text-muted-foreground line-through">{inr(MARKET_VALUE)}</span>
          </div>
          <p className="text-[11px] text-muted-foreground">Small batch of {TOTAL_SEATS}</p>
        </div>
        <Button onClick={() => scrollTo("register")} className="flex-1 max-w-[60%]">
          Book your seat <ArrowRight className="ml-1.5 h-4 w-4" />
        </Button>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://chat.whatsapp.com/DNIePdAGNfL2cs1LDIs0DG"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 md:bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#1ebe57] hover:scale-110 transition-all duration-200"
        aria-label="Join WhatsApp Community"
      >
        <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor">
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.132 6.744 3.054 9.378L1.056 31.17l5.998-1.924C9.592 30.924 12.66 32 16.004 32 24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.314 22.61c-.39 1.1-1.932 2.014-3.168 2.28-.844.18-1.948.324-5.662-1.216-4.754-1.97-7.814-6.788-8.054-7.104-.232-.316-1.932-2.574-1.932-4.908s1.222-3.482 1.654-3.956c.432-.474.944-.592 1.26-.592.316 0 .632.004.908.016.292.014.684-.112 1.068.816.39.94 1.33 3.248 1.448 3.482.118.236.196.512.04.828-.158.316-.236.512-.472.79-.236.276-.498.618-.71.828-.236.236-.482.49-.206.962.276.474 1.226 2.024 2.632 3.278 1.81 1.612 3.336 2.112 3.81 2.35.474.236.75.196 1.028-.118.276-.316 1.186-1.382 1.502-1.856.316-.474.632-.394 1.068-.236.434.158 2.754 1.3 3.228 1.536.474.236.79.354.908.55.118.196.118 1.126-.272 2.226z"/>
        </svg>
      </a>
    </div>
  );
}

export default App;
