"use client";

import { useTranslations } from "next-intl";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";
import type { ParameterScore } from "@/types/assessment";

interface ParameterBreakdownProps {
  parameterScores: ParameterScore[];
}

const PARAMETER_LABEL_KEYS: Record<string, string> = {
  environment: "form.environment",
  exposure: "form.exposure",
  systemType: "form.systemType",
  classification: "form.classification",
  controlEffectiveness: "form.controlEffectiveness",
  likelihood: "form.likelihood",
};

export function ParameterBreakdown({ parameterScores }: ParameterBreakdownProps) {
  const t = useTranslations();

  const data = parameterScores.map((ps) => ({
    parameter: t(PARAMETER_LABEL_KEYS[ps.parameter] ?? ps.parameter),
    value: ps.rawValue,
    fullMark: 100,
  }));

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="parameter" tick={{ fontSize: 12 }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
          <Radar
            name="Score"
            dataKey="value"
            stroke="#1d4ed8"
            fill="#1d4ed8"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
