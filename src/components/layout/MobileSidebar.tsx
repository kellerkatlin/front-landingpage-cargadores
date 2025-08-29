import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { NavLink } from "react-router-dom";
import { Users, Receipt, ListChecks, Menu } from "lucide-react";

const NAV = [
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/sales", label: "Sales", icon: Receipt },
  { to: "/admin/estados", label: "Estados", icon: ListChecks },
];

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="p-0 bg-sidebar text-sidebar-foreground border-sidebar-border"
      >
        <SheetHeader className="px-4 py-3">
          <SheetTitle className="text-base">Admin · Cargador</SheetTitle>
        </SheetHeader>

        <nav className="px-2 pb-4 space-y-1">
          {NAV.map((item) => {
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
      </SheetContent>
    </Sheet>
  );
}
