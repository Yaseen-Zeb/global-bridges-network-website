"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FileText, Loader2, Upload } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/common/reveal";
import { Typography } from "@/components/common/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label, RequiredMark } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { SELECT_ROLE_EVENT } from "@/features/careers/components/apply-button";
import { APPLICATION_FORM, CV_RULES } from "@/features/careers/data/careers-content";
import { cn } from "@/lib/utils";

const hasCvExtension = (name: string) => CV_RULES.extensions.some((ext) => name.toLowerCase().endsWith(ext));

const applicationSchema = z.object({
  name: z.string().trim().min(2, "Full name must be at least 2 characters."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().optional(),
  role: z.string().min(1, "Please choose the role you are interested in."),
  cv: z
    .custom<FileList>((value) => typeof FileList !== "undefined" && value instanceof FileList && value.length > 0, {
      message: "Please attach your CV.",
    })
    .refine((files) => hasCvExtension(files[0].name), "Your CV must be a PDF or Word document.")
    .refine((files) => files[0].size <= CV_RULES.maxBytes, "Your CV must be 5 MB or smaller."),
  message: z.string().trim().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must give your consent to submit.",
  }),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

const labelClass = "text-xs font-normal text-muted-foreground";
const fieldClass = "h-10 rounded-input border-border text-sm placeholder:text-muted-foreground/70";
const errorClass = "text-xs font-medium text-destructive";

interface ApplicationFormProps {
  /** Titles of the open positions; "General application" is always offered last. */
  roles: string[];
}

export function ApplicationForm({ roles }: ApplicationFormProps) {
  const options = [...roles, APPLICATION_FORM.generalRole];

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    reValidateMode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: APPLICATION_FORM.generalRole,
      message: "",
      consent: false,
    },
  });

  // "Apply for This Role" buttons on the job cards preselect their role.
  React.useEffect(() => {
    const onSelect = (e: Event) => {
      const role = (e as CustomEvent<unknown>).detail;
      if (typeof role === "string" && options.includes(role)) setValue("role", role);
    };
    window.addEventListener(SELECT_ROLE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_ROLE_EVENT, onSelect);
  });

  const cvFile = watch("cv")?.[0];

  const onSubmit = async (data: ApplicationFormData) => {
    const toastId = toast.loading("Sending your application...");
    const body = new FormData();
    body.append("name", data.name);
    body.append("email", data.email);
    body.append("phone", data.phone ?? "");
    body.append("role", data.role);
    body.append("message", data.message ?? "");
    body.append("consent", String(data.consent));
    body.append("cv", data.cv[0]);

    try {
      const response = await fetch("/api/careers", { method: "POST", body });
      const result = await response.json().catch(() => ({}));
      if (response.ok && result.success) {
        toast.success("Application Sent!", {
          id: toastId,
          description: result.message || "Thank you for applying. Our team will review your application.",
        });
        reset();
      } else {
        toast.error("Submission Failed", {
          id: toastId,
          description:
            result.error ||
            (response.status === 413
              ? "Your CV is too large to upload. Please send a file of 5 MB or smaller."
              : "Failed to send your application. Please check the fields and try again."),
        });
      }
    } catch {
      toast.error("Network Error", {
        id: toastId,
        description: "A network error occurred while sending your application. Please try again later.",
      });
    }
  };

  return (
    <section id="apply" aria-labelledby="apply-heading" className="scroll-mt-3xl bg-surface px-md py-3xl lg:px-xl lg:py-4xl">
      <div className="mx-auto max-w-3xl space-y-2xl">
        <Reveal className="space-y-sm text-center">
          <Typography variant="overline" as="p">
            {APPLICATION_FORM.eyebrow}
          </Typography>
          <Typography variant="h2" id="apply-heading">
            {APPLICATION_FORM.title}
          </Typography>
          <Typography variant="body-sm" className="text-muted-foreground">
            {APPLICATION_FORM.description}
          </Typography>
        </Reveal>

        <Reveal className="bg-background p-lg shadow-modal sm:p-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-md" noValidate>
            <p className="text-xs text-muted-foreground">
              <RequiredMark /> Required
            </p>

            <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
              <div className="space-y-xs">
                <Label htmlFor="apply-name" required className={labelClass}>
                  Full name
                </Label>
                <Input
                  id="apply-name"
                  aria-required="true"
                  autoComplete="name"
                  placeholder="eg. Sarah"
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "apply-name-error" : undefined}
                  className={cn(fieldClass, errors.name && "border-destructive")}
                  {...register("name")}
                />
                {errors.name && (
                  <p id="apply-name-error" className={errorClass}>
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-xs">
                <Label htmlFor="apply-email" required className={labelClass}>
                  Email Address
                </Label>
                <Input
                  id="apply-email"
                  type="email"
                  aria-required="true"
                  autoComplete="email"
                  placeholder="eg. sarah@gmail.com"
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "apply-email-error" : undefined}
                  className={cn(fieldClass, errors.email && "border-destructive")}
                  {...register("email")}
                />
                {errors.email && (
                  <p id="apply-email-error" className={errorClass}>
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-xs">
                <Label htmlFor="apply-phone" className={labelClass}>
                  Phone Number
                </Label>
                <Input id="apply-phone" type="tel" autoComplete="tel" placeholder="eg. (+1) 234 1243 567" className={fieldClass} {...register("phone")} />
              </div>

              <div className="space-y-xs">
                <Label htmlFor="apply-role" required className={labelClass}>
                  Role Interested In
                </Label>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="apply-role" aria-required="true" className={fieldClass}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {options.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.role && <p className={errorClass}>{errors.role.message}</p>}
              </div>
            </div>

            <div className="space-y-xs">
              <Label htmlFor="apply-cv" required className={labelClass}>
                CV / Resume
              </Label>
              <label
                htmlFor="apply-cv"
                className={cn(
                  "flex cursor-pointer items-center gap-sm rounded-input border border-dashed border-border px-md py-md text-sm transition-colors hover:border-primary hover:bg-primary/5 focus-within:ring-2 focus-within:ring-ring",
                  errors.cv && "border-destructive"
                )}
              >
                {cvFile ? (
                  <FileText className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                ) : (
                  <Upload className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
                )}
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium text-foreground">{cvFile ? cvFile.name : "Choose a file"}</span>
                  <span className="block text-xs text-muted-foreground">{CV_RULES.hint}</span>
                </span>
                <input
                  id="apply-cv"
                  type="file"
                  accept={CV_RULES.accept}
                  aria-required="true"
                  aria-invalid={errors.cv ? "true" : "false"}
                  aria-describedby={errors.cv ? "apply-cv-error" : undefined}
                  className="sr-only"
                  {...register("cv")}
                />
              </label>
              {errors.cv && (
                <p id="apply-cv-error" className={errorClass}>
                  {errors.cv.message}
                </p>
              )}
            </div>

            <div className="space-y-xs">
              <Label htmlFor="apply-message" className={labelClass}>
                Message (Optional)
              </Label>
              <Textarea
                id="apply-message"
                rows={4}
                placeholder="Tell us a little about yourself and why you would like to join us."
                className="min-h-[7rem] rounded-input border-border text-sm placeholder:text-muted-foreground/70"
                {...register("message")}
              />
            </div>

            <div className="space-y-xs pt-xs">
              <div className="flex items-start gap-sm">
                <Controller
                  name="consent"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="apply-consent"
                      aria-required="true"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-invalid={errors.consent ? "true" : "false"}
                      aria-describedby={errors.consent ? "apply-consent-error" : undefined}
                      className="mt-0.5"
                    />
                  )}
                />
                <Label htmlFor="apply-consent" required className="cursor-pointer text-xs font-normal leading-5 text-muted-foreground">
                  {APPLICATION_FORM.consent}
                </Label>
              </div>
              {errors.consent && (
                <p id="apply-consent-error" className={cn(errorClass, "pl-lg")}>
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
                  "Submit Application"
                )}
              </Button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
