"use server";

import {
  aiProductRecommender,
  type AiProductRecommenderInput,
  type AiProductRecommenderOutput,
} from "@/ai/flows/ai-product-recommender-flow";
import {
  aiSizeGuider,
  type AiSizeGuiderInput,
  type AiSizeGuiderOutput,
} from "@/ai/flows/ai-size-guider-flow";

export async function getProductRecommendations(
  input: AiProductRecommenderInput
): Promise<{ data: AiProductRecommenderOutput | null; error: string | null }> {
  try {
    const recommendations = await aiProductRecommender(input);
    return { data: recommendations, error: null };
  } catch (error) {
    console.error("Error getting product recommendations:", error);
    return {
      data: null,
      error: "Sorry, I couldn't find recommendations at the moment. Please try again later.",
    };
  }
}

export async function getSizeGuidance(
  input: AiSizeGuiderInput
): Promise<{ data: AiSizeGuiderOutput | null; error: string | null }> {
  try {
    const guidance = await aiSizeGuider(input);
    return { data: guidance, error: null };
  } catch (error) {
    console.error("Error getting size guidance:", error);
    return {
      data: null,
      error: "Sorry, I couldn't process the size guidance right now. Please check your inputs and try again.",
    };
  }
}
