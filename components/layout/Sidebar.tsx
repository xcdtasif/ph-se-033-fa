"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  LayoutDashboard,
  Building2,
  Users,
  DollarSign,
  FileText,
  Settings,
  LogOut,
  User,
  Home,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { roleToPath, type UserRole } from "@/lib/constants";
import { cn } from "@/lib/utils";

type NavItem = {
  name: string;
  href: string;
  icon: React.ElementType;
};

const tenantNavigation: NavItem[] = [
  { name: "Dashboard", href: "/dashboard/tenant", icon: LayoutDashboard },
  { name: "My Requests", href: "/dashboard/tenant/requests", icon: FileText },
  { name: "Payments", href: "/dashboard/tenant/payments", icon: DollarSign },
  { name: "Reviews", href: "/dashboard/tenant/reviews", icon: FileText },
];

const landlordNavigation: NavItem[] = [
  { name: "Dashboard", href: "/dashboard/landlord", icon: LayoutDashboard },
  {
    name: "Properties",
    href: "/dashboard/landlord/properties",
    icon: Building2,
  },
  { name: "Requests", href: "/dashboard/landlord/requests", icon: FileText },
  { name: "Payments", href: "/dashboard/landlord/payments", icon: DollarSign },
  { name: "Analytics", href: "/dashboard/landlord/analytics", icon: Home },
];

const adminNavigation: NavItem[] = [
  { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
  { name: "Users", href: "/dashboard/admin/users", icon: Users },
  { name: "Properties", href: "/dashboard/admin/properties", icon: Building2 },
  { name: "Requests", href: "/dashboard/admin/requests", icon: FileText },
  { name: "Payments", href: "/dashboard/admin/payments", icon: DollarSign },
  { name: "Analytics", href: "/dashboard/admin/analytics", icon: Home },
];

interface UserMenuProps {
  user: { name: string; email: string; role: UserRole };
  collapsed: boolean;
}

function UserMenu({ user, collapsed }: UserMenuProps) {
  const { logout: logoutMutation } = useAuth();
  const { logout } = useAuthStore();
  const dashboardHref = `/dashboard/${roleToPath[user.role]}`;

  const handleLogout = async () => {
    logout();
    await logoutMutation();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant={collapsed ? "ghost" : "outline"}
            className={cn(
              collapsed
                ? "h-10 w-10 rounded-full mx-auto"
                : "w-full justify-start gap-3",
            )}
          />
        }
      >
        <Avatar className={cn("h-8 w-8", collapsed && "h-10 w-10")}>
          <AvatarImage src="" alt={user.name} />
          <AvatarFallback className={cn(collapsed && "text-xs")}>
            {user.name?.charAt(0).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        {!collapsed && (
          <div className="text-left flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground capitalize">
              {user.role.toLowerCase()}
            </p>
          </div>
        )}
        {!collapsed && <ChevronRight className="h-4 w-4" />}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={cn("w-56", collapsed && "w-48")}
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          render={
            <Link href={dashboardHref} className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
          }
        />
        <DropdownMenuItem
          render={
            <Link href="/profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </Link>
          }
        />
        <DropdownMenuItem
          render={
            <Link href="/settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          }
        />
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface NavLinkProps {
  item: NavItem;
  isActive: boolean;
  collapsed: boolean;
  onToggle?: () => void;
}

function NavLink({ item, isActive, collapsed, onToggle }: NavLinkProps) {
  if (!collapsed) {
    return (
      <Link
        href={item.href}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        )}
      >
        <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
        <span>{item.name}</span>
      </Link>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger>
        <Link
          href={item.href}
          aria-current={isActive ? "page" : undefined}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors justify-center",
            isActive
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
          )}
          onClick={onToggle}
        >
          <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{item.name}</TooltipContent>
    </Tooltip>
  );
}

export function Sidebar({
  collapsed = false,
  onToggle,
}: {
  collapsed?: boolean;
  onToggle?: () => void;
}) {
  const pathname = usePathname();
  const { user, accessToken } = useAuthStore();

  const navigation =
    user?.role === "TENANT"
      ? tenantNavigation
      : user?.role === "LANDLORD"
        ? landlordNavigation
        : adminNavigation;

  if (!user || !accessToken) {
    return null;
  }

  return (
    <TooltipProvider>
      <aside
        className={cn(
          "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] border-r bg-card transition-all duration-200",
          collapsed ? "w-16" : "w-64",
        )}
        aria-label="Dashboard navigation"
      >
        <nav className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between px-4 border-b">
            {!collapsed && (
              <span className="font-semibold text-lg text-foreground">
                {user.role.charAt(0) + user.role.slice(1).toLowerCase()} Panel
              </span>
            )}
            {onToggle && (
              <Button
                variant="ghost"
                size="icon"
                className={cn("h-8 w-8", collapsed && "rotate-180")}
                onClick={onToggle}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                aria-expanded={!collapsed}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <NavLink
                  key={item.name}
                  item={item}
                  isActive={isActive}
                  collapsed={collapsed}
                  onToggle={onToggle}
                />
              );
            })}
          </div>

          <div className="border-t p-4">
            <UserMenu user={user} collapsed={collapsed} />
          </div>
        </nav>
      </aside>
    </TooltipProvider>
  );
}
