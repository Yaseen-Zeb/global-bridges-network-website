"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Typography } from "@/components/common/typography";
import { Button } from "@/components/ui/button";
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
    } catch (err) {
      setSubmitStatus({
        type: "error",
        message: "A network error occurred while sending your message. Please try again later.",
      });
    }
  };

  return (
    <div
      className={cn(
        "rounded-card border border-border bg-background p-lg sm:p-xl shadow-card space-y-md"
      )}
    >
      <div className="space-y-xs border-b border-border pb-md">
        <Typography variant="h3" className="text-xl font-bold text-foreground">
          Send Us a Message
        </Typography>
        <Typography variant="body-sm" className="text-muted-foreground">
          Fill out the inquiry form below. Your message will be forwarded directly to our team inbox.
        </Typography>
      </div>

      {/* Submission State Banners */}
      {submitStatus.type === "success" && (
        <div
          role="status"
          aria-live="polite"
          className="p-md rounded-button text-sm flex items-start gap-sm border bg-success/10 border-success/30 text-success-foreground"
        >
          <CheckCircle2 className="h-5 w-5 shrink-0 text-success mt-0.5" aria-hidden="true" />
          <div className="space-y-xs">
            <span className="font-bold block">Message Sent Successfully!</span>
            <span>{submitStatus.message}</span>
          </div>
        </div>
      )}

      {submitStatus.type === "error" && (
        <div
          role="alert"
          aria-live="assertive"
          className="p-md rounded-button text-sm flex items-start gap-sm border bg-destructive/10 border-destructive/30 text-destructive-foreground"
        >
          <AlertCircle className="h-5 w-5 shrink-0 text-destructive mt-0.5" aria-hidden="true" />
          <div className="space-y-xs">
            <span className="font-bold block">Submission Error</span>
            <span>{submitStatus.message}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-md" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          {/* Name */}
          <div className="space-y-xs">
            <label htmlFor="contact-name" className="block text-xs font-semibold text-foreground">
              Full Name <span className="text-destructive">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              placeholder="e.g. Jane Doe"
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={cn(
                "w-full rounded-input border border-input bg-background px-md py-sm text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors",
                errors.name && "border-destructive focus-visible:ring-destructive"
              )}
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
            <label htmlFor="contact-email" className="block text-xs font-semibold text-foreground">
              Email Address <span className="text-destructive">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              placeholder="jane@example.org"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={cn(
                "w-full rounded-input border border-input bg-background px-md py-sm text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors",
                errors.email && "border-destructive focus-visible:ring-destructive"
              )}
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
          {/* Phone (Optional) */}
          <div className="space-y-xs">
            <label htmlFor="contact-phone" className="block text-xs font-semibold text-foreground">
              Phone Number <span className="text-muted-foreground font-normal">(Optional)</span>
            </label>
            <input
              id="contact-phone"
              type="tel"
              placeholder="(555) 000-0000"
              aria-invalid={errors.phone ? "true" : "false"}
              className="w-full rounded-input border border-input bg-background px-md py-sm text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors"
              {...register("phone")}
            />
          </div>

          {/* Inquiry Category Dropdown */}
          <div className="space-y-xs">
            <label htmlFor="contact-category" className="block text-xs font-semibold text-foreground">
              Inquiry Category <span className="text-destructive">*</span>
            </label>
            <select
              id="contact-category"
              aria-invalid={errors.category ? "true" : "false"}
              aria-describedby={errors.category ? "category-error" : undefined}
              className={cn(
                "w-full rounded-input border border-input bg-background px-md py-sm text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors cursor-pointer",
                errors.category && "border-destructive focus-visible:ring-destructive"
              )}
              {...register("category")}
            >
              {INQUIRY_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            {errors.category && (
              <p id="category-error" className="text-xs font-medium text-destructive">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="space-y-xs">
          <label htmlFor="contact-message" className="block text-xs font-semibold text-foreground">
            Your Message <span className="text-destructive">*</span>
          </label>
          <textarea
            id="contact-message"
            rows={5}
            placeholder="Please write your question or inquiry here..."
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={cn(
              "w-full rounded-input border border-input bg-background px-md py-sm text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors resize-y min-h-[120px]",
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

        {/* Privacy Consent Checkbox */}
        <div className="space-y-xs pt-xs">
          <div className="flex items-start gap-xs">
            <input
              id="contact-consent"
              type="checkbox"
              aria-invalid={errors.consent ? "true" : "false"}
              aria-describedby={errors.consent ? "consent-error" : undefined}
              className="mt-0.5 h-4 w-4 rounded border-input text-primary focus:ring-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
              {...register("consent")}
            />
            <label htmlFor="contact-consent" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
              I consent to having Bridge Global Network process my information to respond to this inquiry. I understand submission data is transmitted statelessly and never stored in a website database. <span className="text-destructive">*</span>
            </label>
          </div>
          {errors.consent && (
            <p id="consent-error" className="text-xs font-medium text-destructive pl-5">
              {errors.consent.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
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
