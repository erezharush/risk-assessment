import type { AssessmentInput, AssessmentResult } from "@/types/assessment";

export function generateCSV(input: AssessmentInput, result: AssessmentResult): string {
  const rows: string[][] = [
    ["Parameter", "Value", "Raw Score", "Weight", "Weighted Score"],
  ];

  for (const ps of result.parameterScores) {
    const inputValue = input[ps.parameter as keyof AssessmentInput];
    rows.push([
      ps.parameter,
      String(inputValue),
      String(ps.rawValue),
      String(ps.weight),
      ps.weightedScore.toFixed(2),
    ]);
  }

  rows.push([]);
  rows.push(["Security Domain", String(input.securityDomain)]);
  rows.push(["Compensating Control", String(input.hasCompensatingControl)]);
  rows.push(["Raw Score", result.rawScore.toFixed(2)]);
  rows.push(["Final Score", result.finalScore.toFixed(2)]);
  rows.push(["Risk Level", result.riskLevel]);

  return rows.map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
}

export function downloadCSV(csv: string, filename: string) {
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
