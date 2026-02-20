"use client";

import { useTranslations } from "next-intl";
import { Download } from "lucide-react";
import type { AssessmentInput, AssessmentResult } from "@/types/assessment";
import { generateCSV, downloadCSV } from "@/lib/export/csv";

interface ExportToolbarProps {
  result: AssessmentResult;
  input: AssessmentInput;
}

export function ExportToolbar({ result, input }: ExportToolbarProps) {
  const t = useTranslations("export");

  const handleCSVExport = () => {
    const csv = generateCSV(input, result);
    downloadCSV(csv, `risk-assessment-${new Date().toISOString().slice(0, 10)}.csv`);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleCSVExport}
        className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-accent transition-colors"
      >
        <Download className="h-4 w-4" />
        {t("csv")}
      </button>
    </div>
  );
}
