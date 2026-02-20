"use client";

import { useTranslations } from "next-intl";
import type { AssessmentInput, AssessmentResult } from "@/types/assessment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreBadge } from "@/components/score-badge";
import { RiskGauge } from "@/components/risk-gauge";
import { ParameterBreakdown } from "@/components/parameter-breakdown";
import { NarrativeSummary } from "@/components/narrative-summary";
import { ContextualControls } from "@/components/contextual-controls";
import { RecommendedControls } from "@/components/recommended-controls";

interface ResultsPanelProps {
  result: AssessmentResult | null;
  input: AssessmentInput;
}

export function ResultsPanel({ result, input }: ResultsPanelProps) {
  const t = useTranslations("results");

  if (!result) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-12">{t("noResults")}</p>
        </CardContent>
      </Card>
    );
  }

  const hasDescription = (input.riskDescription ?? "").trim().length > 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <RiskGauge score={result.finalScore} riskLevel={result.riskLevel} />
            <ScoreBadge riskLevel={result.riskLevel} score={result.finalScore} />
          </div>

          {result.hasCompensatingControl && (
            <div className="flex items-center gap-2 rounded-md bg-blue-50 p-3 text-sm text-blue-800">
              <span>{t("rawScore")}: {result.rawScore.toFixed(1)}</span>
              <span>&rarr;</span>
              <span>{t("finalScore")}: {result.finalScore.toFixed(1)}</span>
              <span className="text-xs">({t("compensatingApplied")})</span>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("parameterBreakdown")}</h3>
            <ParameterBreakdown parameterScores={result.parameterScores} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 space-y-6">
          <NarrativeSummary result={result} input={input} />
        </CardContent>
      </Card>

      {hasDescription && (
        <Card>
          <CardContent className="pt-6">
            <ContextualControls
              result={result}
              riskDescription={input.riskDescription}
            />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="pt-6">
          <RecommendedControls result={result} securityDomain={input.securityDomain} />
        </CardContent>
      </Card>
    </div>
  );
}
