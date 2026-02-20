"use client";

import { useTranslations } from "next-intl";
import type { AssessmentInput, AssessmentResult } from "@/types/assessment";
import { generateNarrative } from "@/lib/narrative/generator";

interface NarrativeSummaryProps {
  result: AssessmentResult;
  input: AssessmentInput;
}

export function NarrativeSummary({ result, input }: NarrativeSummaryProps) {
  const t = useTranslations();

  const template = t.raw(`narrative.${result.riskLevel}`);
  const domainLabel = t(`domains.${input.securityDomain}`);
  const environmentLabel = t(`parameters.environment.${input.environment}`);
  const exposureLabel = t(`parameters.exposure.${input.exposure}`);
  const systemTypeLabel = t(`parameters.systemType.${input.systemType}`);
  const classificationLabel = t(`parameters.classification.${input.classification}`);

  const narrative = generateNarrative({
    input,
    result,
    template,
    domainLabel,
    environmentLabel,
    exposureLabel,
    systemTypeLabel,
    classificationLabel,
  });

  const renderMarkdown = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-bold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">{t("results.narrative")}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {renderMarkdown(narrative)}
      </p>
    </div>
  );
}
