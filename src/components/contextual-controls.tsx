"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { Sparkles, Shield, BookOpen, Box } from "lucide-react";
import type { AssessmentResult, SecurityDomain } from "@/types/assessment";
import { matchControlsToDescription, type MatchedControl } from "@/lib/scoring/control-matcher";

interface ContextualControlsProps {
  result: AssessmentResult;
  riskDescription: string;
}

export function ContextualControls({ result, riskDescription }: ContextualControlsProps) {
  const t = useTranslations();

  const matched: MatchedControl[] = useMemo(
    () => matchControlsToDescription(riskDescription, result.riskLevel),
    [riskDescription, result.riskLevel],
  );

  if (matched.length === 0) {
    return null;
  }

  const groupedByDomain = new Map<SecurityDomain, MatchedControl[]>();
  for (const m of matched) {
    const existing = groupedByDomain.get(m.domain) ?? [];
    existing.push(m);
    groupedByDomain.set(m.domain, existing);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-amber-500" />
        <h3 className="text-lg font-semibold">{t("results.contextualControls")}</h3>
      </div>
      <p className="text-xs text-muted-foreground">
        {t("results.contextualControlsDescription")}
      </p>

      {[...groupedByDomain.entries()].map(([domain, controls]) => (
        <div key={domain} className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-primary">
              {t(`domains.${domain}`)}
            </span>
            <span className="text-xs text-muted-foreground rounded-full bg-amber-100 text-amber-700 px-2 py-0.5">
              {controls[0].matchedTerms.join(", ")}
            </span>
          </div>
          {controls.map((rec, idx) => (
            <div key={idx} className="rounded-lg border border-amber-200 bg-amber-50/50 p-4 space-y-2">
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 mt-1 shrink-0 text-amber-600" />
                <p className="text-sm font-medium">{rec.control.control}</p>
              </div>
              <div className="flex items-center gap-2 ms-6">
                <BookOpen className="h-3 w-3 shrink-0 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{rec.control.framework}</span>
              </div>
              <div className="flex items-start gap-2 ms-6">
                <Box className="h-3 w-3 mt-0.5 shrink-0 text-muted-foreground" />
                <div className="flex flex-wrap gap-1">
                  {rec.control.products.map((product) => (
                    <span
                      key={product}
                      className="inline-flex items-center rounded-md bg-amber-100 px-2 py-0.5 text-xs text-amber-800 ring-1 ring-inset ring-amber-600/10"
                    >
                      {product}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
