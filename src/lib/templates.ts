import { PartialPlan } from './schema';

export interface Template {
  id: 'personal-tool' | 'social-tool' | 'portfolio' | 'discovery';
  name: string;
  description: string;
  icon: string;
}

export const templates: Template[] = [
  {
    id: 'personal-tool',
    name: 'Personal Tool',
    description: 'A utility or tool for personal productivity',
    icon: '🔧',
  },
  {
    id: 'social-tool',
    name: 'Social Tool',
    description: 'A tool for connecting or communicating with others',
    icon: '💬',
  },
  {
    id: 'portfolio',
    name: 'Portfolio Project',
    description: 'A showcase project to demonstrate skills',
    icon: '📁',
  },
  {
    id: 'discovery',
    name: 'Discovery Project',
    description: 'An exploratory project to learn something new',
    icon: '🔍',
  },
];

export const defaultPlan: PartialPlan = {
  templateId: 'personal-tool',
  snapshot: {
    name: '',
    type: '',
    status: 'idea',
    oneLiner: '',
  },
  friction: {
    problem: '',
    when: '',
    why: '',
    workaround: '',
  },
  notThis: [],
  sbv: {
    inputs: '',
    outputs: '',
    workflow: '',
    screensEstimate: 1,
  },
  user: {
    forWhom: '',
    whyNotSomeoneElse: '',
  },
  success: {
    definition: '',
  },
  parkingLot: {
    ideas: '',
  },
  energy: {
    profile: '',
  },
  stoppingPoint: {
    doneWhen: '',
  },
};
