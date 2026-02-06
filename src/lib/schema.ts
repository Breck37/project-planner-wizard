import { z } from 'zod';

// Zod schema for the complete project plan
export const planSchema = z.object({
  templateId: z.enum(['personal-tool', 'social-tool', 'portfolio', 'discovery']),

  snapshot: z.object({
    name: z.string().min(1, 'Project name is required'),
    type: z.string().min(1, 'Project type is required'),
    status: z.enum(['idea', 'in-progress', 'completed']),
    oneLiner: z.string().min(1, 'One-liner description is required'),
  }),

  friction: z.object({
    problem: z.string().min(1, 'Problem description is required'),
    when: z.string().min(1, 'When does this happen is required'),
    why: z.string().min(1, 'Why it matters is required'),
    workaround: z.string().min(1, 'Current workaround is required'),
  }),

  notThis: z.array(z.string()).min(1, 'At least one scope guardrail is required'),

  sbv: z.object({
    inputs: z.string().min(1, 'Inputs are required'),
    outputs: z.string().min(1, 'Outputs are required'),
    workflow: z.string().min(1, 'Workflow is required'),
    screensEstimate: z.number().min(1, 'Screen estimate must be at least 1'),
  }),

  user: z.object({
    forWhom: z.string().min(1, 'User description is required'),
    whyNotSomeoneElse: z.string().optional(),
  }),

  success: z.object({
    definition: z.string().min(1, 'Success definition is required'),
  }),

  parkingLot: z.object({
    ideas: z.string().optional(),
  }),

  energy: z.object({
    profile: z.string().min(1, 'Energy profile is required'),
  }),

  stoppingPoint: z.object({
    doneWhen: z.string().min(1, 'Stopping point is required'),
  }),
});

export type Plan = z.infer<typeof planSchema>;

// Partial validation for work-in-progress
export const partialPlanSchema = planSchema.partial().required({ templateId: true });
export type PartialPlan = z.infer<typeof partialPlanSchema>;
