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
import type { InquiryCategory } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Full name must be at least 2 characters."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().optional(),
  category: z.string().min(1, "Please select an inquiry category."),
  message: z.string().trim().min(10, "Message must be at least 10 characters long."),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge the privacy consent to submit.",
  }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const labelClass = "text-xs font-normal text-muted-foreground";
const fieldClass = "h-10 rounded-input border-border text-sm placeholder:text-muted-foreground/70";
const errorClass = "text-xs font-medium text-destructive";

interface ContactFormProps {
  /** From Sanity → Contact & Site Settings; the first one is preselected. */
  categories: InquiryCategory[];
  className?: string;
}

const FALLBACK_CATEGORIES: InquiryCategory[] = [{ label: "General Inquiry", value: "general" }];

export function ContactForm({ categories, className }: ContactFormProps) {
  const options = categories.length > 0 ? categories : FALLBACK_CATEGORIES;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    reValidateMode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      category: options[0].value,
      message: "",
      consent: false,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    const toastId = toast.loading("Sending your message...");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        toast.success("Message Sent!", {
          id: toastId,
          description: result.message || "Thank you! Your message has been sent to our team.",
        });
        reset();
      } else {
        toast.error("Submission Failed", {
          id: toastId,
          description: result.error || "Failed to send message. Please check fields and try again.",
        });
      }
    } catch {
      toast.error("Network Error", {
        id: toastId,
        description: "A network error occurred while sending your message. Please try again later.",
      });
    }
  };

  return (
    <div className={cn("bg-background p-lg shadow-modal sm:p-xl", className)}>
      <Typography variant="body-sm" className="mb-lg text-muted-foreground">
        Fill out the inquiry form below. Your message will be forwarded directly to our team inbox.
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-md" noValidate>
        <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
          <div className="space-y-xs">
            <Label htmlFor="contact-name" className={labelClass}>
              Full name
            </Label>
            <Input
              id="contact-name"
              type="text"
              autoComplete="name"
              placeholder="eg. Sarah"
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={cn(fieldClass, errors.name && "border-destructive focus-visible:ring-destructive")}
              {...register("name")}
            />
            {errors.name && (
              <p id="name-error" className={errorClass}>
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-xs">
            <Label htmlFor="contact-email" className={labelClass}>
              Email Address
            </Label>
            <Input
              id="contact-email"
              type="email"
              autoComplete="email"
              placeholder="eg. sarah@gmail.com"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={cn(fieldClass, errors.email && "border-destructive focus-visible:ring-destructive")}
              {...register("email")}
            />
            {errors.email && (
              <p id="email-error" className={errorClass}>
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-xs">
            <Label htmlFor="contact-phone" className={labelClass}>
              Phone Number
            </Label>
            <Input
              id="contact-phone"
              type="tel"
              autoComplete="tel"
              placeholder="eg. (+1) 234 1243 567"
              className={fieldClass}
              {...register("phone")}
            />
          </div>

          <div className="space-y-xs">
            <Label htmlFor="contact-category" className={labelClass}>
              Inquiry Category
            </Label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="contact-category"
                    aria-invalid={errors.category ? "true" : "false"}
                    aria-describedby={errors.category ? "category-error" : undefined}
                    className={cn(fieldClass, errors.category && "border-destructive focus:ring-destructive")}
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <p id="category-error" className={errorClass}>
                {errors.category.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-xs">
          <Label htmlFor="contact-message" className={labelClass}>
            Item Details
          </Label>
          <Textarea
            id="contact-message"
            rows={4}
            placeholder="Your Message"
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={cn(
              "min-h-[7rem] rounded-input border-border text-sm placeholder:text-muted-foreground/70",
              errors.message && "border-destructive focus-visible:ring-destructive"
            )}
            {...register("message")}
          />
          {errors.message && (
            <p id="message-error" className={errorClass}>
              {errors.message.message}
            </p>
          )}
        </div>

        <div className="space-y-xs pt-xs">
          <div className="flex items-start gap-sm">
            <Controller
              name="consent"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="contact-consent"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-invalid={errors.consent ? "true" : "false"}
                  aria-describedby={errors.consent ? "consent-error" : undefined}
                  className="mt-0.5"
                />
              )}
            />
            <Label htmlFor="contact-consent" className="cursor-pointer text-xs font-normal leading-5 text-muted-foreground">
              I consent to having Global Bridges Network process my information to respond to this inquiry. I
              understand submission data is transmitted statelessly and never stored in a website database.
            </Label>
          </div>
          {errors.consent && (
            <p id="consent-error" className={cn(errorClass, "pl-lg")}>
              {errors.consent.message}
            </p>
          )}
        </div>

        <div className="pt-sm">
          <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} className="w-full sm:w-auto sm:min-w-[12rem]">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-xs h-4 w-4 animate-spin" aria-hidden="true" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
