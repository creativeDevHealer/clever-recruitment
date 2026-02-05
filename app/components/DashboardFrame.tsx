import MainPanel from "./MainPanel";
import Sidebar from "./Sidebar";
import { Bot } from "lucide-react";

export default function DashboardFrame() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#f4f6fb] text-slate-900">
      <div className="h-full w-full">
        <div className="relative h-full w-full bg-[#0b0f1a] p-3 shadow-[0_40px_80px_rgba(15,23,42,0.35)] box-border">
          <button
            type="button"
            aria-label="Open chatbot"
            className="absolute bottom-5 right-8 z-20 grid h-10 w-10 place-items-center rounded-full bg-[#0b0f1a] text-white shadow-[0_10px_20px_rgba(0,0,0,0.35)]"
          >
            <Bot className="h-5 w-5" />
          </button>
          <div className="flex h-full gap-4">
            <div className="hidden w-48 shrink-0 lg:block" />
            <Sidebar />
            <MainPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
