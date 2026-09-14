"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut, LayoutDashboard, User } from "lucide-react";
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/ui/logo";
import { roleToPath } from "@/lib/constants";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Properties", href: "/properties" },
  { name: "Categories", href: "/categories" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const { user, accessToken, logout } = useAuthStore();
  const { logout: logoutMutation } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    logout();
    await logoutMutation();
    setMobileMenuOpen(false);
  };

  const dashboardHref = user
    ? `/dashboard/${roleToPath[user.role as keyof typeof roleToPath]}`
    : "/";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8 relative"
        aria-label="Main navigation"
      >
        {/* Left slot */}
        <div className="hidden md:flex items-center gap-8">
          <Logo href="/" size="sm" />
        </div>

        {/* Center slot */}
        <div className="absolute left-1/2 -translate-x-1/2 md:hidden">
          <Logo href="/" size="sm" />
        </div>
        <div className="hidden md:flex md:items-center md:gap-6 md:flex-1 md:justify-center">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right slot */}
        <div className="flex items-center gap-4 ml-auto">
          {user && accessToken ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full"
                  />
                }
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage src="" alt={user.name} />
                  <AvatarFallback>
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  render={
                    <Link
                      href={dashboardHref}
                      className="flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                  }
                />
                <DropdownMenuItem
                  render={
                    <Link
                      href="/profile"
                      className="flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      Profile
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
          ) : (
            <div className="hidden md:flex md:items-center md:gap-2">
              <Link href="/auth/login">
                <Button variant="secondary" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm">Sign up</Button>
              </Link>
            </div>
          )}

          {/* Hamburger menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-lg"
                  className="md:hidden"
                  aria-label="Toggle menu"
                />
              }
            >
              <Menu className="size-6" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[80vw] max-w-sm p-4 flex h-full flex-col"
              showCloseButton={false}
            >
              <div className="flex flex-col gap-4 h-full">
                {/* Logo */}
                <div className="border-b pb-4 flex justify-center shrink-0">
                  <Logo
                    href="/"
                    size="sm"
                    showText
                    onClick={() => setMobileMenuOpen(false)}
                  />
                </div>

                {/* Nav links */}
                <nav
                  className="flex-1 overflow-y-auto shrink-0"
                  aria-label="Mobile navigation"
                >
                  <div className="h-full flex flex-col justify-center">
                    <div className="flex flex-col gap-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          aria-current={
                            pathname === item.href ? "page" : undefined
                          }
                          className={cn(
                            "text-lg font-medium text-center transition-colors hover:text-primary",
                            pathname === item.href
                              ? "text-primary"
                              : "text-muted-foreground",
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </nav>

                {/* Auth buttons */}
                <div className="border-t pt-4 flex flex-col gap-2 shrink-0">
                  {user && accessToken ? (
                    <>
                      <Link
                        href={dashboardHref}
                        className="text-lg font-medium text-center text-foreground"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        className="text-lg font-medium text-center text-foreground"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Button
                        variant="outline"
                        className="w-full justify-center"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Log out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/auth/login"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Button
                          variant="secondary"
                          className="w-full justify-center"
                        >
                          Log in
                        </Button>
                      </Link>
                      <Link
                        href="/auth/register"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Button className="w-full justify-center">
                          Sign up
                        </Button>
                      </Link>
                    </>
                  )}
                </div>

                {/* Close button */}
                <div className="flex justify-center py-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <X className="size-6" />
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
