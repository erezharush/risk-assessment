import type { RiskLevel } from "@/types/assessment";

interface RiskThreshold {
  level: RiskLevel;
  min: number;
}

const RISK_THRESHOLDS: RiskThreshold[] = [
  { level: "VeryHigh", min: 90 },
  { level: "High", min: 75 },
  { level: "Medium", min: 55 },
  { level: "Low", min: 35 },
  { level: "VeryLow", min: 0 },
];

export function determineRiskLevel(score: number): RiskLevel {
  for (const threshold of RISK_THRESHOLDS) {
    if (score >= threshold.min) {
      return threshold.level;
    }
  }
  return "VeryLow";
}

export const RISK_LEVEL_COLORS: Record<RiskLevel, string> = {
  VeryHigh: "#dc2626",
  High: "#ea580c",
  Medium: "#eab308",
  Low: "#22c55e",
  VeryLow: "#3b82f6",
};

export const RISK_LEVEL_ORDER: RiskLevel[] = [
  "VeryLow",
  "Low",
  "Medium",
  "High",
  "VeryHigh",
];
