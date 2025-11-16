# Phygital Classroom AI Prototype

This repository contains **Class Echo**, a responsive web prototype for a phygital classroom product that helps instructors and students use AI in a thoughtful, instructor-supporting way.

## Project Overview

Class Echo is a digital companion to a physical recording device in classrooms. It provides intelligent analytics for instructors and personalized learning experiences for students.

### Key Features

**For Instructors:**
- Upload and manage weekly lecture recordings, slides, and readings
- View comprehensive learning analytics (participation, engagement, key themes)
- Receive AI-suggested resources to keep course content fresh
- Monitor class quality through intuitive blob visualizations

**For Students:**
- Access personalized quizzes that test understanding through explanation
- Interact with an AI tutor that only knows course material covered so far
- Get specific feedback with pointers to review materials
- Track mastery progression through visual indicators

### Design Aesthetic

- **Hi-tech but warm and approachable**
- Apple Siri blob-inspired gradients
- Minimal, calm interface
- Smooth animations and transitions
- Full light/dark mode support

## Technology Stack

- **React** with **TypeScript**
- **Vite** for fast development
- **Tailwind CSS** for styling
- All data mocked in frontend (no backend required)

## Getting Started

Navigate to the project directory and follow the instructions:

```bash
cd class-echo
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

## Project Structure

```
class-echo/
├── src/
│   ├── components/       # React components
│   ├── types/           # TypeScript definitions
│   ├── data/            # Mock data for 7 weeks
│   ├── App.tsx          # Main app with state management
│   └── index.css        # Tailwind + custom styles
├── README.md            # Detailed documentation
└── package.json
```

## Documentation

See the complete documentation in [`class-echo/README.md`](./class-echo/README.md) for:
- Detailed feature descriptions
- Quiz logic explanation
- Customization guide
- Mock data structure
- Future enhancement ideas

## Use Cases

This prototype is optimized for:
- Demonstrations to stakeholders
- Usability testing with real instructors and students
- Product validation and user research
- Design iteration and feedback collection

## License

Prototype for demonstration and testing purposes.

---

**Built with React, TypeScript, Vite, and Tailwind CSS**
