"use client";

import { useEffect, useMemo, useState, type MouseEvent } from "react";
import {
  ArrowRight as ArrowRightIcon,
  ChevronDown as ChevronIcon,
  Clock,
  Flame as FlameIcon,
  LayoutGrid as GridIcon,
  Lock as LockIcon,
  MessageCircle as LiveChatIcon,
  MessageSquare as ChatSquareIcon,
  Monitor as MonitorIcon,
  Play as PlayIcon,
  Sparkles as SparkleIcon,
  Target as TargetIcon,
} from "lucide-react";

const pickCards = [
  {
    id: "yesterday",
    label: "Yesterday",
    tag: "Outbound Outreach",
    amount: "$50K",
    ads: "108 leads",
    categories: ["Outbound", "New"],
    rangeStart: "Dec 26",
    rangeEnd: "Feb 3",
    peakLabel: "49.3K",
    dates: [
      "Jan 14",
      "Jan 16",
      "Jan 18",
      "Jan 20",
      "Jan 22",
      "Jan 24",
      "Jan 26",
      "Jan 28",
      "Jan 30",
      "Feb 1",
      "Feb 2",
      "Feb 3",
    ],
    revenue: [12, 14, 13, 15, 16, 14, 18, 19, 17, 22, 26, 24],
    spend: [9, 10, 11, 10, 11, 12, 12, 13, 12, 13, 14, 13],
  },
  {
    id: "today",
    label: "Today",
    tag: "AI Screening Workflow",
    amount: "$747K",
    ads: "574 leads",
    categories: ["Enterprise"],
    rangeStart: "Dec 26",
    rangeEnd: "Feb 3",
    peakLabel: "1.4M",
    dates: [
      "Jan 14",
      "Jan 16",
      "Jan 18",
      "Jan 20",
      "Jan 22",
      "Jan 24",
      "Jan 26",
      "Jan 28",
      "Jan 30",
      "Feb 1",
      "Feb 2",
      "Feb 3",
    ],
    revenue: [18, 20, 19, 22, 24, 23, 26, 28, 27, 30, 34, 36],
    spend: [11, 12, 12, 13, 14, 15, 15, 16, 16, 17, 18, 18],
  },
];

const baseJourneyItems = [
  {
    id: "credit",
    title: "Your $500 Stripe Credit",
    subtitle: "Included with membership",
    badge: "S",
    icon: "credit",
    highlight: true,
    extra: false,
  },
  {
    id: "visibility",
    title: "Why You Can See Everything",
    subtitle: "W1",
    badge: "W1",
    icon: "play",
    highlight: false,
    extra: false,
  },
  {
    id: "signal",
    title: "The 90-Day Signal",
    subtitle: "W1",
    badge: "W1",
    icon: "target",
    highlight: false,
    extra: false,
  },
  {
    id: "routine",
    title: "My 5-Minute Routine",
    subtitle: "W1",
    badge: "W1",
    icon: "monitor",
    highlight: false,
    extra: false,
  },
];

const extraJourneyItems = Array.from({ length: 9 }, (_, index) => ({
  id: `extra-${index + 1}`,
  title: `Hiring System Module ${index + 1}`,
  subtitle: `W${Math.min(index + 2, 6)}`,
  badge: `W${Math.min(index + 2, 6)}`,
  icon: "target",
  highlight: false,
  extra: true,
}));

const journeyItems = [...baseJourneyItems, ...extraJourneyItems];

const TIME_ZONE = "America/New_York";

type TimeParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
};

function getTimeZoneParts(date: Date, timeZone: string): TimeParts {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const parts = formatter.formatToParts(date);
  const lookup: Record<string, string> = {};
  parts.forEach((part) => {
    lookup[part.type] = part.value;
  });
  return {
    year: Number(lookup.year),
    month: Number(lookup.month),
    day: Number(lookup.day),
    hour: Number(lookup.hour),
    minute: Number(lookup.minute),
    second: Number(lookup.second),
  };
}

function getTimeZoneOffset(date: Date, timeZone: string) {
  const parts = getTimeZoneParts(date, timeZone);
  const asUTC = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second
  );
  return asUTC - date.getTime();
}

function zonedTimeToUtc(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number,
  timeZone: string
) {
  const utcGuess = Date.UTC(year, month - 1, day, hour, minute, second);
  let offset = getTimeZoneOffset(new Date(utcGuess), timeZone);
  let utcTime = utcGuess - offset;
  const offsetCheck = getTimeZoneOffset(new Date(utcTime), timeZone);
  if (offsetCheck !== offset) {
    utcTime = utcGuess - offsetCheck;
  }
  return utcTime;
}

function MiniChart({
  revenue,
  spend,
  labels,
  rangeStart,
  rangeEnd,
  peakLabel,
  active,
}: {
  revenue: number[];
  spend: number[];
  labels: string[];
  rangeStart: string;
  rangeEnd: string;
  peakLabel: string;
  active?: boolean;
}) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const { revenuePoints, spendPoints, xPositions, revenueYs, spendYs } =
    useMemo(() => {
      const combined = [...revenue, ...spend];
      const min = Math.min(...combined);
      const max = Math.max(...combined);
      const step = 120 / (revenue.length - 1);
      const xValues = revenue.map((_, index) => index * step);
      const range = max - min || 1;
      const mapY = (value: number) =>
        40 - ((value - min) / range) * (40 - 6) - 3;
      const revenuePointsValue = revenue
        .map((value, index) => {
          const x = xValues[index];
          const y = mapY(value);
          return `${x.toFixed(1)},${y.toFixed(1)}`;
        })
        .join(" ");
      const spendPointsValue = spend
        .map((value, index) => {
          const x = xValues[index];
          const y = mapY(value);
          return `${x.toFixed(1)},${y.toFixed(1)}`;
        })
        .join(" ");
      return {
        revenuePoints: revenuePointsValue,
        spendPoints: spendPointsValue,
        xPositions: xValues,
        revenueYs: revenue.map(mapY),
        spendYs: spend.map(mapY),
      };
    }, [revenue, spend]);

  const tooltip =
    hoverIndex !== null
      ? {
          date: labels[hoverIndex] ?? "",
          revenue: revenue[hoverIndex] ?? 0,
          spend: spend[hoverIndex] ?? 0,
          x: xPositions[hoverIndex] ?? 0,
          revenueY: revenueYs[hoverIndex] ?? 0,
          spendY: spendYs[hoverIndex] ?? 0,
        }
      : null;

  const handleMove = (event: MouseEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const ratio = Math.min(Math.max(x / rect.width, 0), 1);
    const index = Math.round(ratio * (revenue.length - 1));
    setHoverIndex(index);
  };

  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <div className="flex items-center justify-between text-[10px] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          <span>Monthly Rev</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          <span>Spend</span>
        </div>
      </div>
      <div className="relative mt-2">
        <svg
          viewBox="0 0 120 40"
          className="h-10 w-full"
          onMouseMove={handleMove}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <defs>
            <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line
            x1="0"
            x2="120"
            y1="6"
            y2="6"
            stroke="#cbd5f5"
            strokeDasharray="4 4"
            strokeWidth="1"
          />
          <path
            d={`M${revenuePoints} L120 38 L0 38 Z`}
            fill="url(#revFill)"
          />
          {tooltip ? (
            <line
              x1={tooltip.x}
              x2={tooltip.x}
              y1="0"
              y2="40"
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          ) : null}
          <polyline
            points={revenuePoints}
            fill="none"
            stroke={active ? "#2563eb" : "#94a3b8"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points={spendPoints}
            fill="none"
            stroke="#cbd5f5"
            strokeDasharray="3 3"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          {tooltip ? (
            <>
              <circle
                cx={tooltip.x}
                cy={tooltip.revenueY}
                r="2.5"
                fill={active ? "#2563eb" : "#94a3b8"}
              />
              <circle
                cx={tooltip.x}
                cy={tooltip.spendY}
                r="2.5"
                fill="#94a3b8"
              />
            </>
          ) : null}
        </svg>
        <div className="pointer-events-none absolute -top-1 right-0 text-[10px] font-semibold text-slate-400">
          {peakLabel}
        </div>
        <div className="pointer-events-none absolute -bottom-3 left-0 text-[10px] text-slate-400">
          {rangeStart}
        </div>
        <div className="pointer-events-none absolute -bottom-3 right-0 text-[10px] text-slate-400">
          {rangeEnd}
        </div>
        {tooltip ? (
          <div
            className="pointer-events-none absolute top-0 w-40 rounded-xl border border-slate-200 bg-white p-2 text-[11px] text-slate-500 shadow-lg"
            style={{
              left: `${Math.min(Math.max((tooltip.x / 120) * 100, 8), 92)}%`,
              transform: "translate(-50%, -8px)",
            }}
          >
            <p className="text-xs font-semibold text-slate-700">
              {tooltip.date}
            </p>
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  Monthly Rev
                </span>
                <span className="font-semibold text-slate-700">
                  ${tooltip.revenue.toFixed(1)}K/mo
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                  Ad Spend
                </span>
                <span className="font-semibold text-slate-700">
                  ${tooltip.spend.toFixed(1)}K/day
                </span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function MainPanel() {
  const activePick = "today";
  const [showAll, setShowAll] = useState(false);
  const [dropCountdown, setDropCountdown] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const extraCount = journeyItems.filter((item) => item.extra).length;
  const totalTasks = 25;
  const completedTasks = 0;
  const journeyPercent = 0;

  const visibleJourney = showAll
    ? journeyItems
    : journeyItems.filter((item) => !item.extra);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const nowParts = getTimeZoneParts(now, TIME_ZONE);
      let targetYear = nowParts.year;
      let targetMonth = nowParts.month;
      let targetDay = nowParts.day;

      if (nowParts.hour >= 8) {
        const nextDay = new Date(
          Date.UTC(nowParts.year, nowParts.month - 1, nowParts.day)
        );
        nextDay.setUTCDate(nextDay.getUTCDate() + 1);
        targetYear = nextDay.getUTCFullYear();
        targetMonth = nextDay.getUTCMonth() + 1;
        targetDay = nextDay.getUTCDate();
      }

      const targetUtc = zonedTimeToUtc(
        targetYear,
        targetMonth,
        targetDay,
        8,
        0,
        0,
        TIME_ZONE
      );
      const diffMs = Math.max(targetUtc - now.getTime(), 0);
      const totalSeconds = Math.floor(diffMs / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      const pad = (value: number) => value.toString().padStart(2, "0");
      setDropCountdown({
        hours: pad(hours),
        minutes: pad(minutes),
        seconds: pad(seconds),
      });
    };

    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="relative flex h-full flex-1">
      <div className="relative h-full w-full overflow-hidden rounded-[26px] bg-white shadow-[0_25px_60px_rgba(15,23,42,0.35)]">
        <div className="h-full overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
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
          </header>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_35%]">
            <section className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="grid h-9 w-9 place-items-center rounded-full text-orange-500">
                    <SparkleIcon className="h-5 w-5" />
                  </span>
                  <h2 className="text-lg font-semibold">Editor&apos;s Picks</h2>
                </div>
                <span className="text-xs text-slate-400">
                  Curated daily by the team
                </span>
              </div>
              <div className="grid gap-5 lg:grid-cols-3">
                {pickCards.map((pick) => {
                  const isActive = activePick === pick.id;
                  return (
                    <div
                      key={pick.id}
                      className={`relative space-y-4 rounded-2xl border p-4 text-left shadow-sm transition ${
                        isActive
                          ? "border-blue-200 bg-blue-50/40"
                          : "border-slate-200"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="uppercase tracking-[0.12em]">
                          {pick.label}
                        </span>
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
                      <MiniChart
                        revenue={pick.revenue}
                        spend={pick.spend}
                        labels={pick.dates}
                        rangeStart={pick.rangeStart}
                        rangeEnd={pick.rangeEnd}
                        peakLabel={pick.peakLabel}
                        active={isActive}
                      />
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>{pick.ads}</span>
                        <span className="text-slate-300">...</span>
                      </div>
                      <div
                        className={`rounded-xl border px-3 py-2 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)] backdrop-blur-sm ${
                          isActive
                            ? "border-amber-200/70 bg-[linear-gradient(120deg,_rgba(255,233,202,0.6)_0%,_rgba(255,244,228,0.85)_70%)]"
                            : "border-slate-200 bg-slate-50/60"
                        }`}
                      >
                        <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                          Why this pick
                        </div>
                        <div className="mt-3 flex justify-center">
                          <div className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 text-slate-300">
                            <LockIcon className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-400">
                        <LockIcon className="h-4 w-4" />
                        Upgrade to View
                      </div>
                    </div>
                  );
                })}
                <div className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-dashed border-slate-200 p-4 text-center">
                  <p className="text-xs font-semibold text-slate-400">
                    Tomorrow
                  </p>
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-slate-100">
                    <Clock className="h-5 w-5 text-slate-300" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                      New pick drops in
                    </p>
                    <div className="flex items-center justify-center gap-2 text-lg font-semibold text-slate-700">
                      <span>{dropCountdown.hours}</span>
                      <span className="text-xs text-slate-400">:</span>
                      <span>{dropCountdown.minutes}</span>
                      <span className="text-xs text-slate-400">:</span>
                      <span>{dropCountdown.seconds}</span>
                    </div>
                    <p className="text-xs text-slate-400">8am EST - daily</p>
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
                  <span className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-400">
                    <LockIcon className="h-4 w-4" />
                  </span>
                  <div className="flex items-center gap-1 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 h-8">
                    <FlameIcon className="h-4 w-4" />
                    0d
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>
                    {completedTasks}/{totalTasks} tasks
                  </span>
                  <span>{journeyPercent}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-500"
                    style={{ width: `${journeyPercent}%` }}
                  />
                </div>
              </div>
              <div className="space-y-3 scrollbar-thin max-h-[380px] overflow-y-auto pr-1">
                {visibleJourney.map((item) => {
                  const iconMap = {
                    play: PlayIcon,
                    target: TargetIcon,
                    monitor: MonitorIcon,
                  } as const;
                  const Icon = iconMap[item.icon as keyof typeof iconMap];
                  return (
                    <div
                      key={item.id}
                      className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 shadow-sm ${
                        item.highlight
                          ? "border-indigo-200/60 bg-[linear-gradient(120deg,_rgba(226,232,255,0.7)_0%,_rgba(255,255,255,0.95)_70%)]"
                          : "border-slate-200 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`grid h-10 w-10 place-items-center rounded-xl ${
                            item.highlight
                              ? "bg-indigo-100 text-indigo-600"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {item.highlight ? (
                            <span className="text-lg font-semibold">S</span>
                          ) : Icon ? (
                            <Icon className="h-4 w-4" />
                          ) : (
                            <SparkleIcon className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          {!item.highlight ? (
                            <div className="flex items-center gap-3">
                              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                                {item.badge}
                              </span>
                              <p className="text-sm font-semibold text-slate-800">
                                {item.title}
                              </p>
                            </div>
                          ) : (
                            <p className="text-sm font-semibold text-slate-800">
                              {item.title}
                            </p>
                          )}
                          {item.highlight ? (
                            <p className="text-xs text-slate-400">
                              {item.subtitle}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      <div className="grid h-7 w-7 place-items-center rounded-full border border-slate-200 text-slate-400">
                        {item.highlight ? (
                          <LockIcon className="h-4 w-4" />
                        ) : (
                          <ChevronIcon className="h-4 w-4" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => setShowAll((prev) => !prev)}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-500"
              >
                {showAll ? "Show Less" : `Show All (${extraCount} more)`}
                <span
                  className={`transition ${showAll ? "rotate-180" : "rotate-0"}`}
                >
                  <ChevronIcon className="h-4 w-4" />
                </span>
              </button>
            </aside>
          </div>

          <section className="mt-10 space-y-5 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                  <span className="grid h-9 w-9 place-items-center rounded-full text-blue-500">
                    <PlayIcon className="h-5 w-5" />
                  </span>
                <h3 className="text-lg font-semibold text-slate-900">
                  Discover Clever
                </h3>
              </div>
              <button
                type="button"
                className="flex items-center gap-2 text-xs font-semibold text-slate-400"
              >
                View training <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-6 rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[minmax(0,1fr)_30%]">
              <div className="relative min-h-[400] overflow-hidden lg:rounded-l-2xl">
                <video
                  className="h-full w-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                >
                  <source src="/media/clever-intro.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="flex h-full flex-col pt-6">
                <div className="justify-content">
                  <div className="inline-flex items-center gap-2 rounded-sm bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-500">
                    INTRO
                  </div>
                  <span className="ml-2 text-xs text-slate-500">2-3 min</span>
                </div>
                <h4 className="mt-3 text-lg font-semibold text-slate-900">
                  The Clever Hiring System
                </h4>
                <p className="text-sm text-slate-500">
                  Learn how top sales teams spot high-intent candidates and
                  build repeatable outbound pipelines.
                </p>
                <div className="mt-auto border-t border-slate-100 pb-4 pr-4">
                  <p className="text-xs font-semibold text-slate-400">
                    Ready to start?
                  </p>
                  <button
                    type="button"
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 cursor-pointer relative z-10"
                  >
                    Get Premium Access
                    <ArrowRightIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          <div className="border-t border-slate-100 pt-4 pb-6">
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-400">
              <button
                type="button"
                className="flex items-center gap-2 transition hover:text-slate-500"
              >
                <ChatSquareIcon className="h-4 w-4" />
                Share Feedback
              </button>
              <span className="hidden h-3 w-px bg-slate-200 sm:inline-block" />
              <button
                type="button"
                className="flex items-center gap-2 transition hover:text-slate-500"
              >
                <LiveChatIcon className="h-4 w-4" />
                Live Chat
              </button>
              <span className="hidden h-3 w-px bg-slate-200 sm:inline-block" />
              <button
                type="button"
                className="flex items-center gap-2 transition hover:text-slate-500"
              >
                <GridIcon className="h-4 w-4" />
                All Training
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
