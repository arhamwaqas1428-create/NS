import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dailyWearProducts, occasionalWearProducts } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export function ProductCollections() {
  return (
    <section id="collections" className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-center font-headline text-4xl md:text-5xl font-bold mb-12">
          Our Collections
        </h2>
        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto h-auto">
            <TabsTrigger value="daily" className="py-2.5 text-base">Daily Wear</TabsTrigger>
            <TabsTrigger value="occasional" className="py-2.5 text-base">Occasional Wear</TabsTrigger>
          </TabsList>
          <TabsContent value="daily" className="mt-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {dailyWearProducts.map((product) => (
                <div key={product.id} className="group animate-in fade-in-0 duration-500">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="occasional" className="mt-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {occasionalWearProducts.map((product) => (
                <div key={product.id} className="group animate-in fade-in-0 duration-500">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
