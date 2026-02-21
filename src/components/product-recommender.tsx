"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Wand2, Loader2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { getProductRecommendations } from "@/app/actions";
import type { AiProductRecommenderOutput } from "@/ai/flows/ai-product-recommender-flow";

const formSchema = z.object({
  query: z
    .string()
    .min(10, {
      message: "Please describe your needs in a bit more detail.",
    })
    .max(200),
});

export function ProductRecommender() {
  const [recommendations, setRecommendations] = useState<AiProductRecommenderOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRecommendations(null);

    const { data, error } = await getProductRecommendations(values);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error,
      });
    } else {
      setRecommendations(data);
    }
    setIsLoading(false);
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">What are you looking for?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='e.g., "I need a stylish but comfortable outfit for a friend\'s daytime wedding."'
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Wand2 className="mr-2" />
            )}
            Find My Style
          </Button>
        </form>
      </Form>

      {isLoading && (
        <div className="flex items-center justify-center space-x-2 text-muted-foreground">
          <Loader2 className="animate-spin" />
          <span>Our AI stylist is thinking...</span>
        </div>
      )}

      {recommendations && (
        <div className="space-y-6 animate-in fade-in-0 duration-500">
           <h3 className="text-2xl font-bold font-headline flex items-center gap-2">
            <Sparkles className="text-primary" />
            Here are your recommendations:
          </h3>
          {recommendations.recommendations.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {recommendations.recommendations.map((rec, index) => (
                <Card key={index} className="bg-card/50">
                  <CardHeader>
                    <CardTitle className="font-body">{rec.itemType}</CardTitle>
                    <CardDescription>{rec.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-2">{rec.description}</p>
                    <p className="font-code text-sm text-primary">{rec.priceRange}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p>Our AI stylist couldn&apos;t find a perfect match. Try describing your needs differently.</p>
          )}
        </div>
      )}
    </div>
  );
}
