import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MobileFrame } from "@/components/mobile-frame";
import { TopBar } from "@/components/top-bar";
import { BottomNav } from "@/components/bottom-nav";
import { SideDrawer } from "@/components/side-drawer";
import { useState } from "react";
import {
  Search,
  HelpCircle,
  MessageSquare,
  PhoneCall,
  Mail,
  ChevronRight,
  ChevronDown,
  Ticket,
  CreditCard,
  RefreshCw,
  ShieldCheck,
  Headphones,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/help")({
  head: () => ({ meta: [{ title: "Help Center & Support · Velocity" }] }),
  component: HelpCenter,
});

type FAQItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

const FAQS: FAQItem[] = [
  {
    id: "1",
    category: "Bookings",
    question: "How do I book a bus ticket on Velocity?",
    answer:
      "Select your departure and arrival cities on the Home tab, choose your preferred travel date, select your seats on the interactive map, and complete payment. Your instant e-ticket will be generated immediately!",
  },
  {
    id: "2",
    category: "Refunds",
    question: "What is Velocity's cancellation and refund policy?",
    answer:
      "Cancellations made 24+ hours before departure receive a 100% full refund to your Velocity Wallet or original payment method. Cancellations within 12-24 hours incur a minimal 10% fee.",
  },
  {
    id: "3",
    category: "Tracking",
    question: "How does Live Bus Tracking work?",
    answer:
      "Once your trip is confirmed, go to 'My Trips' or 'Live Bus Tracking' in the menu. You can view the real-time GPS location of your bus, estimated arrival times, and driver details.",
  },
  {
    id: "4",
    category: "Luggage",
    question: "What is the baggage allowance per passenger?",
    answer:
      "Every passenger is entitled to 1 main check-in luggage (up to 20kg) and 1 small personal handbag or laptop bag free of charge.",
  },
  {
    id: "5",
    category: "Payments",
    question: "Which payment methods are accepted?",
    answer:
      "Velocity accepts UPI, Credit/Debit cards, Net Banking, EasyPaisa/JazzCash, Apple Pay, Google Pay, and Velocity Wallet credits.",
  },
];

function HelpCenter() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<string | null>("1");

  const filteredFaqs = FAQS.filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase()) ||
      f.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MobileFrame>
      <div className="relative min-h-full w-full bg-background text-foreground flex flex-col">
        {/* Ambient header glow */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-64"
          style={{
            background:
              "radial-gradient(80% 60% at 50% 0%, rgba(255,120,50,0.25) 0%, transparent 70%)",
          }}
        />

        <TopBar
          title="Help Center"
          subtitle="24/7 Customer Support & FAQs"
          showBack={true}
          onMenu={() => setDrawerOpen(true)}
        />

        {/* Scrollable content with pb-32 so bottom nav never overlaps footer */}
        <div className="relative flex-1 overflow-y-auto no-scrollbar px-5 pt-3 pb-32 space-y-6">
          {/* Hero Banner */}
          <div className="rounded-3xl gradient-sunrise p-6 text-primary-foreground shadow-glow relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 size-32 rounded-full bg-primary-foreground/10 blur-xl" />
            <div className="flex items-center gap-3">
              <div className="grid size-12 place-items-center rounded-2xl bg-primary-foreground/20 backdrop-blur">
                <Headphones className="size-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-display text-xl font-black">How can we help?</h2>
                <p className="text-xs opacity-90">We're here for you 24 hours a day, 7 days a week</p>
              </div>
            </div>

            {/* Search Input */}
            <div className="mt-5 flex items-center gap-3 rounded-2xl bg-primary-foreground/20 backdrop-blur border border-primary-foreground/20 px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/60">
              <Search className="size-5 shrink-0" />
              <input
                type="text"
                placeholder="Search topics, refunds, tracking..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-sm outline-none placeholder:text-primary-foreground/70"
              />
            </div>
          </div>

          {/* Quick Support Action Grid */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 px-1">
              Contact Support
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => toast.success("Connected to 24/7 Live Agent Support!")}
                className="flex flex-col items-center justify-center text-center p-3.5 rounded-2xl glass-strong border border-foreground/10 active:scale-95 transition"
              >
                <div className="grid size-10 place-items-center rounded-xl bg-primary/15 text-primary mb-2">
                  <MessageSquare className="size-5" />
                </div>
                <span className="text-xs font-bold">Live Chat</span>
                <span className="text-[9px] text-muted-foreground">Instant reply</span>
              </button>

              <button
                onClick={() => toast.info("Calling Support Helpline: 1800-VELOCITY...")}
                className="flex flex-col items-center justify-center text-center p-3.5 rounded-2xl glass-strong border border-foreground/10 active:scale-95 transition"
              >
                <div className="grid size-10 place-items-center rounded-xl bg-emerald-500/15 text-emerald-500 mb-2">
                  <PhoneCall className="size-5" />
                </div>
                <span className="text-xs font-bold">Call Us</span>
                <span className="text-[9px] text-muted-foreground">Toll-Free</span>
              </button>

              <button
                onClick={() => toast.success("Support ticket opened: #VEL-8942")}
                className="flex flex-col items-center justify-center text-center p-3.5 rounded-2xl glass-strong border border-foreground/10 active:scale-95 transition"
              >
                <div className="grid size-10 place-items-center rounded-xl bg-purple-500/15 text-purple-400 mb-2">
                  <Mail className="size-5" />
                </div>
                <span className="text-xs font-bold">Email Us</span>
                <span className="text-[9px] text-muted-foreground">24h response</span>
              </button>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div>
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Frequently Asked Questions
              </h3>
              <span className="text-[10px] font-semibold text-primary">
                {filteredFaqs.length} answers
              </span>
            </div>

            <div className="space-y-3">
              {filteredFaqs.map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="rounded-2xl glass-strong border border-foreground/10 overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                      className="w-full flex items-center justify-between p-4 text-left font-semibold text-sm"
                    >
                      <span className="flex items-center gap-2 pr-2">
                        <HelpCircle className="size-4 text-primary shrink-0" />
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={
                          "size-4 text-muted-foreground shrink-0 transition-transform " +
                          (isOpen ? "rotate-180 text-primary" : "")
                        }
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-muted-foreground leading-relaxed border-t border-foreground/5 animate-fade-in">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Useful Quick Guides */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 px-1">
              Policies & Guides
            </h3>
            <div className="space-y-2">
              <Link
                to="/terms"
                className="flex items-center justify-between p-4 rounded-2xl glass-panel border border-foreground/10 active:scale-[0.99] transition"
              >
                <div className="flex items-center gap-3">
                  <div className="grid size-9 place-items-center rounded-xl bg-foreground/5 text-foreground">
                    <Ticket className="size-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold">Terms of Service</div>
                    <div className="text-[10px] text-muted-foreground">Ticket booking guidelines</div>
                  </div>
                </div>
                <ChevronRight className="size-4 text-muted-foreground" />
              </Link>

              <Link
                to="/privacy"
                className="flex items-center justify-between p-4 rounded-2xl glass-panel border border-foreground/10 active:scale-[0.99] transition"
              >
                <div className="flex items-center gap-3">
                  <div className="grid size-9 place-items-center rounded-xl bg-foreground/5 text-foreground">
                    <ShieldCheck className="size-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold">Privacy & Security</div>
                    <div className="text-[10px] text-muted-foreground">How your data is protected</div>
                  </div>
                </div>
                <ChevronRight className="size-4 text-muted-foreground" />
              </Link>
            </div>
          </div>
        </div>

        <BottomNav />
        <SideDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </div>
    </MobileFrame>
  );
}
