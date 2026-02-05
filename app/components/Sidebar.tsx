import { ChevronIcon } from "./icons";

const primaryNav = [
  { label: "Home", active: true },
  { label: "Library", active: false, chevron: true },
  { label: "Saved", active: false },
  { label: "Monitoring", active: false },
  { label: "Competitors", active: false },
  { label: "Training", active: false },
  { label: "API", active: false },
];

const libraryItems = [
  "Web Apps",
  "Micro SaaS",
  "Mobile Apps",
  "All Brands",
];

export default function Sidebar() {
  return (
    <aside className="hidden h-full w-48 flex-col justify-between p-1 text-slate-200 lg:fixed lg:inset-y-3 lg:left-3 lg:flex lg:overflow-hidden">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 text-white">
            <span className="text-lg font-semibold">C</span>
          </div>
          <div>
            <p className="text-base font-semibold">Clever</p>
            <p className="text-xs text-slate-400">Recruiting OS</p>
          </div>
        </div>

        <div className="space-y-4">
          {primaryNav.slice(0, 2).map((item) => (
            <button
              key={item.label}
              type="button"
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition ${
                item.active
                  ? "bg-white/10 text-white"
                  : "text-slate-300 hover:bg-white/5"
              }`}
            >
              <span>{item.label}</span>
              {item.chevron ? (
                <span className="text-slate-500">
                  <ChevronIcon />
                </span>
              ) : null}
            </button>
          ))}

          <div className="space-y-2 pl-4 text-sm text-slate-400">
            {libraryItems.map((label) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-lg px-2 py-2 text-slate-400 hover:bg-white/5"
              >
                <span>{label}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-2">
            {primaryNav.slice(2).map((item) => (
              <button
                key={item.label}
                type="button"
                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-slate-300 hover:bg-white/5"
              >
                <span>{item.label}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3 border-t border-white/5 pt-3 mb-9">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-slate-500 via-slate-300 to-white" />
          <div>
            <p className="text-sm font-semibold">James Lee</p>
            <p className="text-xs text-slate-500">james@clever.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
