import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

export type Product = {
  id: string;
  name: string;
  price: string;
  imageId: string;
  category: 'daily' | 'occasional';
  itemType: string;
  image: ImagePlaceholder;
  sizeChart: string;
};

const womenProductSizeChart = JSON.stringify(
  {
    S: { bust: '86-89cm', waist: '69-71cm', hips: '94-97cm' },
    M: { bust: '91-94cm', waist: '74-76cm', hips: '99-102cm' },
    L: { bust: '97-102cm', waist: '79-84cm', hips: '104-109cm' },
    XL: { bust: '104-109cm', waist: '86-91cm', hips: '112-117cm' },
  },
  null,
  2
);

const allProductsData = [
  {
    id: 'dw01',
    name: 'Ethereal Casual Shirt',
    price: 'PKR 2,800',
    imageId: 'dw01',
    category: 'daily' as 'daily' | 'occasional',
    itemType: 'Casual shirt',
  },
  {
    id: 'dw02',
    name: 'Urban Minimalist Tee',
    price: 'PKR 1,500',
    imageId: 'dw02',
    category: 'daily' as 'daily' | 'occasional',
    itemType: 'T-shirt',
  },
  {
    id: 'dw03',
    name: 'Sun-kissed Day Dress',
    price: 'PKR 3,500',
    imageId: 'dw03',
    category: 'daily' as 'daily' | 'occasional',
    itemType: 'Everyday dress',
  },
  {
    id: 'dw06',
    name: 'Boulevard Trousers',
    price: 'PKR 2,900',
    imageId: 'dw06',
    category: 'daily' as 'daily' | 'occasional',
    itemType: 'Trousers / jeans',
  },
];

export const allProducts: Product[] = allProductsData.map((p) => {
  const image = PlaceHolderImages.find((img) => img.id === p.imageId);
  if (!image) {
    throw new Error(`Image with id ${p.imageId} not found for product ${p.id}`);
  }
  const product: Product = {
    ...p,
    image,
    sizeChart: womenProductSizeChart,
    category: p.category,
  };
  return product;
});

export const dailyWearProducts: Product[] = allProducts.filter(
  (p) => p.category === 'daily'
);
export const occasionalWearProducts: Product[] = [];
