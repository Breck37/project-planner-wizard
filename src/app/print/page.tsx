import { generateMarkdown } from '@/lib/markdown-generator';
import { PartialPlan } from '@/lib/schema';

// This route renders a printable version of the plan for PDF generation
export default async function PrintPage({
  searchParams,
}: {
  searchParams: Promise<{ data?: string }>;
}) {
  const params = await searchParams;

  let plan: PartialPlan | null = null;

  if (params.data) {
    try {
      plan = JSON.parse(decodeURIComponent(params.data));
    } catch (error) {
      console.error('Failed to parse plan data:', error);
    }
  }

  if (!plan) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">Error: No plan data provided</h1>
      </div>
    );
  }

  const markdown = generateMarkdown(plan);
  const lines = markdown.split('\n');

  return (
    <html>
      <head>
        <title>{plan.snapshot?.name || 'Project Plan'}</title>
        <style>{`
          body {
            font-family: 'Georgia', serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            color: #333;
          }
          h1 {
            font-size: 32px;
            margin-bottom: 16px;
            color: #1a1a1a;
          }
          h2 {
            font-size: 24px;
            margin-top: 32px;
            margin-bottom: 12px;
            color: #2c3e50;
            border-bottom: 2px solid #3498db;
            padding-bottom: 8px;
          }
          p, li {
            margin-bottom: 12px;
            font-size: 14px;
          }
          strong {
            color: #2c3e50;
          }
          ul {
            padding-left: 24px;
          }
          pre {
            white-space: pre-wrap;
            word-wrap: break-word;
            font-family: 'Courier New', monospace;
            font-size: 13px;
            background: #f5f5f5;
            padding: 12px;
            border-radius: 4px;
            margin: 12px 0;
          }
          @media print {
            body {
              padding: 20px;
            }
          }
        `}</style>
      </head>
      <body>
        {lines.map((line, index) => {
          // Heading 1
          if (line.startsWith('# ')) {
            return <h1 key={index}>{line.substring(2)}</h1>;
          }
          // Heading 2
          if (line.startsWith('## ')) {
            return <h2 key={index}>{line.substring(3)}</h2>;
          }
          // Bold text with colon (e.g., **Problem**)
          if (line.match(/^\*\*(.+?)\*\*:/)) {
            const match = line.match(/^\*\*(.+?)\*\*:\s*(.*)$/);
            if (match) {
              return (
                <p key={index}>
                  <strong>{match[1]}:</strong> {match[2]}
                </p>
              );
            }
          }
          // List items
          if (line.startsWith('- ')) {
            return <li key={index}>{line.substring(2)}</li>;
          }
          // Empty lines
          if (line.trim() === '') {
            return <br key={index} />;
          }
          // Regular paragraphs
          return <p key={index}>{line}</p>;
        })}
      </body>
    </html>
  );
}
