import { NavLink } from "react-router-dom";
import { Users, Receipt, ListChecks } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

type NavItem = {
  to: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const NAV_ITEMS: NavItem[] = [
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/sales", label: "Sales", icon: Receipt },
  { to: "/admin/estados", label: "Estados", icon: ListChecks },
];

export function AppSidebar() {
  return (
    <aside
      className={`
        hidden md:flex
        h-screen w-64 shrink-0
        flex-col
        bg-sidebar text-sidebar-foreground
        border-r border-sidebar-border
      `}
    >
      {/* Brand */}
      <div className="h-14 px-4 flex items-center font-semibold">
        <span className="truncate">Admin · Cargador</span>
      </div>
      <Separator className="bg-sidebar-border" />

      {/* Nav */}
      <ScrollArea className="flex-1 px-2 py-3">
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  ].join(" ")
                }
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Footer sidebar (opcional) */}
      <div className="h-12 px-4 flex items-center text-xs text-muted-foreground/70 border-t border-sidebar-border">
        v1.0 • Admin
      </div>
    </aside>
  );
}
