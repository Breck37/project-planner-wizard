import { NextRequest, NextResponse } from 'next/server';
import PptxGenJS from 'pptxgenjs';
import { PartialPlan } from '@/lib/schema';
import { templates } from '@/lib/templates';

export async function POST(request: NextRequest) {
  try {
    const plan: PartialPlan = await request.json();

    // Create presentation
    const pptx = new PptxGenJS();
    pptx.layout = 'LAYOUT_WIDE';

    // Title slide
    const titleSlide = pptx.addSlide();
    titleSlide.background = { color: '2C3E50' };
    titleSlide.addText(plan.snapshot?.name || 'Project Plan', {
      x: 0.5,
      y: 2.5,
      w: 12,
      h: 1.5,
      fontSize: 48,
      bold: true,
      color: 'FFFFFF',
      align: 'center',
    });

    const template = templates.find(t => t.id === plan.templateId);
    if (template) {
      titleSlide.addText(`${template.icon} ${template.name}`, {
        x: 0.5,
        y: 4,
        w: 12,
        h: 0.5,
        fontSize: 24,
        color: 'ECF0F1',
        align: 'center',
      });
    }

    // Friction slide
    if (plan.friction) {
      const frictionSlide = pptx.addSlide();
      frictionSlide.addText('Personal Friction', {
        x: 0.5,
        y: 0.5,
        w: 12,
        h: 0.6,
        fontSize: 32,
        bold: true,
        color: '2C3E50',
      });

      frictionSlide.addText('Problem', {
        x: 0.5,
        y: 1.5,
        w: 12,
        fontSize: 18,
        bold: true,
        color: '34495E',
      });
      frictionSlide.addText(plan.friction.problem || 'N/A', {
        x: 0.5,
        y: 2,
        w: 12,
        fontSize: 14,
        color: '2C3E50',
      });

      frictionSlide.addText('When', {
        x: 0.5,
        y: 3,
        w: 12,
        fontSize: 18,
        bold: true,
        color: '34495E',
      });
      frictionSlide.addText(plan.friction.when || 'N/A', {
        x: 0.5,
        y: 3.5,
        w: 12,
        fontSize: 14,
        color: '2C3E50',
      });
    }

    // Scope slide
    if (plan.notThis && plan.notThis.length > 0) {
      const scopeSlide = pptx.addSlide();
      scopeSlide.addText('This is NOT...', {
        x: 0.5,
        y: 0.5,
        w: 12,
        h: 0.6,
        fontSize: 32,
        bold: true,
        color: '2C3E50',
      });

      plan.notThis.forEach((item, index) => {
        scopeSlide.addText(`• ${item}`, {
          x: 1,
          y: 1.5 + index * 0.6,
          w: 11,
          fontSize: 16,
          color: '2C3E50',
        });
      });
    }

    // SBV slide
    if (plan.sbv) {
      const sbvSlide = pptx.addSlide();
      sbvSlide.addText('Smallest Believable Version', {
        x: 0.5,
        y: 0.5,
        w: 12,
        h: 0.6,
        fontSize: 32,
        bold: true,
        color: '2C3E50',
      });

      sbvSlide.addText('Inputs', {
        x: 0.5,
        y: 1.5,
        w: 5.5,
        fontSize: 18,
        bold: true,
        color: '34495E',
      });
      sbvSlide.addText(plan.sbv.inputs || 'N/A', {
        x: 0.5,
        y: 2,
        w: 5.5,
        fontSize: 14,
        color: '2C3E50',
      });

      sbvSlide.addText('Outputs', {
        x: 6.5,
        y: 1.5,
        w: 5.5,
        fontSize: 18,
        bold: true,
        color: '34495E',
      });
      sbvSlide.addText(plan.sbv.outputs || 'N/A', {
        x: 6.5,
        y: 2,
        w: 5.5,
        fontSize: 14,
        color: '2C3E50',
      });

      sbvSlide.addText('Workflow', {
        x: 0.5,
        y: 3.5,
        w: 12,
        fontSize: 18,
        bold: true,
        color: '34495E',
      });
      sbvSlide.addText(plan.sbv.workflow || 'N/A', {
        x: 0.5,
        y: 4,
        w: 12,
        fontSize: 14,
        color: '2C3E50',
      });
    }

    // User + Success slide
    const userSuccessSlide = pptx.addSlide();
    userSuccessSlide.addText('User & Success', {
      x: 0.5,
      y: 0.5,
      w: 12,
      h: 0.6,
      fontSize: 32,
      bold: true,
      color: '2C3E50',
    });

    if (plan.user) {
      userSuccessSlide.addText('For Whom', {
        x: 0.5,
        y: 1.5,
        w: 12,
        fontSize: 18,
        bold: true,
        color: '34495E',
      });
      userSuccessSlide.addText(plan.user.forWhom || 'N/A', {
        x: 0.5,
        y: 2,
        w: 12,
        fontSize: 14,
        color: '2C3E50',
      });
    }

    if (plan.success) {
      userSuccessSlide.addText('Success Definition', {
        x: 0.5,
        y: 3.5,
        w: 12,
        fontSize: 18,
        bold: true,
        color: '34495E',
      });
      userSuccessSlide.addText(plan.success.definition || 'N/A', {
        x: 0.5,
        y: 4,
        w: 12,
        fontSize: 14,
        color: '2C3E50',
      });
    }

    // Energy + Stopping Point slide
    const finalSlide = pptx.addSlide();
    finalSlide.addText('Energy & Stopping Point', {
      x: 0.5,
      y: 0.5,
      w: 12,
      h: 0.6,
      fontSize: 32,
      bold: true,
      color: '2C3E50',
    });

    if (plan.energy) {
      finalSlide.addText('Energy Profile', {
        x: 0.5,
        y: 1.5,
        w: 12,
        fontSize: 18,
        bold: true,
        color: '34495E',
      });
      finalSlide.addText(plan.energy.profile || 'N/A', {
        x: 0.5,
        y: 2,
        w: 12,
        fontSize: 14,
        color: '2C3E50',
      });
    }

    if (plan.stoppingPoint) {
      finalSlide.addText('Done When', {
        x: 0.5,
        y: 3.5,
        w: 12,
        fontSize: 18,
        bold: true,
        color: '34495E',
      });
      finalSlide.addText(plan.stoppingPoint.doneWhen || 'N/A', {
        x: 0.5,
        y: 4,
        w: 12,
        fontSize: 14,
        color: '2C3E50',
      });
    }

    // Generate presentation
    const pptxData = await pptx.write({ outputType: 'nodebuffer' });

    // Return PPTX as response
    return new NextResponse(Buffer.from(pptxData as ArrayBuffer), {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'Content-Disposition': `attachment; filename="${plan.snapshot?.name || 'project-plan'}.pptx"`,
      },
    });
  } catch (error) {
    console.error('PPTX generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PPTX' },
      { status: 500 }
    );
  }
}
