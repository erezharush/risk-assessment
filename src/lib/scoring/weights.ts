import type {
  Environment,
  Exposure,
  SystemType,
  Classification,
  ControlEffectiveness,
  Likelihood,
} from "@/types/assessment";

export const PARAMETER_WEIGHTS = {
  environment: 0.15,
  exposure: 0.15,
  systemType: 0.15,
  classification: 0.20,
  controlEffectiveness: 0.15,
  likelihood: 0.20,
} as const;

export const ENVIRONMENT_SCORES: Record<Environment, number> = {
  OT: 100,
  IOT: 85,
  IT: 75,
  InternalCloud: 75,
  ExternalCloud: 40,
};

export const EXPOSURE_SCORES: Record<Exposure, number> = {
  Full: 100,
  Partial: 60,
  None: 40,
};

export const SYSTEM_TYPE_SCORES: Record<SystemType, number> = {
  Primary: 100,
  Secondary: 40,
};

export const CLASSIFICATION_SCORES: Record<Classification, number> = {
  Level8: 100,
  Level7: 90,
  Level6: 80,
  Level5: 70,
  Level4: 55,
  Level3: 45,
  Level2: 35,
  Level1: 15,
};

export const CONTROL_EFFECTIVENESS_SCORES: Record<ControlEffectiveness, number> = {
  1: 100,
  2: 80,
  3: 60,
  4: 40,
  5: 20,
};

export const LIKELIHOOD_SCORES: Record<Likelihood, number> = {
  1: 20,
  2: 40,
  3: 60,
  4: 80,
  5: 100,
};

export const COMPENSATING_CONTROL_FACTOR = 0.80;
