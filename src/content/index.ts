import type { Exercise, LevelId, Module } from "@/lib/types";
import { intermedioModules } from "./modules/intermedio";
import { avanzatoModules } from "./modules/avanzato";
import { seniorModules } from "./modules/senior";
import { leadModules } from "./modules/lead";
import { expertModules } from "./modules/expert";

export const MODULES: Module[] = [
  ...intermedioModules,
  ...avanzatoModules,
  ...seniorModules,
  ...leadModules,
  ...expertModules,
];

export function getModule(id: string): Module | undefined {
  return MODULES.find((m) => m.id === id);
}

export function getExercise(
  moduleId: string,
  exerciseId: string,
): { module: Module; exercise: Exercise } | undefined {
  const mod = getModule(moduleId);
  if (!mod) return undefined;
  const exercise = mod.exercises.find((e) => e.id === exerciseId);
  if (!exercise) return undefined;
  return { module: mod, exercise };
}

export function modulesByLevel(level: LevelId): Module[] {
  return MODULES.filter((m) => m.level === level);
}

export const TOTAL_EXERCISES = MODULES.reduce(
  (sum, m) => sum + m.exercises.length,
  0,
);

export {
  maxScoreFor,
  EXERCISE_TYPE_LABEL,
  EXERCISE_TYPE_DESCRIPTION,
} from "@/lib/labels";
