"use client";

import Link from "next/link";

interface LogoProps {
  href?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  showText?: boolean;
}

const sizeClasses = {
  sm: "h-6 w-6",
  md: "h-8 w-8",
  lg: "h-10 w-10",
};

export function Logo({
  href = "/",
  size = "md",
  className,
  onClick,
  showText = true,
}: LogoProps) {
  const svgClass = `${sizeClasses[size]} flex-shrink-0`;

  const logo = (
    <svg
      className={svgClass}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      />
      <path
        d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      />
    </svg>
  );

  if (href && showText) {
    return (
      <Link
        href={href}
        className={`flex items-center gap-2 text-xl font-bold text-primary ${className || ""}`}
        aria-label="RentNest Home"
        onClick={onClick}
      >
        {logo}
        <span>RentNest</span>
      </Link>
    );
  }

  if (href) {
    return (
      <Link
        href={href}
        className={`inline-flex ${className || ""}`}
        aria-label="RentNest Home"
        onClick={onClick}
      >
        {logo}
      </Link>
    );
  }

  return (
    <div className={`inline-flex ${className || ""}`} aria-hidden="true">
      {logo}
    </div>
  );
}
