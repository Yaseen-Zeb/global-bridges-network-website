"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Typography } from "@/components/common/typography";
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
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { INQUIRY_CATEGORIES } from "@/data/contact-info";
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

export function ContactForm() {
  const [submitStatus, setSubmitStatus] = React.useState<{
    type: "idle" | "loading" | "success" | "error";
    message?: string;
  }>({ type: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      category: "general",
      message: "",
      consent: false,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus({ type: "loading" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setSubmitStatus({
          type: "success",
          message: result.message || "Thank you! Your message has been sent to our team.",
        });
        reset();
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Failed to send message. Please check fields and try again.",
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "A network error occurred while sending your message. Please try again later.",
      });
    }
  };

  return (
    <div className="rounded-card border border-border bg-background p-lg sm:p-xl shadow-card space-y-md">
      <div className="space-y-xs border-b border-border pb-md">
        <Typography variant="h3" className="text-xl font-bold text-foreground">
          Send Us a Message
        </Typography>
        <Typography variant="body-sm" className="text-muted-foreground">
          Fill out the inquiry form below. Your message will be forwarded directly to our team
          inbox.
        </Typography>
      </div>

      {/* Status banners */}
      {submitStatus.type === "success" && (
        <Alert role="status" aria-live="polite" variant="success">
          <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-xs">
            <AlertTitle>Message Sent Successfully!</AlertTitle>
            <AlertDescription>{submitStatus.message}</AlertDescription>
          </div>
        </Alert>
      )}
      {submitStatus.type === "error" && (
        <Alert role="alert" aria-live="assertive" variant="destructive">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-xs">
            <AlertTitle>Submission Error</AlertTitle>
            <AlertDescription>{submitStatus.message}</AlertDescription>
          </div>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-md" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          {/* Name */}
          <div className="space-y-xs">
            <Label htmlFor="contact-name">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contact-name"
              type="text"
              placeholder="e.g. Jane Doe"
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={cn(errors.name && "border-destructive focus-visible:ring-destructive")}
              {...register("name")}
            />
            {errors.name && (
              <p id="name-error" className="text-xs font-medium text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-xs">
            <Label htmlFor="contact-email">
              Email Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contact-email"
              type="email"
              placeholder="jane@example.org"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={cn(errors.email && "border-destructive focus-visible:ring-destructive")}
              {...register("email")}
            />
            {errors.email && (
              <p id="email-error" className="text-xs font-medium text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          {/* Phone */}
          <div className="space-y-xs">
            <Label htmlFor="contact-phone">
              Phone Number{" "}
              <span className="text-muted-foreground font-normal">(Optional)</span>
            </Label>
            <Input
              id="contact-phone"
              type="tel"
              placeholder="(555) 000-0000"
              {...register("phone")}
            />
          </div>

          {/* Inquiry Category — Radix Select via Controller */}
          <div className="space-y-xs">
            <Label htmlFor="contact-category">
              Inquiry Category <span className="text-destructive">*</span>
            </Label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="contact-category"
                    aria-invalid={errors.category ? "true" : "false"}
                    aria-describedby={errors.category ? "category-error" : undefined}
                    className={cn(
                      errors.category && "border-destructive focus:ring-destructive"
                    )}
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {INQUIRY_CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <p id="category-error" className="text-xs font-medium text-destructive">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="space-y-xs">
          <Label htmlFor="contact-message">
            Your Message <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="contact-message"
            rows={5}
            placeholder="Please write your question or inquiry here..."
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={cn(
              "min-h-[120px]",
              errors.message && "border-destructive focus-visible:ring-destructive"
            )}
            {...register("message")}
          />
          {errors.message && (
            <p id="message-error" className="text-xs font-medium text-destructive">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Privacy Consent */}
        <div className="space-y-xs pt-xs">
          <div className="flex items-start gap-xs">
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
            <Label
              htmlFor="contact-consent"
              className="text-xs text-muted-foreground leading-relaxed cursor-pointer font-normal"
            >
              I consent to having Bridge Global Network process my information to respond to this
              inquiry. I understand submission data is transmitted statelessly and never stored in a
              website database. <span className="text-destructive">*</span>
            </Label>
          </div>
          {errors.consent && (
            <p id="consent-error" className="text-xs font-medium text-destructive pl-5">
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
                Sending Message...
              </>
            ) : (
              <>
                <Send className="mr-xs h-4 w-4" aria-hidden="true" />
                Send Message
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
