import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function HeroSection() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero");

  return (
    <section className="relative h-[60vh] md:h-[75vh] w-full flex items-center justify-center text-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          priority
          className="object-cover object-center"
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex flex-col items-center space-y-4 px-4">
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold">
          NS Fashion Wear
        </h1>
        <p className="font-body text-lg md:text-xl lg:text-2xl italic">
          Style for Every Day & Every Occasion
        </p>
      </div>
    </section>
  );
}
