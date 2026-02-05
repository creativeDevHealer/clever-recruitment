import MainPanel from "./MainPanel";
import Sidebar from "./Sidebar";

export default function DashboardFrame() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#f4f6fb] text-slate-900">
      <div className="h-full w-full">
        <div className="relative h-full w-full bg-[#0b0f1a] p-3 shadow-[0_40px_80px_rgba(15,23,42,0.35)] box-border">
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
