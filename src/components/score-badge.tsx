"use client";

import { useTranslations } from "next-intl";
import type { RiskLevel } from "@/types/assessment";
import { RISK_LEVEL_COLORS } from "@/lib/scoring/risk-levels";

interface ScoreBadgeProps {
  riskLevel: RiskLevel;
  score: number;
}

export function ScoreBadge({ riskLevel, score }: ScoreBadgeProps) {
  const t = useTranslations("riskLevels");
  const color = RISK_LEVEL_COLORS[riskLevel];

  return (
    <div className="flex items-center gap-3">
      <span
        className="inline-flex items-center rounded-full px-3 py-1 text-sm font-bold text-white"
        style={{ backgroundColor: color }}
      >
        {t(riskLevel)}
      </span>
      <span className="text-2xl font-bold" style={{ color }}>
        {score.toFixed(1)}
      </span>
    </div>
  );
}
