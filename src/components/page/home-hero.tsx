'use client';

import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Search, MessageCircle } from "lucide-react";
import { useState } from "react";

interface NavLink {
  href: string;
  label: string;
}

export function HomeHero() {
  const [email, setEmail] = useState("");

  const navLinks: NavLink[] = [
    { href: '/#collections', label: 'Collections' },
    { href: '/#ai-assistant', label: 'AI Assistant' },
    { href: '/#about', label: 'About Us' },
  ];
  
  const backgroundImage = "https://i.ibb.co/ZzvqN84g/unnamed-2.png";

  const avatarSrcList = [
      "https://picsum.photos/seed/avatar1/32/32",
      "https://picsum.photos/seed/avatar2/32/32",
      "https://picsum.photos/seed/avatar3/32/32",
  ];
  const userCount = 1000;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    console.log("Waitlist submitted:", email);
    alert(`Thank you for joining with ${email}! We'll be in touch.`);
    setEmail("");
  };

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
                 <div className="flex items-center mb-4">
                    <div className="flex -space-x-2 pr-2">
                        {avatarSrcList.map((src, idx) => (
                        <Image
                            key={idx}
                            className="h-8 w-8 rounded-full ring-2 ring-background/50"
                            src={src}
                            alt={`User avatar ${idx + 1}`}
                            width={32}
                            height={32}
                        />
                        ))}
                    </div>
                    <p className="ml-3 text-sm text-gray-300">
                        {userCount.toLocaleString()}+ users have joined
                    </p>
                </div>

                <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                    NS Fashion Wear
                </h1>
                <p className="mt-4 font-body text-lg md:text-xl lg:text-2xl italic text-gray-300">
                    Style for Every Day & Every Occasion
                </p>

                <form
                    className="mt-8 flex w-full max-w-sm"
                    onSubmit={handleSubmit}
                    aria-label="Waitlist signup"
                >
                    <label htmlFor="email" className="sr-only">
                        Email address
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email to join"
                        className="w-full px-4 py-3 rounded-l-md border-0 text-black placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary/80"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-white text-black font-bold px-5 py-3 rounded-r-md hover:bg-gray-200 transition-colors whitespace-nowrap"
                    >
                        Join Waitlist
                    </button>
                </form>

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
