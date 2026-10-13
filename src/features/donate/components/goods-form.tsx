"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Typography } from "@/components/common/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

/** Always offered after the accepted goods coming from Sanity. */
const OTHER_CATEGORY = "Other Essential Goods";

const CONDITION_OPTIONS = ["New", "Used"] as const;
const CONTACT_METHOD_OPTIONS = ["Email", "Phone", "Either (Email or Phone)"];

const goodsFormSchema = z.object({
  name: z.string().trim().min(2, "Full name must be at least 2 characters."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().optional(),
  itemCategory: z.string().min(1, "Please select an item category."),
  description: z.string().trim().min(10, "Item description must be at least 10 characters."),
  quantity: z.string().trim().optional(),
  condition: z.enum(CONDITION_OPTIONS),
  preferredContact: z.string().min(1, "Please select a preferred contact method."),
  notes: z.string().trim().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge the consent statement to submit.",
  }),
});

type GoodsFormData = z.infer<typeof goodsFormSchema>;

const labelClass = "text-xs font-normal text-muted-foreground";
const fieldClass = "h-10 rounded-input border-border text-sm placeholder:text-muted-foreground/70";
const errorClass = "text-xs font-medium text-destructive";

interface GoodsFormProps {
  /** Titles of accepted goods from Sanity → Goods We Accept / Decline. */
  categories: string[];
}

export function GoodsForm({ categories }: GoodsFormProps) {
  const itemCategories = [...categories, OTHER_CATEGORY];

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
      itemCategory: itemCategories[0],
      description: "",
      quantity: "",
      condition: "New",
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-md" noValidate>
      <Typography variant="body-sm" className="text-muted-foreground">
        Fill out this form to let us know about the items you wish to offer. Our team will review your offer and reach out.
      </Typography>

      <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
        <div className="space-y-xs">
          <Label htmlFor="goods-name" className={labelClass}>
            Full name
          </Label>
          <Input
            id="goods-name"
            autoComplete="name"
            placeholder="eg. Sarah"
            aria-invalid={errors.name ? "true" : "false"}
            className={cn(fieldClass, errors.name && "border-destructive")}
            {...register("name")}
          />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>

        <div className="space-y-xs">
          <Label htmlFor="goods-email" className={labelClass}>
            Email Address
          </Label>
          <Input
            id="goods-email"
            type="email"
            autoComplete="email"
            placeholder="eg. sarah@gmail.com"
            aria-invalid={errors.email ? "true" : "false"}
            className={cn(fieldClass, errors.email && "border-destructive")}
            {...register("email")}
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>

        <div className="space-y-xs">
          <Label htmlFor="goods-phone" className={labelClass}>
            Phone Number
          </Label>
          <Input id="goods-phone" type="tel" autoComplete="tel" placeholder="eg. (+1) 234 1243 567" className={fieldClass} {...register("phone")} />
        </div>

        <div className="space-y-xs">
          <Label htmlFor="goods-contact-method" className={labelClass}>
            Contact Method
          </Label>
          <Controller
            name="preferredContact"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="goods-contact-method" className={fieldClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CONTACT_METHOD_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="space-y-xs">
        <Label htmlFor="goods-category" className={labelClass}>
          Item Category
        </Label>
        <Controller
          name="itemCategory"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="goods-category" className={fieldClass}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {itemCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="space-y-xs">
        <Label htmlFor="goods-description" className={labelClass}>
          Item Details
        </Label>
        <Textarea
          id="goods-description"
          rows={3}
          placeholder="Item Description & Details"
          aria-invalid={errors.description ? "true" : "false"}
          className={cn("rounded-input border-border text-sm placeholder:text-muted-foreground/70", errors.description && "border-destructive")}
          {...register("description")}
        />
        {errors.description && <p className={errorClass}>{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
        <div className="space-y-xs">
          <Label htmlFor="goods-quantity" className={labelClass}>
            Quantity
          </Label>
          <Input id="goods-quantity" placeholder="eg. 2 boxes" className={fieldClass} {...register("quantity")} />
        </div>

        <fieldset className="space-y-xs">
          <legend className={cn(labelClass, "mb-xs")}>Condition:</legend>
          <Controller
            name="condition"
            control={control}
            render={({ field }) => (
              <div className="flex gap-sm" role="radiogroup">
                {CONDITION_OPTIONS.map((option) => {
                  const selected = field.value === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => field.onChange(option)}
                      className={cn(
                        "h-10 min-w-[4.5rem] rounded-button px-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        selected ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-border"
                      )}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            )}
          />
        </fieldset>
      </div>

      <div className="space-y-xs">
        <Label htmlFor="goods-notes" className={labelClass}>
          Additional Notes (Optional)
        </Label>
        <Textarea
          id="goods-notes"
          rows={2}
          placeholder="Additional thoughts from your side to us."
          className="rounded-input border-border text-sm placeholder:text-muted-foreground/70"
          {...register("notes")}
        />
      </div>

      <div className="space-y-xs pt-xs">
        <div className="flex items-start gap-sm">
          <Controller
            name="consent"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="goods-consent"
                checked={field.value}
                onCheckedChange={field.onChange}
                aria-invalid={errors.consent ? "true" : "false"}
                className="mt-0.5"
              />
            )}
          />
          <Label htmlFor="goods-consent" className="cursor-pointer text-xs font-normal leading-5 text-muted-foreground">
            I acknowledge that my submission will be emailed to the Global Bridges Network team to coordinate goods inspection and intake.
          </Label>
        </div>
        {errors.consent && <p className={cn(errorClass, "pl-lg")}>{errors.consent.message}</p>}
      </div>

      <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} className="w-full sm:w-auto sm:min-w-[12rem]">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-xs h-4 w-4 animate-spin" aria-hidden="true" />
            Submitting...
          </>
        ) : (
          "Submit"
        )}
      </Button>
    </form>
  );
}
