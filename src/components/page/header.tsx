'use client';

import { Logo } from "@/components/logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const navLinks = [
    { href: '/#collections', label: 'Collections' },
    { href: '/#ai-assistant', label: 'AI Assistant' },
    { href: '/#about', label: 'About Us' },
  ];

  return (
    <header
      className={cn(
        'p-4 md:p-6 z-10',
        isHome ? 'absolute inset-x-0 top-0 text-white' : 'relative bg-card/50'
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <Logo className={cn(isHome ? 'text-white' : 'text-primary', 'transition-colors')} />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn("text-sm font-medium hover:underline", isHome ? "text-white" : "text-foreground")}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div>
          <Button asChild variant={isHome ? "outline" : "default"} className={cn(isHome && "text-white border-white bg-transparent hover:bg-white hover:text-black")}>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
