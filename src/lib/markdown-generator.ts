import { Plan, PartialPlan } from './schema';
import { templates } from './templates';

export function generateMarkdown(plan: PartialPlan): string {
  const template = templates.find(t => t.id === plan.templateId);

  let md = `# ${plan.snapshot?.name || 'Untitled Project'}\n\n`;

  if (template) {
    md += `**Template**: ${template.icon} ${template.name}\n\n`;
  }

  // Project Snapshot
  if (plan.snapshot) {
    md += `## Project Snapshot\n\n`;
    md += `- **Type**: ${plan.snapshot.type || 'N/A'}\n`;
    md += `- **Status**: ${plan.snapshot.status || 'N/A'}\n`;
    md += `- **One-liner**: ${plan.snapshot.oneLiner || 'N/A'}\n\n`;
  }

  // Personal Friction
  if (plan.friction) {
    md += `## Personal Friction\n\n`;
    md += `**Problem**: ${plan.friction.problem || 'N/A'}\n\n`;
    md += `**When**: ${plan.friction.when || 'N/A'}\n\n`;
    md += `**Why**: ${plan.friction.why || 'N/A'}\n\n`;
    md += `**Current Workaround**: ${plan.friction.workaround || 'N/A'}\n\n`;
  }

  // This is NOT...
  if (plan.notThis && plan.notThis.length > 0) {
    md += `## This is NOT...\n\n`;
    plan.notThis.forEach(item => {
      md += `- ${item}\n`;
    });
    md += `\n`;
  }

  // Smallest Believable Version (SBV)
  if (plan.sbv) {
    md += `## Smallest Believable Version\n\n`;
    md += `**Inputs**: ${plan.sbv.inputs || 'N/A'}\n\n`;
    md += `**Outputs**: ${plan.sbv.outputs || 'N/A'}\n\n`;
    md += `**Workflow**:\n${plan.sbv.workflow || 'N/A'}\n\n`;
    md += `**Estimated Screens**: ${plan.sbv.screensEstimate || 'N/A'}\n\n`;
  }

  // User
  if (plan.user) {
    md += `## User\n\n`;
    md += `**For Whom**: ${plan.user.forWhom || 'N/A'}\n\n`;
    if (plan.user.whyNotSomeoneElse) {
      md += `**Why Not Someone Else**: ${plan.user.whyNotSomeoneElse}\n\n`;
    }
  }

  // Success Definition
  if (plan.success) {
    md += `## Success Definition\n\n`;
    md += `${plan.success.definition || 'N/A'}\n\n`;
  }

  // Future Expansion Parking Lot
  if (plan.parkingLot?.ideas) {
    md += `## Future Expansion Parking Lot\n\n`;
    md += `${plan.parkingLot.ideas}\n\n`;
  }

  // Energy Profile
  if (plan.energy) {
    md += `## Energy Profile\n\n`;
    md += `${plan.energy.profile || 'N/A'}\n\n`;
  }

  // Stopping Point
  if (plan.stoppingPoint) {
    md += `## Stopping Point\n\n`;
    md += `**Done When**: ${plan.stoppingPoint.doneWhen || 'N/A'}\n\n`;
  }

  return md;
}
