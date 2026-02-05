"use client";

import { useState } from "react";
import {
  Bookmark,
  ChevronDown,
  Code2,
  GraduationCap,
  Home,
  Library,
  Monitor,
  Target,
} from "lucide-react";

const primaryNav = [
  { label: "Home", icon: <Home className="h-4 w-4" /> },
  { label: "Library", chevron: true, icon: <Library className="h-4 w-4" /> },
  { label: "Saved", icon: <Bookmark className="h-4 w-4" /> },
  { label: "Monitoring", icon: <Monitor className="h-4 w-4" /> },
  { label: "Competitors", icon: <Target className="h-4 w-4" /> },
  { label: "Training", icon: <GraduationCap className="h-4 w-4" /> },
  { label: "API", icon: <Code2 className="h-4 w-4" /> },
];

const libraryItems = [
  "SDRs",
  "Account Execs",
  "Sales Ops",
  "All Roles",
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Home");
  const [activeLibrary, setActiveLibrary] = useState("SDRs");
  const [libraryOpen, setLibraryOpen] = useState(true);

  return (
    <aside className="hidden h-full w-48 flex-col justify-between rounded-[22px] p-2 text-slate-200 lg:fixed lg:inset-y-4 lg:left-4 lg:flex lg:overflow-hidden">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 text-white">
            <span className="text-lg font-semibold">C</span>
          </div>
          <div>
            <p className="text-base font-semibold">Clever</p>
            <p className="text-xs text-slate-400">Recruiting OS</p>
          </div>
        </div>

        <div className="space-y-3">
          {primaryNav.slice(0, 2).map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                setActiveItem(item.label);
                if (item.chevron) {
                  setLibraryOpen((prev) => !prev);
                }
              }}
              className={`flex w-full items-center justify-between rounded-xl px-2 py-3 text-sm transition ${
                activeItem === item.label
                  ? "bg-white/10 text-white"
                  : "text-slate-300 hover:bg-white/5"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-slate-400">{item.icon}</span>
                <span>{item.label}</span>
              </span>
              {item.chevron ? (
                <span
                  className={`text-slate-500 transition ${
                    libraryOpen ? "rotate-0" : "-rotate-90"
                  }`}
                >
                  <ChevronDown className="h-4 w-4" />
                </span>
              ) : null}
            </button>
          ))}

          {libraryOpen ? (
            <div className="space-y-2 pl-3 text-sm text-slate-400">
              {libraryItems.map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setActiveLibrary(label)}
                  className={`flex w-full items-center justify-between rounded-lg px-2 py-2 transition ${
                    activeLibrary === label
                      ? "bg-white/5 text-slate-100"
                      : "text-slate-400 hover:bg-white/5"
                  }`}
                >
                <span>{label}</span>
                </button>
              ))}
            </div>
          ) : null}

            {primaryNav.slice(2).map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setActiveItem(item.label)}
                className={`flex w-full items-center justify-between rounded-xl px-2 py-3 text-sm transition ${
                  activeItem === item.label
                    ? "bg-white/10 text-white"
                    : "text-slate-300 hover:bg-white/5"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-slate-400">{item.icon}</span>
                  <span>{item.label}</span>
                </span>
              </button>
            ))}
        </div>
      </div>

      <div className="space-y-3 border-t border-white/5 pt-3 mb-8">
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
