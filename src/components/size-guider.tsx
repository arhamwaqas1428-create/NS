"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Ruler, Loader2, Sparkles, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { getSizeGuidance } from "@/app/actions";
import { allProducts, type Product } from "@/lib/products";
import type { AiSizeGuiderOutput } from "@/ai/flows/ai-size-guider-flow";

const formSchema = z.object({
  product: z.string().min(1, { message: "Please select a product." }),
  bust: z.coerce.number().positive().optional(),
  waist: z.coerce.number().positive().optional(),
  hips: z.coerce.number().positive().optional(),
  height: z.coerce.number().positive().optional(),
  weight: z.coerce.number().positive().optional(),
  desiredFit: z.enum(['snug', 'regular', 'relaxed', 'oversized']),
});

export function SizeGuider() {
  const [guidance, setGuidance] = useState<AiSizeGuiderOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      desiredFit: "regular",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGuidance(null);

    const selectedProduct = allProducts.find(p => p.id === values.product);
    if (!selectedProduct) {
        toast({ variant: "destructive", title: "Error", description: "Selected product not found." });
        setIsLoading(false);
        return;
    }

    const { data, error } = await getSizeGuidance({
        userMeasurements: {
            bust: values.bust,
            waist: values.waist,
            hips: values.hips,
            height: values.height,
            weight: values.weight
        },
        desiredFit: values.desiredFit,
        productCategory: selectedProduct.itemType,
        productDescription: `A ${selectedProduct.itemType} from the ${selectedProduct.category} collection.`,
        sizeChart: selectedProduct.sizeChart,
        gender: "unisex"
    });

    if (error) {
      toast({ variant: "destructive", title: "Error", description: error, });
    } else {
      setGuidance(data);
    }
    setIsLoading(false);
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <FormField
              control={form.control}
              name="product"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Select a Product</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a product to get sized for" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {allProducts.map((p: Product) => (
                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField control={form.control} name="bust" render={({ field }) => ( <FormItem><FormLabel>Bust (cm)</FormLabel><FormControl><Input type="number" placeholder="e.g., 92" {...field} /></FormControl><FormMessage /></FormItem> )} />
            <FormField control={form.control} name="waist" render={({ field }) => ( <FormItem><FormLabel>Waist (cm)</FormLabel><FormControl><Input type="number" placeholder="e.g., 74" {...field} /></FormControl><FormMessage /></FormItem> )} />
            <FormField control={form.control} name="hips" render={({ field }) => ( <FormItem><FormLabel>Hips (cm)</FormLabel><FormControl><Input type="number" placeholder="e.g., 100" {...field} /></FormControl><FormMessage /></FormItem> )} />
            <FormField control={form.control} name="height" render={({ field }) => ( <FormItem><FormLabel>Height (cm)</FormLabel><FormControl><Input type="number" placeholder="e.g., 168" {...field} /></FormControl><FormMessage /></FormItem> )} />
            <FormField control={form.control} name="weight" render={({ field }) => ( <FormItem><FormLabel>Weight (kg)</FormLabel><FormControl><Input type="number" placeholder="e.g., 65" {...field} /></FormControl><FormMessage /></FormItem> )} />
            <FormField control={form.control} name="desiredFit" render={({ field }) => ( <FormItem><FormLabel>Desired Fit</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select your preferred fit" /></SelectTrigger></FormControl><SelectContent><SelectItem value="snug">Snug</SelectItem><SelectItem value="regular">Regular</SelectItem><SelectItem value="relaxed">Relaxed</SelectItem><SelectItem value="oversized">Oversized</SelectItem></SelectContent></Select><FormMessage /></FormItem> )} />
          </div>
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? ( <Loader2 className="animate-spin" /> ) : ( <Ruler className="mr-2" /> )}
            Find My Perfect Fit
          </Button>
        </form>
      </Form>

      {isLoading && (
        <div className="flex items-center justify-center space-x-2 text-muted-foreground">
          <Loader2 className="animate-spin" />
          <span>Calculating your perfect size...</span>
        </div>
      )}

      {guidance && (
        <Card className="animate-in fade-in-0 duration-500 bg-card/50">
            <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2">
                    <Sparkles className="text-primary"/>
                    Your Size Recommendation
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="text-center bg-primary/10 border border-primary/20 rounded-lg p-6">
                    <p className="text-lg text-muted-foreground">Our AI recommends size:</p>
                    <p className="text-6xl font-extrabold text-primary font-headline">{guidance.recommendedSize}</p>
                </div>
                <div className="space-y-2">
                    <h4 className="font-bold flex items-center gap-2"><CheckCircle className="text-green-500" /> Reasoning</h4>
                    <p className="text-muted-foreground">{guidance.reasoning}</p>
                </div>
                <div className="space-y-2">
                    <h4 className="font-bold">Confidence</h4>
                    <div className="flex items-center gap-4">
                        <Progress value={guidance.confidenceScore} className="w-full h-3" />
                        <span className="font-bold text-primary font-code">{guidance.confidenceScore}%</span>
                    </div>
                </div>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
