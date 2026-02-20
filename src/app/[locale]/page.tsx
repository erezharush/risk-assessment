"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import logo from "../../../public/logo.png";
import { RotateCcw } from "lucide-react";
import type { AssessmentInput, AssessmentResult } from "@/types/assessment";
import { calculateRiskScore } from "@/lib/scoring/engine";
import { AssessmentForm } from "@/components/assessment-form";
import { ResultsPanel } from "@/components/results-panel";
import { ExportToolbar } from "@/components/export-toolbar";
import { LanguageToggle } from "@/components/language-toggle";
import { ReferenceModal } from "@/components/reference-modal";

const INITIAL_STATE: Partial<AssessmentInput> = {
  hasCompensatingControl: false,
  riskDescription: "",
};

export default function HomePage() {
  const t = useTranslations();
  const [input, setInput] = useState<Partial<AssessmentInput>>(INITIAL_STATE);

  const handleClear = useCallback(() => setInput({ ...INITIAL_STATE }), []);

  const isComplete =
    input.environment &&
    input.exposure &&
    input.systemType &&
    input.classification &&
    input.controlEffectiveness &&
    input.likelihood &&
    input.securityDomain;

  const result: AssessmentResult | null = useMemo(() => {
    if (isComplete) {
      return calculateRiskScore(input as AssessmentInput);
    }
    return null;
  }, [input, isComplete]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image src={logo} alt="חברת החשמל לישראל" width={100} height={50} priority />
            <div>
              <h1 className="text-xl font-bold">מחשבון פערי אבטחת סייבר - חברת החשמל</h1>
              <p className="text-xs text-muted-foreground">{t("app.subtitle")}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ReferenceModal />
            <button
              onClick={handleClear}
              className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-accent transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              {t("form.clear")}
            </button>
            {result && <ExportToolbar result={result} input={input as AssessmentInput} />}
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <AssessmentForm input={input} onChange={setInput} />
          </div>
          <div className="lg:col-span-3">
            <ResultsPanel result={result} input={input as AssessmentInput} />
          </div>
        </div>
      </main>
    </div>
  );
}
