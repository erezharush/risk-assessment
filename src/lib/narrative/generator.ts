import type { AssessmentInput, AssessmentResult } from "@/types/assessment";

interface NarrativeParams {
  input: AssessmentInput;
  result: AssessmentResult;
  template: string;
  domainLabel: string;
  environmentLabel: string;
  exposureLabel: string;
  systemTypeLabel: string;
  classificationLabel: string;
}

export function generateNarrative({
  result,
  template,
  domainLabel,
  environmentLabel,
  exposureLabel,
  systemTypeLabel,
  classificationLabel,
  input,
}: NarrativeParams): string {
  return template
    .replace("{score}", result.finalScore.toFixed(1))
    .replace("{environment}", environmentLabel)
    .replace("{exposure}", exposureLabel)
    .replace("{systemType}", systemTypeLabel)
    .replace("{classification}", classificationLabel)
    .replace("{controlEffectiveness}", String(input.controlEffectiveness))
    .replace("{likelihood}", String(input.likelihood))
    .replace("{domain}", domainLabel);
}
