"use client";

import { useTranslations } from "next-intl";
import { Shield, BookOpen, Box } from "lucide-react";
import type { AssessmentResult, SecurityDomain } from "@/types/assessment";
import { DOMAIN_CONTROLS } from "@/data/domain-controls";

interface RecommendedControlsProps {
  result: AssessmentResult;
  securityDomain: SecurityDomain;
}

export function RecommendedControls({ result, securityDomain }: RecommendedControlsProps) {
  const t = useTranslations();
  const controls = DOMAIN_CONTROLS[securityDomain][result.riskLevel];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">{t("results.recommendedControls")}</h3>
        <p className="text-sm text-muted-foreground">
          {t(`domains.${securityDomain}`)}
        </p>
      </div>
      <div className="space-y-4">
        {controls.map((rec, idx) => (
          <div key={idx} className="rounded-lg border p-4 space-y-2">
            <div className="flex items-start gap-2">
              <Shield className="h-4 w-4 mt-1 shrink-0 text-primary" />
              <p className="text-sm font-medium">{rec.control}</p>
            </div>
            <div className="flex items-center gap-2 ms-6">
              <BookOpen className="h-3 w-3 shrink-0 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{rec.framework}</span>
            </div>
            <div className="flex items-start gap-2 ms-6">
              <Box className="h-3 w-3 mt-0.5 shrink-0 text-muted-foreground" />
              <div className="flex flex-wrap gap-1">
                {rec.products.map((product) => (
                  <span
                    key={product}
                    className="inline-flex items-center rounded-md bg-blue-50 px-2 py-0.5 text-xs text-blue-700 ring-1 ring-inset ring-blue-600/10"
                  >
                    {product}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
