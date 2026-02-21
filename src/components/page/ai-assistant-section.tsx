import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductRecommender } from "@/components/product-recommender";
import { SizeGuider } from "@/components/size-guider";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function AiAssistantSection() {
  const bgImage = PlaceHolderImages.find((img) => img.id === "ai-assistant-bg");

  return (
    <section id="ai-assistant" className="relative py-16 sm:py-24">
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt={bgImage.description}
          fill
          className="object-cover object-center opacity-10"
          data-ai-hint={bgImage.imageHint}
        />
      )}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold">
            AI Fashion Assistant
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Let our AI help you find the perfect style and fit, just for you.
          </p>
        </div>

        <Tabs defaultValue="style-advisor" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 h-auto bg-card/50 backdrop-blur-sm">
            <TabsTrigger value="style-advisor" className="py-2.5 text-base">
              AI Style Advisor
            </TabsTrigger>
            <TabsTrigger value="fit-finder" className="py-2.5 text-base">
              AI Fit Finder
            </TabsTrigger>
          </TabsList>
          <TabsContent value="style-advisor" className="mt-8 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 lg:p-8">
            <ProductRecommender />
          </TabsContent>
          <TabsContent value="fit-finder" className="mt-8 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 lg:p-8">
            <SizeGuider />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
