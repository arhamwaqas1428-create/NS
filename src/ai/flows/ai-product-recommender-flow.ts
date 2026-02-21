'use server';
/**
 * @fileOverview An AI assistant that recommends fashion products from the NS Fashion Wear catalog.
 *
 * - aiProductRecommender - A function that handles product recommendations.
 * - AiProductRecommenderInput - The input type for the aiProductRecommender function.
 * - AiProductRecommenderOutput - The return type for the aiProductRecommender function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiProductRecommenderInputSchema = z.object({
  query: z.string().describe('A description of the user\'s fashion needs (e.g., "I need an outfit for a wedding" or "Show me casual wear that\'s loose-fitting").'),
});
export type AiProductRecommenderInput = z.infer<typeof AiProductRecommenderInputSchema>;

const AiProductRecommenderOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      category: z.enum(['Daily Wear Collection', 'Occasional / Party Wear Collection']).describe('The main product category.'),
      itemType: z.string().describe('The specific type of clothing item from the catalog.'),
      description: z.string().describe('A brief explanation of why this item is recommended for the user\'s needs.'),
      priceRange: z.string().describe('The estimated Pakistani Rupee (PKR) price range for this item, e.g., "PKR 1,500 – PKR 4,500".'),
    })
  ).describe('A list of recommended fashion items based on the user\'s query. Can be empty if no suitable items are found.'),
});
export type AiProductRecommenderOutput = z.infer<typeof AiProductRecommenderOutputSchema>;

const aiProductRecommenderPrompt = ai.definePrompt({
  name: 'aiProductRecommenderPrompt',
  input: { schema: AiProductRecommenderInputSchema },
  output: { schema: AiProductRecommenderOutputSchema },
  prompt: `You are an AI Fashion Assistant for "NS Fashion Wear", a premium Pakistani fashion brand.
Our tagline is: "Style for Every Day & Every Occasion".
Your goal is to help users find suitable clothing items from our catalog based on their specific fashion needs.
Provide recommendations that are stylish, elegant, and professional, reflecting the brand's aesthetic.

Here is the "NS Fashion Wear" product catalog:

**Daily Wear Collection:**
  - Casual shirts
  - T-shirts
  - Everyday dresses
  - Kurtis
  - Hoodies / light outerwear
  - Trousers / jeans
  Price Range: PKR 1,500 – PKR 4,500

**Occasional / Party Wear Collection:**
  - Formal dresses
  - Designer outfits
  - Luxury pret wear
  - Embroidered dresses
  - Festive wear
  Price Range: PKR 4,000 – PKR 15,000

The user has described their fashion needs as follows: "{{{query}}}"

Please analyze the user's request and recommend relevant items from the catalog. For each recommendation, specify the category, item type, a brief description of why it's suitable, and its realistic Pakistani Rupee (PKR) price range.
If no suitable items are found, return an empty list of recommendations.
`,
});

const aiProductRecommenderFlow = ai.defineFlow(
  {
    name: 'aiProductRecommenderFlow',
    inputSchema: AiProductRecommenderInputSchema,
    outputSchema: AiProductRecommenderOutputSchema,
  },
  async (input) => {
    const { output } = await aiProductRecommenderPrompt(input);
    return output!;
  }
);

export async function aiProductRecommender(
  input: AiProductRecommenderInput
): Promise<AiProductRecommenderOutput> {
  return aiProductRecommenderFlow(input);
}
