"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/common/typography";
import { CheckCircle2, AlertCircle, Send, Package } from "lucide-react";
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

export function GoodsIntakeForm({ className }: { className?: string }) {
  const [formData, setFormData] = React.useState({
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
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const res = await fetch("/api/donate-goods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitStatus({
          type: "success",
          message: data.message || "Your goods offer has been submitted successfully!",
        });
        // Reset form
        setFormData({
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
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Failed to submit form. Please try again.",
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Network error occurred. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={cn(
        "rounded-card border border-border bg-background p-lg sm:p-xl shadow-card space-y-md",
        className
      )}
    >
      <div className="space-y-xs">
        <Typography variant="h2" className="text-2xl font-bold">
          Submit Your Goods Offer
        </Typography>
        <Typography variant="body-sm" className="text-muted-foreground">
          Fill out this form to let us know about the items you wish to offer. Our team will review your offer and reach out.
        </Typography>
      </div>

      {submitStatus && (
        <div
          role="alert"
          className={cn(
            "p-md rounded-button text-sm flex items-start gap-sm border",
            submitStatus.type === "success"
              ? "bg-success/10 border-success/30 text-success-foreground"
              : "bg-destructive/10 border-destructive/30 text-destructive-foreground"
          )}
        >
          {submitStatus.type === "success" ? (
            <CheckCircle2 className="h-5 w-5 shrink-0 text-success mt-0.5" aria-hidden="true" />
          ) : (
            <AlertCircle className="h-5 w-5 shrink-0 text-destructive mt-0.5" aria-hidden="true" />
          )}
          <span>{submitStatus.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-md" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          {/* Name */}
          <div className="space-y-xs">
            <label htmlFor="name" className="block text-xs font-semibold text-foreground">
              Full Name <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Sarah Johnson"
              className="w-full h-10 px-md rounded-input border border-input bg-background text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          {/* Email */}
          <div className="space-y-xs">
            <label htmlFor="email" className="block text-xs font-semibold text-foreground">
              Email Address <span className="text-destructive">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. sarah@example.com"
              className="w-full h-10 px-md rounded-input border border-input bg-background text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          {/* Phone */}
          <div className="space-y-xs">
            <label htmlFor="phone" className="block text-xs font-semibold text-foreground">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. (555) 000-0000"
              className="w-full h-10 px-md rounded-input border border-input bg-background text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          {/* Item Category */}
          <div className="space-y-xs">
            <label htmlFor="itemCategory" className="block text-xs font-semibold text-foreground">
              Item Category <span className="text-destructive">*</span>
            </label>
            <select
              id="itemCategory"
              name="itemCategory"
              required
              value={formData.itemCategory}
              onChange={handleChange}
              className="w-full h-10 px-md rounded-input border border-input bg-background text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {ITEM_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Item Description */}
        <div className="space-y-xs">
          <label htmlFor="description" className="block text-xs font-semibold text-foreground">
            Item Description & Details <span className="text-destructive">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={3}
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the items (e.g. 1 set of stainless steel pots and pans, 2 winter jackets size M)."
            className="w-full p-md rounded-input border border-input bg-background text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
          {/* Quantity */}
          <div className="space-y-xs">
            <label htmlFor="quantity" className="block text-xs font-semibold text-foreground">
              Estimated Quantity
            </label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="e.g. 3 boxes / 5 items"
              className="w-full h-10 px-md rounded-input border border-input bg-background text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          {/* Condition */}
          <div className="space-y-xs">
            <label htmlFor="condition" className="block text-xs font-semibold text-foreground">
              Item Condition
            </label>
            <select
              id="condition"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full h-10 px-md rounded-input border border-input bg-background text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {CONDITION_OPTIONS.map((cond) => (
                <option key={cond} value={cond}>
                  {cond}
                </option>
              ))}
            </select>
          </div>

          {/* Preferred Contact Method */}
          <div className="space-y-xs">
            <label htmlFor="preferredContact" className="block text-xs font-semibold text-foreground">
              Preferred Contact Method
            </label>
            <select
              id="preferredContact"
              name="preferredContact"
              value={formData.preferredContact}
              onChange={handleChange}
              className="w-full h-10 px-md rounded-input border border-input bg-background text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {CONTACT_METHOD_OPTIONS.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="space-y-xs">
          <label htmlFor="notes" className="block text-xs font-semibold text-foreground">
            Additional Notes (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={2}
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any drop-off preferences, dimensions, or questions."
            className="w-full p-md rounded-input border border-input bg-background text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
          />
        </div>

        {/* Privacy & Consent Acknowledgement */}
        <div className="flex items-start gap-xs pt-xs">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            required
            checked={formData.consent}
            onChange={handleChange}
            className="mt-1 h-4 w-4 rounded border-input text-primary focus-visible:ring-2 focus-visible:ring-ring"
          />
          <label htmlFor="consent" className="text-xs text-muted-foreground leading-snug">
            I acknowledge that my submission will be emailed to Bridge Global Network team to coordinate goods inspection and intake. <span className="text-destructive">*</span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-sm">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting || !formData.consent}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? (
              "Submitting Offer..."
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
