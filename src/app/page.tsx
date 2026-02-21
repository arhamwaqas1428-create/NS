import { HomeHero } from '@/components/page/home-hero';
import { ProductCollections } from '@/components/page/product-collections';
import { AiAssistantSection } from '@/components/page/ai-assistant-section';
import { Footer } from '@/components/page/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <HomeHero />
      <main className="flex-1">
        <ProductCollections />
        <AiAssistantSection />
      </main>
      <Footer />
    </div>
  );
}
