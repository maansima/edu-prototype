# Class Echo - Quick Start Guide

## Prerequisites

**Node.js Version:** This project requires Node.js 14.0.0 or higher.

Check your Node.js version:
```bash
node --version
```

If you need to upgrade Node.js:
- **Using nvm (recommended)**: `nvm install 22` or `nvm use` (reads .nvmrc)
- **Direct download**: [nodejs.org](https://nodejs.org/)

## Installation & Running

```bash
# Navigate to project
cd class-echo

# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

## Navigation Guide

### Header
- **Class Echo** logo (top left)
- **View tabs**: Switch between Instructor and Student views
- **Theme toggle**: Light/dark mode (moon/sun icon)

### Week Timeline
- Horizontal pills showing Week 1-7
- Click any past or current week to view its content
- Future weeks (5-7) are disabled until their date arrives

---

## Instructor View

### 1. Upload & Context Section
- **Audio Recording**: Click to upload lecture audio (mock)
  - Displays: filename, duration
  - Can replace existing files
- **Slides**: Upload PDF or PowerPoint (mock)
  - Displays: filename, page count
- **Readings**: Add articles, books, papers with URLs
  - Click "+ Add reading" to enter title and URL

### 2. Analytics Dashboard (3 cards)

**Engagement Overview**
- Total questions asked
- Participation rate (% of students who spoke)
- Attendance (X/Y students present)

**Key Themes / Takeaways**
- Bullet list of main topics discussed
- Auto-generated from lecture content

**Participation Details**
- Individual student metrics
- Questions asked and times spoken
- Helps identify quiet students

### 3. Suggestions for Next Week
- AI-curated resources to enhance content
- Types: articles, podcasts, cases, videos
- Click "Add to plan" to mark for inclusion
- Button changes to green checkmark when added

### 4. Week Quality Indicators (Blobs)
Three animated gradient blobs showing:
- **Clarity**: How clear the lecture was (questions as proxy)
- **Engagement**: Student participation level
- **Continuity**: Connection with previous weeks

Scores range 1-3, with size and opacity reflecting quality.

---

## Student View

### 1. Week Summary Card
- Natural language summary of the lecture
- Key concepts as bullet points
- Quiz status indicator (Not Started / In Progress / Completed)

### 2. "Explain It Back" Quiz Interface

**How it works:**
1. AI asks you to explain a concept in your own words
2. Type your explanation (aim for 50+ characters, thoughtful response)
3. Submit your answer
4. Receive instant feedback with:
   - What you did well
   - What you're missing
   - Understanding level (1-3 bars)
   - Specific materials to review (clickable chips)
5. Continue to next question

**Tips for good answers:**
- Use your own words, don't just repeat definitions
- Aim for 2-3 sentences minimum
- Include key concepts and how they relate
- Reference examples from the lecture when relevant

**Review Resources:**
- Click any suggested resource chip
- Shows which week and what content to review
- Links to specific slides, readings, or lecture clips

**Quiz Logic:**
- **High score (3/3)**: 60%+ keywords, 50+ chars → "Confident"
- **Medium score (2/3)**: 30-60% keywords, 30+ chars → "Getting there"
- **Low score (1/3)**: Few keywords or too short → "Not solid"

### 3. Mastery Level (Blobs)
Three progressive states with animated glowing blobs:
- **Not yet solid**: Keep working on concepts (blue/cyan)
- **Getting there**: Good progress, refine understanding (pink/orange)
- **Confident**: Great job, solid understanding (green/blue)

Active level has pulsing indicator and ring highlight.

---

## Exploring the Prototype

### Try These Flows:

**Instructor Experience:**
1. Switch to Instructor view
2. Navigate to Week 1
3. Check analytics - high engagement (78% participation)
4. Browse suggested resources
5. Click "Add to plan" on a few suggestions
6. Navigate to Week 2 - see different metrics
7. Try Week 5 (future) - see empty state

**Student Experience:**
1. Switch to Student view
2. Navigate to Week 1
3. Read the summary and key concepts
4. Start the quiz by typing an explanation
5. Try both good and weak answers to see different feedback:
   - Good: "Feedback loops are circular connections where output feeds back in. Reinforcing loops amplify changes while balancing loops maintain stability."
   - Weak: "It's a loop."
6. Click on review resource chips
7. Check mastery level changes
8. Navigate to Week 2 - different quiz prompts

**Theme Toggle:**
1. Click moon/sun icon in header
2. See smooth transition to dark mode
3. Notice blob gradients become richer
4. All text remains readable

---

## Mock Data Overview

**Week 1**: Introduction to Systems Thinking
- Full content, completed quiz, high engagement

**Week 2**: Organizational Learning
- Full content, quiz in progress, very high engagement

**Week 3**: Design Thinking
- Full content, quiz not started, highest engagement

**Week 4**: Data-Driven Decision Making
- Full content, quiz not started, good engagement

**Weeks 5-7**: Future weeks
- Empty states, disabled until date arrives

---

## Customization Quick Tips

### Change Product Name
Edit `src/components/Header.tsx`, line with "Class Echo"

### Modify Week Content
Edit `src/data/mockData.ts` - update any week's:
- Title, date, content
- Analytics numbers
- Quiz prompts and keywords
- Suggested resources

### Adjust Colors
Edit `tailwind.config.js` in the `colors` section

### Change Blob Gradients
Edit `src/index.css` - find `.blob-gradient-1`, `-2`, `-3`

---

## Technical Notes

- **No backend**: All data in `src/data/mockData.ts`
- **No API calls**: Everything runs client-side
- **No persistence**: Refresh resets all state
- **No authentication**: Open access to both views

This is intentional for prototype/demo purposes.

---

## Common Questions

**Q: Can I add more weeks?**
A: Yes! Add objects to the `mockWeeks` array in `src/data/mockData.ts`

**Q: Can students take the same quiz twice?**
A: Currently no - once completed, it stays completed. Refresh to reset.

**Q: How does the AI feedback work?**
A: Simple keyword matching in `src/App.tsx` - see `handleSendMessage()` function

**Q: Can I deploy this?**
A: Yes! Run `npm run build` then deploy the `dist` folder to any static host

**Q: Where's the real AI?**
A: This is a frontend prototype. In production, you'd replace the keyword logic with actual LLM API calls (OpenAI, Anthropic, etc.)

---

## Need Help?

1. Check the main [README.md](./README.md) for detailed documentation
2. Review the code comments in `src/App.tsx`
3. Explore component files in `src/components/`
4. All TypeScript types are documented in `src/types/index.ts`

**For development issues:**
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npm run build

# Restart dev server
npm run dev
```

---

Enjoy exploring Class Echo! 🎓✨
