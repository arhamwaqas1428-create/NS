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

const productSizeChart = JSON.stringify(
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
    category: 'daily',
    itemType: 'Casual shirt',
  },
  {
    id: 'dw02',
    name: 'Urban Minimalist Tee',
    price: 'PKR 1,500',
    imageId: 'dw02',
    category: 'daily',
    itemType: 'T-shirt',
  },
  {
    id: 'dw03',
    name: 'Sun-kissed Day Dress',
    price: 'PKR 3,500',
    imageId: 'dw03',
    category: 'daily',
    itemType: 'Everyday dress',
  },
  {
    id: 'dw04',
    name: 'Lahori Charm Kurti',
    price: 'PKR 3,200',
    imageId: 'dw04',
    category: 'daily',
    itemType: 'Kurti',
  },
  {
    id: 'dw06',
    name: 'Boulevard Trousers',
    price: 'PKR 2,900',
    imageId: 'dw06',
    category: 'daily',
    itemType: 'Trousers / jeans',
  },
  {
    id: 'ow01',
    name: 'Midnight Gala Gown',
    price: 'PKR 12,000',
    imageId: 'ow01',
    category: 'occasional',
    itemType: 'Formal dress',
  },
  {
    id: 'ow02',
    name: 'Royal Garden Ensemble',
    price: 'PKR 15,000',
    imageId: 'ow02',
    category: 'occasional',
    itemType: 'Designer outfit',
  },
  {
    id: 'ow03',
    name: 'Golden Hour Pret',
    price: 'PKR 8,500',
    imageId: 'ow03',
    category: 'occasional',
    itemType: 'Luxury pret wear',
  },
  {
    id: 'ow04',
    name: 'Zardozi Embroidered Dream',
    price: 'PKR 14,000',
    imageId: 'ow04',
    category: 'occasional',
    itemType: 'Embroidered dress',
  },
  {
    id: 'ow05',
    name: 'Chand Raat Festive Wear',
    price: 'PKR 9,800',
    imageId: 'ow05',
    category: 'occasional',
    itemType: 'Festive wear',
  },
  {
    id: 'ow06',
    name: 'Opulent Sharara Suit',
    price: 'PKR 13,500',
    imageId: 'ow06',
    category: 'occasional',
    itemType: 'Sharara Suit',
  },
] as const;

export const allProducts: Product[] = allProductsData.map((p) => {
  const image = PlaceHolderImages.find((img) => img.id === p.imageId);
  if (!image) {
    throw new Error(`Image with id ${p.imageId} not found for product ${p.id}`);
  }
  const product: Product = {
    ...p,
    image,
    sizeChart: productSizeChart,
  };
  return product;
});

export const dailyWearProducts: Product[] = allProducts.filter(
  (p) => p.category === 'daily'
);
export const occasionalWearProducts: Product[] = allProducts.filter(
  (p) => p.category === 'occasional'
);
