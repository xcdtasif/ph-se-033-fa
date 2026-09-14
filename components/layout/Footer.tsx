import { Globe, Mail, MessageCircle } from "lucide-react";
import * as React from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Logo } from "@/components/ui/logo";
import { currentYear } from "@/lib/constants";

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "FAQs", href: "/faqs" },
    { name: "Safety", href: "/safety" },
    { name: "Report Issue", href: "/report" },
  ],
};

const sections = [
  { key: "company", title: "Company" },
  { key: "legal", title: "Legal" },
  { key: "support", title: "Support" },
] as const;

export function Footer() {
  return (
    <footer className="border-t bg-muted/30" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Desktop, >= lg */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-[2fr_repeat(3,1fr)] gap-8 py-8 items-start">
            {/* Brand */}
            <div className="flex flex-col items-center text-center">
              <Logo href="/" size="sm" showText />
              <p className="mt-2 max-w-sm text-base text-muted-foreground">
                Find and list rental properties with ease. Connecting tenants
                and landlords through a seamless marketplace experience.
              </p>
              <div className="flex items-center gap-4 mt-2">
                <a
                  href="#"
                  aria-label="Website"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Globe className="h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  href="#"
                  aria-label="Email"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  href="#"
                  aria-label="Contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* 3 columns */}
            {sections.map((section) => (
              <div key={section.key} className="text-center">
                <h3 className="text-sm font-semibold text-foreground mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2" role="list">
                  {footerLinks[section.key].map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Copyright */}
          <div className="pb-8 text-center">
            <p className="text-[10pt] text-muted-foreground">
              &copy; {currentYear} RentNest. All rights reserved.
            </p>
          </div>
        </div>

        {/* Tablet, md –> lg */}
        <div className="hidden md:block lg:hidden">
          {/* Brand */}
          <div className="flex flex-col items-center py-8 text-center px-8">
            <Logo href="/" size="sm" showText />
            <p className="mt-4 text-base text-muted-foreground max-w-lg">
              Find and list rental properties with ease. Connecting tenants and
              landlords through a seamless marketplace experience.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="#"
                aria-label="Website"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Globe className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-label="Email"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-label="Contact"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* 3 columns */}
          <div className="grid grid-cols-3 gap-8 pb-8">
            {sections.map((section) => (
              <div key={section.key} className="text-center">
                <h3 className="text-sm font-semibold text-foreground mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2" role="list">
                  {footerLinks[section.key].map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Copyright */}
          <div className="pb-8 text-center">
            <p className="text-[10pt] text-muted-foreground">
              &copy; {currentYear} RentNest. All rights reserved.
            </p>
          </div>
        </div>

        {/* Mobile, < md */}
        <div className="md:hidden">
          {/* Brand */}
          <div className="flex flex-col items-center py-8 text-center px-6">
            <Logo href="/" size="sm" showText />
            <p className="mt-4 text-base text-muted-foreground max-w-sm">
              Find and list rental properties with ease. Connecting tenants and
              landlords through a seamless marketplace experience.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="#"
                aria-label="Website"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Globe className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-label="Email"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-label="Contact"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Accordion */}
          <div className="pb-8">
            <Accordion className="w-full">
              {sections.map((section) => (
                <AccordionItem key={section.key} value={section.key}>
                  <AccordionTrigger className="justify-center text-center">
                    {section.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-3 text-center" role="list">
                      {footerLinks[section.key].map((link) => (
                        <li key={link.name}>
                          <Link
                            href={link.href}
                            className="text-sm text-muted-foreground transition-colors hover:text-primary"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Copyright */}
          <div className="pb-8 text-center">
            <p className="text-[10pt] text-muted-foreground">
              &copy; {currentYear} RentNest. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
