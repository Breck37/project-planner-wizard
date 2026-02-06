# Project Planner Wizard

A Next.js-based wizard application that guides users through a structured project planning process and exports the results in multiple formats (Markdown, PDF, and PowerPoint).

## Features

- **Step-by-step wizard interface** with 11 comprehensive planning steps
- **Live preview** panel that updates as you type
- **Template-based planning** with 4 starter templates
- **Multiple export formats**:
  - Markdown (.md)
  - PDF document
  - PowerPoint presentation (.pptx)
- **Zod validation** ensuring complete plans before export
- **Clean, modern UI** built with Tailwind CSS
- **Local-first** - no authentication required

## Planning Steps

1. **Template Picker** - Choose from Personal Tool, Social Tool, Portfolio, or Discovery
2. **Project Snapshot** - Name, type, status, and one-liner description
3. **Personal Friction** - Define the problem you're solving
4. **"This is NOT..."** - Set scope guardrails
5. **Smallest Believable Version (SBV)** - Define the minimal complete version
6. **User** - Identify who this is for
7. **Success Definition** - Define success criteria
8. **Future Expansion Parking Lot** - Capture ideas for later
9. **Energy Profile** - Define the project's effort profile
10. **Stopping Point** - When are you done?
11. **Export** - Download your plan in multiple formats

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Validation**: Zod
- **PDF Generation**: Playwright (Chromium)
- **PowerPoint Generation**: PptxGenJS

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers for PDF export
npx playwright install chromium
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Main wizard page
│   ├── print/
│   │   └── page.tsx                # Printable view for PDF generation
│   └── api/
│       ├── export-pdf/
│       │   └── route.ts            # PDF export endpoint
│       └── export-pptx/
│           └── route.ts            # PowerPoint export endpoint
├── components/
│   └── wizard/
│       ├── wizardSidebar.tsx       # Step navigation sidebar
│       ├── planPreview.tsx         # Live markdown preview
│       └── steps/                  # Individual step components
│           ├── templatePicker.tsx
│           ├── projectSnapshot.tsx
│           ├── personalFriction.tsx
│           ├── notThis.tsx
│           ├── sbv.tsx
│           ├── user.tsx
│           ├── success.tsx
│           ├── parkingLot.tsx
│           ├── energy.tsx
│           ├── stoppingPoint.tsx
│           └── export.tsx
└── lib/
    ├── schema.ts                   # Zod schemas
    ├── templates.ts                # Template definitions
    ├── markdown-generator.ts       # Markdown generation logic
    └── validation.ts               # Export validation
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Base URL for PDF generation (defaults to http://localhost:3000)
BASE_URL=http://localhost:3000
```

## Data Model

The application uses a comprehensive `Plan` type validated by Zod:

```typescript
{
  templateId: 'personal-tool' | 'social-tool' | 'portfolio' | 'discovery',
  snapshot: { name, type, status, oneLiner },
  friction: { problem, when, why, workaround },
  notThis: string[],
  sbv: { inputs, outputs, workflow, screensEstimate },
  user: { forWhom, whyNotSomeoneElse? },
  success: { definition },
  parkingLot: { ideas? },
  energy: { profile },
  stoppingPoint: { doneWhen }
}
```

## Export Formats

### Markdown Export
- Client-side download
- Structured markdown with all plan sections

### PDF Export
- Server-side generation using Playwright
- Opens `/print` route with plan data
- Renders to PDF with proper formatting
- Professional document layout

### PowerPoint Export
- Server-side generation using PptxGenJS
- Widescreen presentation (16:9)
- Multiple slides covering key sections:
  - Title slide
  - Friction
  - Scope guardrails
  - SBV breakdown
  - User & Success
  - Energy & Stopping Point

## Development Notes

- All required fields must be completed before exporting
- The preview panel updates in real-time as you type
- You can navigate between steps at any time
- Plan data is stored in React state (local-only, no persistence)

## Future Enhancements

Potential additions for v2:
- Local storage persistence
- Plan templates management
- Export history
- Collaborative editing
- Additional export formats (JSON, CSV)

## License

MIT

---

Built with Next.js and TypeScript
