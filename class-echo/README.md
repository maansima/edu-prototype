# Class Echo - Phygital Classroom AI Platform

A responsive web prototype for a phygital classroom product that helps instructors and students use AI in a thoughtful, instructor-supporting way.

## Overview

Class Echo is the digital companion to a physical recording device in classrooms. It provides:

### For Instructors
- Upload and manage weekly lecture recordings, slides, and readings
- View learning analytics (questions asked, participation rates, key topics)
- Receive AI-suggested resources to keep course content fresh
- Monitor class engagement through intuitive visualizations

### For Students
- Access personalized quizzes that test understanding through explanation
- Interact with an AI tutor that only knows course material covered so far
- Review specific content based on AI feedback
- Track mastery levels for each week's concepts

## Design Philosophy

**Hi-tech but warm and approachable** - Inspired by Apple's Siri blob aesthetic, the interface uses:
- Minimal, calm color palette
- Soft gradient blobs for progress visualization
- Generous negative space
- Smooth transitions and animations
- Light/dark mode support

## Tech Stack

- **React** with **TypeScript**
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- All data is mocked in the frontend (no backend required)

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd class-echo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
class-echo/
├── src/
│   ├── components/       # React components
│   │   ├── Header.tsx
│   │   ├── WeekTimeline.tsx
│   │   ├── InstructorView.tsx
│   │   ├── StudentView.tsx
│   │   ├── AnalyticsCards.tsx
│   │   ├── SuggestionsCard.tsx
│   │   ├── InstructorBlobs.tsx
│   │   ├── QuizInterface.tsx
│   │   ├── WeekSummaryCard.tsx
│   │   ├── StudentBlobs.tsx
│   │   └── Icons.tsx
│   ├── types/           # TypeScript type definitions
│   │   └── index.ts
│   ├── data/            # Mock data
│   │   └── mockData.ts
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles & Tailwind imports
├── public/              # Static assets
├── index.html           # HTML template
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## Features

### Instructor View

#### Upload & Context Section
- Upload audio recordings (displays filename and duration)
- Upload slides (PDF/PPT format)
- Attach readings with URLs
- All uploads are simulated with local state

#### Analytics Dashboard (3 Cards)
1. **Engagement Overview** - Questions, participation rate, attendance
2. **Key Themes** - Bullet list of main topics discussed
3. **Participation Details** - Individual student engagement metrics

#### Suggestions for Next Week
- AI-curated resources (articles, podcasts, cases, videos)
- Toggle "Add to plan" for each suggestion
- Persistent state across sessions

#### Instructor Level Graphic
- Three glowing blobs representing:
  - Clarity of the week
  - Student engagement
  - Continuity with previous weeks
- Siri-style gradient effects with blur

### Student View

#### Week Summary
- Natural language lecture summary
- Key concepts as bullet points
- Quiz status indicator

#### "Explain It Back" Quiz Interface
- Chat-like interface (LLM left, student right)
- AI asks students to explain concepts in their own words
- Simple keyword-based evaluation system
- Provides feedback with:
  - What they did well
  - What they're missing
  - Understanding level (1-3 scale)
  - Specific resources to review (clickable chips)
- Automatically progresses through quiz prompts

#### Student Mastery Graphic
- Three progressive blob states:
  - "Not yet solid"
  - "Getting there"
  - "Confident"
- Visual feedback based on quiz performance
- Smooth animations and transitions

### Shared Features

#### Week Timeline
- Horizontal scrolling pills (Week 1-7)
- Current week emphasized
- Past weeks accessible, future weeks disabled
- Clicking changes content for both views

#### Theme Toggle
- Light mode (default): Bright white background, subtle colors
- Dark mode: Rich dark grays with enhanced glows
- Smooth transitions between modes
- Respects system preferences

## Mock Data

The application includes 7 weeks of mock data:
- **Weeks 1-4**: Full content (recordings, slides, analytics, quizzes)
- **Weeks 5-7**: Future weeks (empty state)

Each week contains:
- Title, date, and content files
- Analytics data (questions, participation, themes)
- Suggested resources
- Student quiz prompts with expected keywords
- Review resources linked to specific content

## Quiz Logic

The quiz uses a simple keyword-based evaluation:

1. **High Score (3/3)**: 60%+ keywords matched, 50+ characters
   - Feedback: "Excellent! You've captured the key aspects..."
   - Status: Confident

2. **Medium Score (2/3)**: 30-60% keywords matched, 30+ characters
   - Feedback: "You're on the right track, but missing..."
   - Status: Getting there

3. **Low Score (1/3)**: <30% keywords or short answer
   - Feedback: "This needs more detail. Review the materials..."
   - Status: Not solid

Students receive specific resources to review based on their performance.

## Customization

### Changing the Product Name
Edit `src/components/Header.tsx` and change "Class Echo" to your preferred name.

### Modifying Week Data
Edit `src/data/mockData.ts` to add, remove, or modify week content.

### Adjusting Colors
Edit `tailwind.config.js` to customize the color palette.

### Blob Gradients
Edit `src/index.css` to modify the blob gradient styles (`.blob-gradient-1`, `.blob-gradient-2`, `.blob-gradient-3`).

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

Potential areas for expansion:
- Real backend integration
- Actual AI/LLM integration (OpenAI, Anthropic, etc.)
- Audio playback with timestamped navigation
- PDF viewer for slides
- Advanced analytics and visualizations
- Export functionality for data
- Multi-class support
- Collaboration features

## License

This is a prototype for demonstration and usability testing purposes.

## Credits

Built with React, TypeScript, Vite, and Tailwind CSS.
