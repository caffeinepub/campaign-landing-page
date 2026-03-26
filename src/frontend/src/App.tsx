import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Facebook,
  Flame,
  Globe,
  Instagram,
  Leaf,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Scale,
  Twitter,
  Users,
  X,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useAddSupporter, useGetSupporterCount } from "./hooks/useQueries";

const queryClient = new QueryClient();

const CAMPAIGN_GOAL = 50000;
const CAMPAIGN_CURRENT = 31500;

const navLinks = [
  { label: "Mission", href: "#mission" },
  { label: "Impact", href: "#priorities" },
  { label: "Action", href: "#community" },
  { label: "Community", href: "#community" },
  { label: "Support", href: "#signup" },
  { label: "Blog", href: "#mission" },
];

const featureRows = [
  {
    id: "education",
    icon: <Users size={18} className="text-orange" />,
    title: "Equitable Education",
    desc: "Advocating for equal access to quality education regardless of zip code, income, or background.",
  },
  {
    id: "climate",
    icon: <Leaf size={18} className="text-orange" />,
    title: "Climate Action",
    desc: "Pushing for bold legislative action to slash emissions and accelerate the green energy transition.",
  },
  {
    id: "community",
    icon: <Globe size={18} className="text-orange" />,
    title: "Community Progress",
    desc: "Building stronger, more connected neighborhoods through civic engagement and local investment.",
  },
];

const priorityCards = [
  {
    id: "energy",
    icon: <Zap size={28} className="text-orange" />,
    title: "Renewable Energy",
    desc: "Accelerate 100% clean energy by 2035 through federal investment and state-level incentives.",
  },
  {
    id: "policy",
    icon: <Scale size={28} className="text-orange" />,
    title: "Policy Reform",
    desc: "Champion fair voting rights, lobbying reform, and systemic accountability at every level of government.",
  },
  {
    id: "youth",
    icon: <Flame size={28} className="text-orange" />,
    title: "Youth Engagement",
    desc: "Empower the next generation through civic education programs, youth summits, and direct action networks.",
  },
];

const milestones = [
  { id: "m1", label: "10,000 signatures collected", time: "2 days ago" },
  { id: "m2", label: "Policy brief submitted to Congress", time: "1 week ago" },
  { id: "m3", label: "Partnered with 50 community orgs", time: "2 weeks ago" },
  { id: "m4", label: "Youth Summit 2026 announced", time: "3 weeks ago" },
];

const socialLinks = [
  { Icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  { Icon: Facebook, label: "Facebook", href: "https://facebook.com" },
  { Icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { Icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { Icon: Mail, label: "Email", href: "mailto:info@unityforchange.org" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { data: supporterCount } = useGetSupporterCount();
  const addSupporter = useAddSupporter();

  const displayCount = supporterCount != null ? Number(supporterCount) : 84_320;
  const progressPct = Math.round((CAMPAIGN_CURRENT / CAMPAIGN_GOAL) * 100);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Please fill in both fields.");
      return;
    }
    try {
      await addSupporter.mutateAsync({
        name: name.trim(),
        email: email.trim(),
      });
      setSubmitted(true);
      toast.success("Welcome! You've joined the movement.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ── NAVBAR ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-navy shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2.5 text-white cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-orange flex items-center justify-center font-bold text-white text-lg">
              U
            </div>
            <span className="font-bold text-lg tracking-tight">
              Unity For Change
            </span>
          </button>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-ocid={`nav.${link.label.toLowerCase()}.link`}
                className="text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex">
            <Button
              type="button"
              data-ocid="nav.join_now.button"
              onClick={() => scrollTo("signup")}
              className="bg-orange hover:bg-orange-hover text-white font-semibold rounded-full px-6"
            >
              JOIN NOW
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-navy-dark px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/80 hover:text-white text-sm font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                scrollTo("signup");
              }}
              className="bg-orange text-white rounded-full w-full"
            >
              JOIN NOW
            </Button>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center pt-16"
        style={{
          background:
            "linear-gradient(to right, oklch(0.18 0.04 250 / 0.98) 30%, oklch(0.18 0.04 250 / 0.6) 65%, oklch(0.18 0.04 250 / 0.2) 100%), linear-gradient(135deg, #0b3d6e 0%, #1a5c9e 40%, #2d7bbf 70%, #3a8fd4 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 50%, oklch(0.68 0.18 50 / 0.3) 0%, transparent 60%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="inline-block text-orange text-sm font-semibold tracking-widest uppercase mb-4">
              A Movement for Everyone
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight uppercase tracking-tight mb-6">
              TOGETHER WE <br />
              <span className="text-orange">BUILD THE</span> <br />
              FUTURE
            </h1>
            <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-lg">
              Join hundreds of thousands of citizens demanding bold action on
              climate, equity, and democracy. Your voice shapes tomorrow.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                type="button"
                data-ocid="hero.join_campaign.button"
                onClick={() => scrollTo("signup")}
                className="bg-orange hover:bg-orange-hover text-white font-semibold rounded-full px-8 py-3 text-sm uppercase tracking-wide h-auto"
              >
                JOIN THE CAMPAIGN <ArrowRight className="ml-2" size={16} />
              </Button>
              <Button
                type="button"
                data-ocid="hero.learn_more.button"
                onClick={() => scrollTo("mission")}
                variant="outline"
                className="border-white/60 text-white hover:bg-white/10 hover:text-white rounded-full px-8 py-3 text-sm uppercase tracking-wide h-auto bg-transparent"
              >
                LEARN MORE
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section id="mission" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-orange font-semibold text-sm tracking-widest uppercase mb-3">
                Our Mission
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-charcoal leading-tight uppercase mb-6">
                DRIVING IMPACT. <br /> FORGING CHANGE.
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                Unity For Change unites everyday people around shared values: a
                clean planet, fair access to education, and resilient
                communities. We translate grassroots energy into lasting policy
                wins.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex flex-col gap-6"
            >
              {featureRows.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-1">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PRIORITIES ── */}
      <section id="priorities" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-orange font-semibold text-sm tracking-widest uppercase mb-3">
              What We Fight For
            </p>
            <h2 className="text-4xl font-bold text-charcoal uppercase">
              Key Priorities &amp; Goals
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {priorityCards.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-charcoal rounded-2xl p-8 flex flex-col gap-4"
                data-ocid={`priorities.card.${i + 1}`}
              >
                <div className="w-12 h-12 rounded-xl bg-orange/20 flex items-center justify-center">
                  {card.icon}
                </div>
                <h3 className="text-white font-bold text-xl">{card.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITY IMPACT ── */}
      <section id="community" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-orange font-semibold text-sm tracking-widest uppercase mb-3">
              Momentum
            </p>
            <h2 className="text-4xl font-bold text-charcoal uppercase">
              Our Community Impact
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-border p-8 shadow-card"
              data-ocid="community.progress.card"
            >
              <h3 className="font-semibold text-charcoal mb-1">
                Current Campaign Progress
              </h3>
              <p className="text-muted-foreground text-xs mb-4">
                Funding goal for grassroots outreach
              </p>
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-charcoal font-bold">
                    ${CAMPAIGN_CURRENT.toLocaleString()} raised
                  </span>
                  <span className="text-muted-foreground">{progressPct}%</span>
                </div>
                <div className="h-3 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${progressPct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full rounded-full bg-orange"
                  />
                </div>
              </div>
              <p className="text-muted-foreground text-xs">
                Goal: ${CAMPAIGN_GOAL.toLocaleString()}
              </p>
            </motion.div>

            {/* Supporter Count */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-navy rounded-2xl p-8 shadow-card flex flex-col items-center justify-center text-center"
              data-ocid="community.supporters.card"
            >
              <p className="text-white/70 text-sm mb-2 uppercase tracking-widest">
                Supporter Count
              </p>
              <p className="text-white font-bold text-5xl">
                {displayCount.toLocaleString()}
              </p>
              <p className="text-orange text-sm font-medium mt-2">
                and growing every day
              </p>
              <div className="mt-4 flex gap-1">
                {["a", "b", "c", "d", "e"].map((k) => (
                  <div
                    key={k}
                    className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
                  >
                    <Users size={14} className="text-white/70" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Milestones */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-border p-8 shadow-card"
              data-ocid="community.milestones.card"
            >
              <h3 className="font-semibold text-charcoal mb-4">
                Recent Milestones
              </h3>
              <div className="flex flex-col gap-4">
                {milestones.map((m) => (
                  <div key={m.id} className="flex gap-3 items-start">
                    <CheckCircle2
                      size={16}
                      className="text-orange mt-0.5 flex-shrink-0"
                    />
                    <div>
                      <p className="text-charcoal text-sm font-medium">
                        {m.label}
                      </p>
                      <p className="text-muted-foreground text-xs flex items-center gap-1 mt-0.5">
                        <Clock size={10} /> {m.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MID-PAGE CTA BAND ── */}
      <section id="signup" className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white uppercase leading-tight mb-4">
                BE PART OF <br /> THE CHANGE
              </h2>
              <p className="text-white/70 text-base leading-relaxed mb-8">
                Every signature, every donation, every shared post amplifies our
                collective voice. Real change starts when communities stand
                together.
              </p>
              <Button
                type="button"
                data-ocid="cta_band.learn_more.button"
                onClick={() => scrollTo("mission")}
                className="bg-orange hover:bg-orange-hover text-white font-semibold rounded-full px-8 uppercase tracking-wide"
              >
                LEARN MORE <ArrowRight className="ml-2" size={16} />
              </Button>
            </motion.div>

            {/* Right – Signup Card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {submitted ? (
                <div
                  className="bg-white rounded-2xl p-8 text-center"
                  data-ocid="signup.success_state"
                >
                  <CheckCircle2
                    size={48}
                    className="text-orange mx-auto mb-4"
                  />
                  <h3 className="text-2xl font-bold text-charcoal mb-2">
                    You're In!
                  </h3>
                  <p className="text-muted-foreground">
                    Thank you for joining Unity For Change. Together we'll build
                    the future.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSignup}
                  className="bg-white rounded-2xl p-8"
                  data-ocid="signup.form"
                >
                  <h3 className="text-2xl font-bold text-charcoal mb-1">
                    JOIN US TODAY
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Add your name to the movement.
                  </p>
                  <div className="flex flex-col gap-4">
                    <div>
                      <label htmlFor="signup-name" className="sr-only">
                        Full Name
                      </label>
                      <Input
                        id="signup-name"
                        data-ocid="signup.name.input"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="name"
                        required
                        className="border-border rounded-lg h-12 text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="signup-email" className="sr-only">
                        Email Address
                      </label>
                      <Input
                        id="signup-email"
                        data-ocid="signup.email.input"
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                        className="border-border rounded-lg h-12 text-sm"
                      />
                    </div>
                    <Button
                      type="submit"
                      data-ocid="signup.submit_button"
                      disabled={addSupporter.isPending}
                      className="bg-orange hover:bg-orange-hover text-white font-semibold rounded-lg h-12 uppercase tracking-wide"
                    >
                      {addSupporter.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing Up...
                        </>
                      ) : (
                        "SIGN UP & ACT"
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-charcoal py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-full bg-orange flex items-center justify-center font-bold text-white text-lg">
                  U
                </div>
                <span className="font-bold text-lg text-white tracking-tight">
                  Unity For Change
                </span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                A grassroots movement demanding bold action on climate, equity,
                and democracy.
              </p>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                  Quick Links
                </h4>
                <ul className="flex flex-col gap-2">
                  {[
                    { label: "Mission", href: "#mission" },
                    { label: "Priorities", href: "#priorities" },
                    { label: "Community", href: "#community" },
                    { label: "Blog", href: "#mission" },
                  ].map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        data-ocid={`footer.${l.label.toLowerCase()}.link`}
                        className="text-white/50 hover:text-white text-sm transition-colors"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                  Action
                </h4>
                <ul className="flex flex-col gap-2">
                  {[
                    { label: "Join Now", href: "#signup" },
                    { label: "Donate", href: "#signup" },
                    { label: "Volunteer", href: "#signup" },
                    { label: "Spread the Word", href: "#signup" },
                  ].map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        data-ocid={`footer.action_${l.label.toLowerCase().replace(/\s/g, "_")}.link`}
                        className="text-white/50 hover:text-white text-sm transition-colors"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                Social Us
              </h4>
              <div className="flex gap-3">
                {socialLinks.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    data-ocid={`footer.${label.toLowerCase()}.link`}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-orange transition-colors flex items-center justify-center"
                  >
                    <Icon size={16} className="text-white" />
                  </a>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <MapPin size={14} className="text-orange" />
                  Washington, D.C.
                </div>
                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <Mail size={14} className="text-orange" />
                  info@unityforchange.org
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              &copy; {new Date().getFullYear()} Unity For Change. All rights
              reserved.
            </p>
            <p className="text-white/30 text-xs">
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                className="hover:text-white/60 transition-colors underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      <Toaster richColors position="top-right" />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LandingPage />
    </QueryClientProvider>
  );
}
