"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Typography } from "@/components/common/typography";
import { cn } from "@/lib/utils";

const ITEM_CATEGORIES = [
  "Household & Cookware Starter Kits",
  "Winter Outerwear & Warm Blankets",
  "School Backpacks & Academic Supplies",
  "Hygiene & Personal Care Items",
  "Baby & Children Supplies",
  "Other Essential Goods",
];

const CONDITION_OPTIONS = ["New", "Like New", "Gently Used"];
const CONTACT_METHOD_OPTIONS = ["Email", "Phone", "Either (Email or Phone)"];

const goodsFormSchema = z.object({
  name: z.string().trim().min(2, "Full name must be at least 2 characters."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().optional(),
  itemCategory: z.string().min(1, "Please select an item category."),
  description: z
    .string()
    .trim()
    .min(10, "Item description must be at least 10 characters."),
  quantity: z.string().trim().optional(),
  condition: z.string().min(1, "Please select an item condition."),
  preferredContact: z.string().min(1, "Please select a preferred contact method."),
  notes: z.string().trim().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge the consent statement to submit.",
  }),
});

type GoodsFormData = z.infer<typeof goodsFormSchema>;

export function GoodsIntakeForm({ className }: { className?: string }) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<GoodsFormData>({
    resolver: zodResolver(goodsFormSchema),
    reValidateMode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      itemCategory: ITEM_CATEGORIES[0],
      description: "",
      quantity: "",
      condition: CONDITION_OPTIONS[1],
      preferredContact: CONTACT_METHOD_OPTIONS[0],
      notes: "",
      consent: false,
    },
  });

  const onSubmit = async (data: GoodsFormData) => {
    const toastId = toast.loading("Submitting your goods offer...");
    try {
      const res = await fetch("/api/donate-goods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (res.ok && result.success) {
        toast.success("Goods Offer Submitted!", {
          id: toastId,
          description: result.message || "Thank you! Our team will review your offer and reach out shortly.",
        });
        reset();
      } else {
        toast.error("Submission Failed", {
          id: toastId,
          description: result.error || "Failed to submit form. Please check the fields and try again.",
        });
      }
    } catch {
      toast.error("Network Error", {
        id: toastId,
        description: "A network error occurred. Please check your connection and try again.",
      });
    }
  };

  return (
    <div
      className={cn(
        "rounded-card border border-border bg-background p-lg sm:p-xl shadow-card space-y-md",
        className
      )}
    >
      <div className="space-y-xs border-b border-border pb-md">
        <Typography variant="h2" className="text-2xl font-bold">
          Submit Your Goods Offer
        </Typography>
        <Typography variant="body-sm" className="text-muted-foreground">
          Fill out this form to let us know about the items you wish to offer. Our team will review
          your offer and reach out.
        </Typography>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-md" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          {/* Name */}
          <div className="space-y-xs">
            <Label htmlFor="goods-name">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="goods-name"
              type="text"
              placeholder="e.g. Sarah Johnson"
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "goods-name-error" : undefined}
              className={cn(errors.name && "border-destructive focus-visible:ring-destructive")}
              {...register("name")}
            />
            {errors.name && (
              <p id="goods-name-error" className="text-xs font-medium text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-xs">
            <Label htmlFor="goods-email">
              Email Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="goods-email"
              type="email"
              placeholder="e.g. sarah@example.com"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "goods-email-error" : undefined}
              className={cn(errors.email && "border-destructive focus-visible:ring-destructive")}
              {...register("email")}
            />
            {errors.email && (
              <p id="goods-email-error" className="text-xs font-medium text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          {/* Phone */}
          <div className="space-y-xs">
            <Label htmlFor="goods-phone">
              Phone Number{" "}
              <span className="text-muted-foreground font-normal">(Optional)</span>
            </Label>
            <Input
              id="goods-phone"
              type="tel"
              placeholder="e.g. (555) 000-0000"
              {...register("phone")}
            />
          </div>

          {/* Item Category */}
          <div className="space-y-xs">
            <Label htmlFor="goods-itemCategory">
              Item Category <span className="text-destructive">*</span>
            </Label>
            <Controller
              name="itemCategory"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="goods-itemCategory"
                    aria-invalid={errors.itemCategory ? "true" : "false"}
                    aria-describedby={errors.itemCategory ? "goods-itemCategory-error" : undefined}
                    className={cn(
                      errors.itemCategory && "border-destructive focus:ring-destructive"
                    )}
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {ITEM_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.itemCategory && (
              <p id="goods-itemCategory-error" className="text-xs font-medium text-destructive">
                {errors.itemCategory.message}
              </p>
            )}
          </div>
        </div>

        {/* Item Description */}
        <div className="space-y-xs">
          <Label htmlFor="goods-description">
            Item Description &amp; Details <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="goods-description"
            rows={3}
            placeholder="Describe the items (e.g. 1 set of stainless steel pots and pans, 2 winter jackets size M)."
            aria-invalid={errors.description ? "true" : "false"}
            aria-describedby={errors.description ? "goods-description-error" : undefined}
            className={cn(
              "resize-none",
              errors.description && "border-destructive focus-visible:ring-destructive"
            )}
            {...register("description")}
          />
          {errors.description && (
            <p id="goods-description-error" className="text-xs font-medium text-destructive">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
          {/* Quantity */}
          <div className="space-y-xs">
            <Label htmlFor="goods-quantity">
              Estimated Quantity{" "}
              <span className="text-muted-foreground font-normal">(Optional)</span>
            </Label>
            <Input
              id="goods-quantity"
              type="text"
              placeholder="e.g. 3 boxes / 5 items"
              {...register("quantity")}
            />
          </div>

          {/* Condition */}
          <div className="space-y-xs">
            <Label htmlFor="goods-condition">Item Condition</Label>
            <Controller
              name="condition"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="goods-condition">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CONDITION_OPTIONS.map((cond) => (
                      <SelectItem key={cond} value={cond}>
                        {cond}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Preferred Contact Method */}
          <div className="space-y-xs">
            <Label htmlFor="goods-preferredContact">Preferred Contact Method</Label>
            <Controller
              name="preferredContact"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="goods-preferredContact">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CONTACT_METHOD_OPTIONS.map((method) => (
                      <SelectItem key={method} value={method}>
                        {method}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>

        {/* Additional Notes */}
        <div className="space-y-xs">
          <Label htmlFor="goods-notes">Additional Notes (Optional)</Label>
          <Textarea
            id="goods-notes"
            rows={2}
            placeholder="Any drop-off preferences, dimensions, or questions."
            className="resize-none"
            {...register("notes")}
          />
        </div>

        {/* Privacy & Consent */}
        <div className="space-y-xs pt-xs">
          <div className="flex items-start gap-xs">
            <Controller
              name="consent"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="goods-consent"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-invalid={errors.consent ? "true" : "false"}
                  aria-describedby={errors.consent ? "goods-consent-error" : undefined}
                  className="mt-0.5"
                />
              )}
            />
            <Label
              htmlFor="goods-consent"
              className="text-xs text-muted-foreground leading-relaxed cursor-pointer font-normal"
            >
              I acknowledge that my submission will be emailed to Bridge Global Network team to
              coordinate goods inspection and intake.{" "}
              <span className="text-destructive">*</span>
            </Label>
          </div>
          {errors.consent && (
            <p id="goods-consent-error" className="text-xs font-medium text-destructive pl-5">
              {errors.consent.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="pt-sm">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-xs h-4 w-4 animate-spin" aria-hidden="true" />
                Submitting Offer...
              </>
            ) : (
              <>
                <Send className="mr-xs h-4 w-4" aria-hidden="true" />
                Submit Goods Offer
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
