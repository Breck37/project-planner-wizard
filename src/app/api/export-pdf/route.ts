import { NextRequest, NextResponse } from 'next/server';
import { chromium } from 'playwright';
import { PartialPlan } from '@/lib/schema';

export async function POST(request: NextRequest) {
  try {
    const plan: PartialPlan = await request.json();

    // Get base URL from environment or fallback to localhost
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

    // Encode plan data for URL
    const planData = encodeURIComponent(JSON.stringify(plan));
    const printUrl = `${baseUrl}/print?data=${planData}`;

    // Launch Playwright browser
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Navigate to print page
    await page.goto(printUrl, { waitUntil: 'networkidle' });

    // Generate PDF
    const pdf = await page.pdf({
      format: 'Letter',
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in',
      },
      printBackground: true,
    });

    await browser.close();

    // Return PDF as response
    return new NextResponse(Buffer.from(pdf), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${plan.snapshot?.name || 'project-plan'}.pdf"`,
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
