'use client';

import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Search, MessageCircle } from "lucide-react";

interface NavLink {
  href: string;
  label: string;
}

export function HomeHero() {

  const navLinks: NavLink[] = [
    { href: '/#collections', label: 'Collections' },
    { href: '/#about', label: 'About Us' },
  ];
  
  const backgroundImage = "https://i.ibb.co/ZzvqN84g/unnamed-2.png";

  return (
    <div className="relative h-screen w-full text-white bg-black">
        <Image
            src={backgroundImage}
            alt="Futuristic fashion model"
            fill
            priority
            className="object-cover object-center z-0"
            data-ai-hint="futuristic fashion"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10" />
        
        <header className="absolute inset-x-0 top-0 p-4 md:p-6 z-20">
            <div className="container mx-auto flex items-center justify-between">
            <Link href="/">
                <Logo className="text-white transition-colors text-4xl" />
            </Link>
            <nav className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-white hover:text-gray-300 transition-colors"
                >
                    {link.label}
                </Link>
                ))}
            </nav>
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
                </Button>
                <Button asChild variant="outline" className="text-white border-white bg-transparent hover:bg-white hover:text-black">
                <Link href="/login">Login</Link>
                </Button>
            </div>
            </div>
        </header>

        <div className="container mx-auto px-4 relative z-20 flex h-full items-center">
            <div className="max-w-xl">
                <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                    NS Fashion Wear
                </h1>
                <p className="mt-4 font-body text-lg md:text-xl lg:text-2xl italic text-gray-300">
                    Style for Every Day & Every Occasion
                </p>

            </div>
        </div>
        
        <footer className="absolute inset-x-0 bottom-0 p-4 md:p-6 z-20">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-sm">v1.0 - NS Fashion</div>
                <Button variant="ghost" size="icon" className="text-white bg-white/10 hover:bg-white/20 rounded-full">
                    <MessageCircle className="h-6 w-6" />
                    <span className="sr-only">Chat</span>
                </Button>
            </div>
        </footer>
    </div>
  );
}
