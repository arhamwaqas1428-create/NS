import { dailyWearProducts } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export function ProductCollections() {
  return (
    <section id="collections" className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-center font-headline text-4xl md:text-5xl font-bold mb-12">
          Our Collection
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dailyWearProducts.map((product) => (
            <div key={product.id} className="group animate-in fade-in-0 duration-500">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
