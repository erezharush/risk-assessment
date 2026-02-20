"use client";

import { useTranslations } from "next-intl";
import type { AssessmentInput } from "@/types/assessment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ENVIRONMENT_OPTIONS,
  EXPOSURE_OPTIONS,
  SYSTEM_TYPE_OPTIONS,
  CLASSIFICATION_OPTIONS,
  CONTROL_EFFECTIVENESS_OPTIONS,
  LIKELIHOOD_OPTIONS,
  SECURITY_DOMAINS,
} from "@/data/parameter-options";

interface AssessmentFormProps {
  input: Partial<AssessmentInput>;
  onChange: (input: Partial<AssessmentInput>) => void;
}

export function AssessmentForm({ input, onChange }: AssessmentFormProps) {
  const t = useTranslations();

  const updateField = <K extends keyof AssessmentInput>(key: K, value: AssessmentInput[K]) => {
    onChange({ ...input, [key]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("form.title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label>{t("form.riskDescription")}</Label>
          <Textarea
            rows={2}
            placeholder={t("form.riskDescriptionPlaceholder")}
            value={input.riskDescription ?? ""}
            onChange={(e) => updateField("riskDescription", e.target.value)}
            className="resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{t("form.securityDomain")}</Label>
            <Select
              value={input.securityDomain ?? ""}
              onValueChange={(v) => updateField("securityDomain", v as AssessmentInput["securityDomain"])}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("form.selectPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {SECURITY_DOMAINS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {t(opt.labelKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>{t("form.environment")}</Label>
            <Select
              value={input.environment ?? ""}
              onValueChange={(v) => updateField("environment", v as AssessmentInput["environment"])}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("form.selectPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {ENVIRONMENT_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {t(opt.labelKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>{t("form.exposure")}</Label>
            <Select
              value={input.exposure ?? ""}
              onValueChange={(v) => updateField("exposure", v as AssessmentInput["exposure"])}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("form.selectPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {EXPOSURE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {t(opt.labelKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>{t("form.systemType")}</Label>
            <Select
              value={input.systemType ?? ""}
              onValueChange={(v) => updateField("systemType", v as AssessmentInput["systemType"])}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("form.selectPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {SYSTEM_TYPE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {t(opt.labelKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>{t("form.classification")}</Label>
            <Select
              value={input.classification ?? ""}
              onValueChange={(v) => updateField("classification", v as AssessmentInput["classification"])}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("form.selectPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {CLASSIFICATION_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {t(opt.labelKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>{t("form.controlEffectiveness")}</Label>
            <Select
              value={input.controlEffectiveness?.toString() ?? ""}
              onValueChange={(v) => updateField("controlEffectiveness", Number(v) as AssessmentInput["controlEffectiveness"])}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("form.selectPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {CONTROL_EFFECTIVENESS_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value.toString()}>
                    {t(opt.labelKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>{t("form.likelihood")}</Label>
            <Select
              value={input.likelihood?.toString() ?? ""}
              onValueChange={(v) => updateField("likelihood", Number(v) as AssessmentInput["likelihood"])}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("form.selectPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {LIKELIHOOD_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value.toString()}>
                    {t(opt.labelKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label>{t("form.compensatingControl")}</Label>
            <p className="text-sm text-muted-foreground">
              {t("form.compensatingControlDescription")}
            </p>
          </div>
          <Switch
            checked={input.hasCompensatingControl ?? false}
            onCheckedChange={(checked) => updateField("hasCompensatingControl", checked)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
