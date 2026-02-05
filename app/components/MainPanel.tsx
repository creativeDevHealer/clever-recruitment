import {
  ArrowRightIcon,
  CheckIcon,
  LockIcon,
  PlayIcon,
  PulseIcon,
  SparkleIcon,
} from "./icons";

const picks = [
  { label: "Yesterday", tag: "Communication Chat", amount: "$50K" },
  { label: "Today", tag: "AI Automation Workflow", amount: "$747K", active: true },
];

const journey = [
  { title: "Your $500 Stripe Credit", subtitle: "Included with membership" },
  { title: "Why You Can See Everything", subtitle: "W1" },
  { title: "The 90-Day Signal", subtitle: "W1" },
  { title: "My 5-Minute Routine", subtitle: "W1" },
];

export default function MainPanel() {
  return (
    <div className="relative flex h-full flex-1">
      <div className="absolute bottom-4 right-6 z-10 grid h-10 w-10 place-items-center rounded-full bg-[#0b0f1a] text-white shadow-[0_10px_20px_rgba(0,0,0,0.35)]">
        <PulseIcon />
      </div>
      <div className="relative h-full w-full rounded-[22px] bg-white shadow-[0_25px_60px_rgba(15,23,42,0.35)]">
        <div className="h-full overflow-y-auto px-6 py-6 sm:px-8">
          <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-slate-200 text-xl font-semibold text-slate-600">
                J
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-semibold text-slate-900">
                    Welcome back, James
                  </h1>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                    Freemium
                  </span>
                </div>
                <p className="text-sm text-slate-500">
                  Let&apos;s discover winning sales talent together
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-500"
              >
                Upgrade
              </button>
              <button
                type="button"
                className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-500"
              >
                Today
              </button>
            </div>
          </header>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <section className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-orange-100 text-orange-500">
                    <SparkleIcon />
                  </span>
                  <h2 className="text-lg font-semibold">Editor&apos;s Picks</h2>
                </div>
                <span className="text-xs text-slate-400">
                  Curated daily by the team
                </span>
              </div>
              <div className="grid gap-5 lg:grid-cols-3">
                {picks.map((pick) => (
                  <div
                    key={pick.label}
                    className={`space-y-4 rounded-2xl border p-4 shadow-sm ${
                      pick.active
                        ? "border-blue-200 bg-blue-50/40"
                        : "border-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="uppercase">{pick.label}</span>
                      <span className="text-sm font-semibold text-blue-600">
                        {pick.amount}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-slate-100" />
                      <div className="space-y-1">
                        <div className="h-3 w-24 rounded-full bg-slate-200" />
                        <div className="inline-flex rounded-full border border-blue-200 bg-white px-2 py-0.5 text-xs text-blue-500">
                          {pick.tag}
                        </div>
                      </div>
                    </div>
                    <div className="h-20 rounded-xl bg-slate-100" />
                    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-400">
                      Upgrade to View
                    </div>
                  </div>
                ))}
                <div className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-dashed border-slate-200 p-4 text-center">
                  <p className="text-xs font-semibold text-slate-400">Tomorrow</p>
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-slate-100">
                    <div className="h-5 w-5 rounded-full border-2 border-slate-300" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                      New pick drops in
                    </p>
                    <div className="flex items-center justify-center gap-2 text-lg font-semibold text-slate-700">
                      <span>20</span>
                      <span className="text-xs text-slate-400">:</span>
                      <span>31</span>
                      <span className="text-xs text-slate-400">:</span>
                      <span>08</span>
                    </div>
                    <p className="text-xs text-slate-400">8am EST · daily</p>
                  </div>
                </div>
              </div>
            </section>

            <aside className="space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Your Journey
                  </h3>
                  <p className="text-xs text-slate-400">Week 1 of 6</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 text-slate-400">
                    <LockIcon />
                  </div>
                  <div className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                    0d
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>0/25 tasks</span>
                  <span>0%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100">
                  <div className="h-full w-[6%] rounded-full bg-blue-500" />
                </div>
              </div>
              <div className="space-y-3">
                {journey.map((item, index) => (
                  <div
                    key={item.title}
                    className={`flex items-center justify-between rounded-2xl border bg-white px-4 py-3 shadow-sm ${
                      index === 0 ? "border-purple-200/60" : "border-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-indigo-500">
                        {index === 0 ? "S" : "W1"}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {item.title}
                        </p>
                        <p className="text-xs text-slate-400">{item.subtitle}</p>
                      </div>
                    </div>
                    <div className="grid h-6 w-6 place-items-center rounded-full border border-slate-200 text-emerald-500">
                      <CheckIcon />
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 text-xs font-semibold text-slate-400"
              >
                Show All (9 more)
                <ArrowRightIcon />
              </button>
            </aside>
          </div>

          <section className="mt-10 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-blue-50 text-blue-500">
                  <PlayIcon />
                </span>
                <h3 className="text-lg font-semibold text-slate-900">
                  Discover Clever
                </h3>
              </div>
              <button
                type="button"
                className="flex items-center gap-2 text-xs font-semibold text-slate-400"
              >
                View training <ArrowRightIcon />
              </button>
            </div>
            <div className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:grid-cols-[minmax(0,1fr)_280px]">
              <div className="relative min-h-[220px] overflow-hidden rounded-2xl bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(15,23,42,0.12)_0%,_transparent_60%)]" />
                <div className="absolute bottom-6 right-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/90 shadow-lg">
                  <PlayIcon />
                </div>
                <div className="absolute top-6 left-6 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-600">
                  INTRO · 2-3 min
                </div>
              </div>
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-500">
                  INTRO
                </div>
                <h4 className="text-lg font-semibold text-slate-900">
                  The Clever Hiring System
                </h4>
                <p className="text-sm text-slate-500">
                  Learn how top sales teams spot high-intent candidates and
                  build repeatable outbound pipelines.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
