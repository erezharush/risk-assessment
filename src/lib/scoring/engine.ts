import type { AssessmentInput, AssessmentResult, ParameterScore } from "@/types/assessment";
import {
  PARAMETER_WEIGHTS,
  ENVIRONMENT_SCORES,
  EXPOSURE_SCORES,
  SYSTEM_TYPE_SCORES,
  CLASSIFICATION_SCORES,
  CONTROL_EFFECTIVENESS_SCORES,
  LIKELIHOOD_SCORES,
  COMPENSATING_CONTROL_FACTOR,
} from "./weights";
import { determineRiskLevel } from "./risk-levels";

export function calculateRiskScore(input: AssessmentInput): AssessmentResult {
  const parameterScores: ParameterScore[] = [
    {
      parameter: "environment",
      rawValue: ENVIRONMENT_SCORES[input.environment],
      weight: PARAMETER_WEIGHTS.environment,
      weightedScore: ENVIRONMENT_SCORES[input.environment] * PARAMETER_WEIGHTS.environment,
    },
    {
      parameter: "exposure",
      rawValue: EXPOSURE_SCORES[input.exposure],
      weight: PARAMETER_WEIGHTS.exposure,
      weightedScore: EXPOSURE_SCORES[input.exposure] * PARAMETER_WEIGHTS.exposure,
    },
    {
      parameter: "systemType",
      rawValue: SYSTEM_TYPE_SCORES[input.systemType],
      weight: PARAMETER_WEIGHTS.systemType,
      weightedScore: SYSTEM_TYPE_SCORES[input.systemType] * PARAMETER_WEIGHTS.systemType,
    },
    {
      parameter: "classification",
      rawValue: CLASSIFICATION_SCORES[input.classification],
      weight: PARAMETER_WEIGHTS.classification,
      weightedScore: CLASSIFICATION_SCORES[input.classification] * PARAMETER_WEIGHTS.classification,
    },
    {
      parameter: "controlEffectiveness",
      rawValue: CONTROL_EFFECTIVENESS_SCORES[input.controlEffectiveness],
      weight: PARAMETER_WEIGHTS.controlEffectiveness,
      weightedScore:
        CONTROL_EFFECTIVENESS_SCORES[input.controlEffectiveness] *
        PARAMETER_WEIGHTS.controlEffectiveness,
    },
    {
      parameter: "likelihood",
      rawValue: LIKELIHOOD_SCORES[input.likelihood],
      weight: PARAMETER_WEIGHTS.likelihood,
      weightedScore: LIKELIHOOD_SCORES[input.likelihood] * PARAMETER_WEIGHTS.likelihood,
    },
  ];

  const rawScore = parameterScores.reduce((sum, p) => sum + p.weightedScore, 0);

  const finalScore = input.hasCompensatingControl
    ? rawScore * COMPENSATING_CONTROL_FACTOR
    : rawScore;

  const riskLevel = determineRiskLevel(finalScore);

  return {
    rawScore,
    finalScore,
    riskLevel,
    parameterScores,
    hasCompensatingControl: input.hasCompensatingControl,
  };
}
