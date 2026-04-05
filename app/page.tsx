"use client";

import { useState } from "react";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  HeartHandshake,
  Mail,
  MessageSquare,
  Phone,
  Users,
} from "lucide-react";

const MOMENTS = [
  {
    title: "First-time visitor",
    timing: "0-24 hours",
    detail: "Immediate welcome text and email, then a personal call from staff or a pastor within a day.",
  },
  {
    title: "Second-time visitor",
    timing: "48 hours",
    detail: "Acknowledge the return and invite them into one clear next step instead of dumping a menu on them.",
  },
  {
    title: "Salvation or baptism decision",
    timing: "Same day",
    detail: "Fast pastoral follow-up, discipleship handoff, and baptism class invitation before momentum fades.",
  },
  {
    title: "Group or ministry signup",
    timing: "24 hours",
    detail: "Leader intro, first-meeting prep, and a 30-day check-in so people get integrated, not just listed.",
  },
  {
    title: "Membership completion",
    timing: "1 week",
    detail: "Serving-path conversation and a six-month nurture sequence that actually treats membership like a commitment.",
  },
];

const STACKS = [
  {
    title: "Budget stack",
    price: "$0-50/mo",
    detail: "Planning Center + Google Forms + Mailchimp. Manual, but enough for a church under 100 if the team is disciplined.",
  },
  {
    title: "Best-fit stack",
    price: "$50-200/mo",
    detail: "RockRMS + workflows. Church-native data, attendance-aware automation, and no need to shoehorn everything into a marketing CRM.",
  },
  {
    title: "Full automation",
    price: "$200-500/mo",
    detail: "GoHighLevel or a custom layer when communication automation matters more than church-native structure.",
  },
];

const SERVICES = [
  {
    name: "Blueprint Review",
    price: "$500",
    desc: "1-hour review + a customized action plan for your current church follow-up process.",
  },
  {
    name: "Starter Build",
    price: "$2,500",
    desc: "First-time visitor pipeline fully built with message templates, automations, and 30 days of support.",
  },
  {
    name: "Full Pipeline",
    price: "$5,000-7,500",
    desc: "All five pipelines built, team training included, plus 90 days of implementation support.",
  },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, product: "church-followup-pipeline" }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.message || "Something went wrong. Try again.");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-lg shadow-brand-200">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-extrabold tracking-tight">Church Follow-Up Pipeline</div>
              <div className="text-xs text-slate-500">by HappyWP</div>
            </div>
          </div>
          <div className="hidden gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#blueprint" className="hover:text-brand-600">Blueprint</a>
            <a href="#stacks" className="hover:text-brand-600">Tech stack</a>
            <a href="#services" className="hover:text-brand-600">Implementation</a>
          </div>
          <a href="#download" className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-bold text-white hover:bg-brand-700">
            Get the guide
          </a>
        </div>
      </nav>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-16 px-4 py-20 sm:px-6 md:grid-cols-[1.1fr,0.9fr] md:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
              Free lead magnet + paid implementation path
            </div>
            <h1 className="mb-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-slate-900 md:text-6xl">
              Stop losing church visitors because follow-up is slow, generic, or nonexistent.
            </h1>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
              Get the exact follow-up pipeline Nathan recommends for churches: timing, owners, automation triggers,
              message templates, and the 90-day rollout plan.
            </p>
            <div className="mb-8 flex flex-wrap gap-3">
              {[
                "First-time visitor sequence",
                "Exact text + email templates",
                "RockRMS / Planning Center / GHL recommendations",
                "Implementation service options",
              ].map((item) => (
                <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
                  {item}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a href="#download" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-brand-200 hover:bg-brand-700">
                Get the free blueprint <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#services" className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-900 hover:bg-slate-100">
                See implementation options
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-white shadow-2xl shadow-slate-200/70">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-rose-500" />
              <div className="h-3 w-3 rounded-full bg-amber-500" />
              <div className="h-3 w-3 rounded-full bg-emerald-500" />
            </div>
            <div className="space-y-5 text-sm leading-relaxed">
              <div>
                <div className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-brand-300">Visitor submits a connection card</div>
                <div className="rounded-2xl bg-slate-800 p-4 text-slate-300">
                  Trigger fires instantly. Welcome text + email send in under 2 hours.
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-800 p-4">
                  <Phone className="mb-3 h-4 w-4 text-emerald-400" />
                  <div className="font-bold">24-hour human touch</div>
                  <div className="mt-1 text-slate-400">Pastor, staff, or trained volunteer makes the call.</div>
                </div>
                <div className="rounded-2xl bg-slate-800 p-4">
                  <Mail className="mb-3 h-4 w-4 text-brand-300" />
                  <div className="font-bold">7-day next step</div>
                  <div className="mt-1 text-slate-400">Invite them to one actual event, not a vague website link.</div>
                </div>
              </div>
              <div className="rounded-2xl border border-brand-400/30 bg-brand-500/10 p-4 text-brand-100">
                Includes the 14-day “we missed you” message, handwritten note timing, and escalation logic.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="download" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50 md:grid-cols-[1.1fr,0.9fr] md:p-12">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
              Free resource
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Get the full blueprint and use it this week.
            </h2>
            <p className="mb-6 max-w-xl text-slate-600">
              Nathan&apos;s guide breaks down the full five-pipeline system, exact timelines, scripts, tech-stack recommendations,
              and the rollout roadmap for churches that want to stop letting people drift away.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { Icon: CalendarClock, label: "90-day rollout plan" },
                { Icon: ClipboardList, label: "Ownership by staff vs automation" },
                { Icon: MessageSquare, label: "Copy-paste text + email templates" },
                { Icon: Users, label: "Pastor-friendly implementation recommendations" },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-medium text-slate-700">
                  <Icon className="h-4 w-4 text-brand-600" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-slate-50 p-6 md:p-8">
            {submitted ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-emerald-900">You&apos;re in.</h3>
                <p className="text-sm text-emerald-700">
                  The guide request is in. Nathan can follow up with the blueprint and implementation options.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-900">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@church.org"
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none ring-0 transition focus:border-brand-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-brand-600 px-5 py-3.5 text-sm font-bold text-white hover:bg-brand-700 disabled:opacity-60"
                >
                  {loading ? "Submitting..." : "Get the church follow-up blueprint"}
                </button>
                {error ? <p className="text-sm text-rose-600">{error}</p> : null}
                <p className="text-xs leading-relaxed text-slate-500">
                  This also raises a hand for HappyWP&apos;s church automation services. No spam. Just useful follow-up.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <section id="blueprint" className="border-y border-slate-200 bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-14 max-w-3xl">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">The five follow-up moments that actually matter</h2>
            <p className="text-slate-600">
              Most churches don&apos;t need more theory. They need a sequence with timing, ownership, and words they can actually send.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {MOMENTS.map((item) => (
              <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-7">
                <div className="mb-3 inline-flex rounded-full bg-brand-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-brand-700">
                  {item.timing}
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="stacks" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mb-12 max-w-2xl">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Recommended tech stacks by church size and budget</h2>
          <p className="text-slate-600">
            The guide doesn&apos;t pretend every church needs the same software. It gives the honest version.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {STACKS.map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
              <div className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-brand-700">{item.price}</div>
              <h3 className="mb-3 text-xl font-bold">{item.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="bg-slate-900 py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 max-w-3xl">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">If a church wants help, there&apos;s a real service behind the guide.</h2>
            <p className="text-slate-300">
              This isn&apos;t content for content&apos;s sake. It&apos;s a clean funnel into HappyWP church automation work.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {SERVICES.map((service) => (
              <div key={service.name} className="rounded-3xl border border-slate-700 bg-slate-800 p-8">
                <div className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-brand-300">{service.price}</div>
                <h3 className="mb-3 text-2xl font-bold">{service.name}</h3>
                <p className="mb-6 text-sm leading-relaxed text-slate-300">{service.desc}</p>
                <a href="#download" className="inline-flex items-center gap-2 text-sm font-bold text-white">
                  Raise your hand <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>Church Follow-Up Pipeline by HappyWP</div>
          <div>Email: nathan@happywp.co</div>
        </div>
      </footer>
    </main>
  );
}
