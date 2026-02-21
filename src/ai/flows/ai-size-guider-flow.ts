'use server';
/**
 * @fileOverview An AI assistant flow that provides personalized clothing size recommendations.
 *
 * - aiSizeGuider - A function that handles the clothing size recommendation process.
 * - AiSizeGuiderInput - The input type for the aiSizeGuider function.
 * - AiSizeGuiderOutput - The return type for the aiSizeGuider function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiSizeGuiderInputSchema = z.object({
  userMeasurements: z
    .object({
      bust: z.number().optional().describe('User bust measurement in centimeters.'),
      waist: z.number().optional().describe('User waist measurement in centimeters.'),
      hips: z.number().optional().describe('User hips measurement in centimeters.'),
      height: z.number().optional().describe('User height in centimeters.'),
      weight: z.number().optional().describe('User weight in kilograms.'),
      shoulder: z.number().optional().describe('User shoulder measurement in centimeters.'),
      sleeveLength: z.number().optional().describe('User sleeve length measurement in centimeters.'),
      inseam: z.number().optional().describe('User inseam measurement in centimeters.'),
    })
    .describe('User body measurements. Provide as many as possible for accuracy.'),
  desiredFit: z
    .enum(['snug', 'regular', 'relaxed', 'oversized'])
    .describe('The user\u0027s preferred fit for the garment.'),
  productCategory: z
    .string()
    .describe('The category of the clothing item (e.g., casual shirt, formal dress).'),
  productDescription: z
    .string()
    .describe(
      'A detailed description of the product, including material, cut, style, and any specific design features.'
    ),
  sizeChart: z
    .string()
    .describe(
      'The brand\u0027s size chart as a JSON string or plain text. It should include measurements (e.g., bust, waist, hips, length) for each available size (e.g., S, M, L, XL).' + 
      'Example format: { "S": {"bust": 80-84, "waist": 60-64, ...}, "M": {...} }'
    ),
  gender: z
    .enum(['male', 'female', 'unisex'])
    .optional()
    .describe('The gender the clothing item is designed for.'),
});
export type AiSizeGuiderInput = z.infer<typeof AiSizeGuiderInputSchema>;

const AiSizeGuiderOutputSchema = z.object({
  recommendedSize: z.string().describe('The recommended size for the user (e.g., S, M, L, XL).'),
  reasoning: z
    .string()
    .describe('A brief explanation of why this size was recommended, referencing user measurements, desired fit, and the size chart.'),
  confidenceScore: z
    .number()
    .min(0)
    .max(100)
    .describe('A numerical score from 0 to 100 indicating the AI\u0027s confidence in the recommendation.'),
});
export type AiSizeGuiderOutput = z.infer<typeof AiSizeGuiderOutputSchema>;

export async function aiSizeGuider(input: AiSizeGuiderInput): Promise<AiSizeGuiderOutput> {
  return aiSizeGuiderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSizeGuiderPrompt',
  input: { schema: AiSizeGuiderInputSchema },
  output: { schema: AiSizeGuiderOutputSchema },
  prompt: `You are an expert fashion stylist and size recommendation assistant for an apparel brand.
Your goal is to provide a personalized size recommendation to a user based on their measurements, desired fit, and the provided product and size chart information.

Carefully analyze the user's measurements and compare them against the provided size chart for the specific product.
Consider the 'desiredFit' to adjust the recommendation (e.g., for an 'oversized' fit, you might suggest a slightly larger size if measurements are borderline).
Provide a 'recommendedSize' (e.g., S, M, L) and a clear 'reasoning' for your choice.
Also, provide a 'confidenceScore' from 0 (very low confidence) to 100 (very high confidence) for your recommendation.

User Measurements (in centimeters/kilograms, if available):
Bust: {{{userMeasurements.bust}}} cm
Waist: {{{userMeasurements.waist}}} cm
Hips: {{{userMeasurements.hips}}} cm
Height: {{{userMeasurements.height}}} cm
Weight: {{{userMeasurements.weight}}} kg
Shoulder: {{{userMeasurements.shoulder}}} cm
Sleeve Length: {{{userMeasurements.sleeveLength}}} cm
Inseam: {{{userMeasurements.inseam}}} cm

Desired Fit: {{{desiredFit}}}
Product Category: {{{productCategory}}}
Product Description: {{{productDescription}}}
Gender: {{{gender}}}

Brand Size Chart:
{{{sizeChart}}}

Based on this information, what is the best size recommendation?`,
});

const aiSizeGuiderFlow = ai.defineFlow(
  {
    name: 'aiSizeGuiderFlow',
    inputSchema: AiSizeGuiderInputSchema,
    outputSchema: AiSizeGuiderOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to get a size recommendation from the AI.');
    }
    return output;
  }
);
