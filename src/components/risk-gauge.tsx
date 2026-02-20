"use client";

import { PieChart, Pie, Cell } from "recharts";
import type { RiskLevel } from "@/types/assessment";
import { RISK_LEVEL_COLORS } from "@/lib/scoring/risk-levels";

interface RiskGaugeProps {
  score: number;
  riskLevel: RiskLevel;
}

export function RiskGauge({ score, riskLevel }: RiskGaugeProps) {
  const color = RISK_LEVEL_COLORS[riskLevel];
  const clampedScore = Math.min(100, Math.max(0, score));

  const data = [
    { value: clampedScore },
    { value: 100 - clampedScore },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <PieChart width={200} height={120}>
          <Pie
            data={data}
            cx={100}
            cy={100}
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            dataKey="value"
            stroke="none"
          >
            <Cell fill={color} />
            <Cell fill="#e5e7eb" />
          </Pie>
        </PieChart>
        <div className="absolute inset-0 flex items-end justify-center pb-2">
          <span className="text-3xl font-bold" style={{ color }}>
            {score.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
