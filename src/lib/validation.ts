import { planSchema, PartialPlan } from './schema';

export function validatePlanForExport(plan: PartialPlan): { isValid: boolean; errors: string[] } {
  const result = planSchema.safeParse(plan);

  if (result.success) {
    return { isValid: true, errors: [] };
  }

  const errors = result.error.issues.map(err => {
    const path = err.path.join('.');
    return `${path}: ${err.message}`;
  });

  return { isValid: false, errors };
}
