"use client";

import * as React from "react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Typography } from "@/components/common/typography";
import { CheckCircle2, AlertCircle, Send } from "lucide-react";
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Radix Select uses onValueChange instead of native onChange
  const handleSelectChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
          Fill out this form to let us know about the items you wish to offer. Our team will review
          your offer and reach out.
        </Typography>
      </div>

      {submitStatus && (
        <Alert
          role="alert"
          variant={submitStatus.type === "success" ? "success" : "destructive"}
        >
          {submitStatus.type === "success" ? (
            <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
          ) : (
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
          )}
          <AlertDescription>{submitStatus.message}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-md" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          {/* Name */}
          <div className="space-y-xs">
            <Label htmlFor="goods-name">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              type="text"
              id="goods-name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Sarah Johnson"
            />
          </div>

          {/* Email */}
          <div className="space-y-xs">
            <Label htmlFor="goods-email">
              Email Address <span className="text-destructive">*</span>
            </Label>
            <Input
              type="email"
              id="goods-email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. sarah@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          {/* Phone */}
          <div className="space-y-xs">
            <Label htmlFor="goods-phone">Phone Number</Label>
            <Input
              type="tel"
              id="goods-phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. (555) 000-0000"
            />
          </div>

          {/* Item Category */}
          <div className="space-y-xs">
            <Label htmlFor="goods-itemCategory">
              Item Category <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.itemCategory}
              onValueChange={handleSelectChange("itemCategory")}
            >
              <SelectTrigger id="goods-itemCategory">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ITEM_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Item Description */}
        <div className="space-y-xs">
          <Label htmlFor="goods-description">
            Item Description &amp; Details <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="goods-description"
            name="description"
            required
            rows={3}
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the items (e.g. 1 set of stainless steel pots and pans, 2 winter jackets size M)."
            className="resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
          {/* Quantity */}
          <div className="space-y-xs">
            <Label htmlFor="goods-quantity">Estimated Quantity</Label>
            <Input
              type="text"
              id="goods-quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="e.g. 3 boxes / 5 items"
            />
          </div>

          {/* Condition */}
          <div className="space-y-xs">
            <Label htmlFor="goods-condition">Item Condition</Label>
            <Select
              value={formData.condition}
              onValueChange={handleSelectChange("condition")}
            >
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
          </div>

          {/* Preferred Contact Method */}
          <div className="space-y-xs">
            <Label htmlFor="goods-preferredContact">Preferred Contact Method</Label>
            <Select
              value={formData.preferredContact}
              onValueChange={handleSelectChange("preferredContact")}
            >
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
          </div>
        </div>

        {/* Additional Notes */}
        <div className="space-y-xs">
          <Label htmlFor="goods-notes">Additional Notes (Optional)</Label>
          <Textarea
            id="goods-notes"
            name="notes"
            rows={2}
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any drop-off preferences, dimensions, or questions."
            className="resize-none"
          />
        </div>

        {/* Privacy & Consent */}
        <div className="flex items-start gap-xs pt-xs">
          <Checkbox
            id="goods-consent"
            checked={formData.consent}
            onCheckedChange={(checked) =>
              setFormData((prev) => ({ ...prev, consent: checked === true }))
            }
            required
            className="mt-0.5"
          />
          <Label
            htmlFor="goods-consent"
            className="text-xs text-muted-foreground leading-snug font-normal cursor-pointer"
          >
            I acknowledge that my submission will be emailed to Bridge Global Network team to
            coordinate goods inspection and intake.{" "}
            <span className="text-destructive">*</span>
          </Label>
        </div>

        {/* Submit */}
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
