import { Outlet, Link } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { MobileSidebar } from "./MobileSidebar";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        {/* Sidebar desktop */}
        <AppSidebar />

        {/* Main area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header className="h-14 flex items-center gap-3 px-4 border-b border-border">
            <MobileSidebar />
            <Link to="/" className="font-semibold md:hidden">
              Admin · Cargador
            </Link>
          </header>

          {/* Content */}
          <main className="p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
