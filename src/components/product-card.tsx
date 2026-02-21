import Image from "next/image";
import type { Product } from "@/lib/products";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="overflow-hidden border-0 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:bg-card/75 hover:shadow-lg hover:shadow-primary/10">
      <CardHeader className="p-0">
        <div className="aspect-[3/4] overflow-hidden">
          <Image
            src={product.image.imageUrl}
            alt={product.name}
            width={600}
            height={800}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={product.image.imageHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="font-body text-lg font-bold tracking-tight">
          {product.name}
        </CardTitle>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <p className="font-code text-base text-primary">{product.price}</p>
      </CardFooter>
    </Card>
  );
}
