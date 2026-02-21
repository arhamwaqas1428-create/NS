import { Header } from '@/components/page/header';
import { HeroSection } from '@/components/page/hero-section';
import { ProductCollections } from '@/components/page/product-collections';
import { AiAssistantSection } from '@/components/page/ai-assistant-section';
import { Footer } from '@/components/page/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ProductCollections />
        <AiAssistantSection />
      </main>
      <Footer />
    </div>
  );
}
