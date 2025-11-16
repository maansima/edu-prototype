import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { WeekTimeline } from './components/WeekTimeline';
import { InstructorView } from './components/InstructorView';
import { StudentView } from './components/StudentView';
import { mockWeeks } from './data/mockData';
import type { Week, ViewMode, ChatMessage } from './types';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('instructor');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [currentWeek, setCurrentWeek] = useState(1);
  const [weeks, setWeeks] = useState<Week[]>(mockWeeks);
  const [chatMessages, setChatMessages] = useState<Record<number, ChatMessage[]>>({});

  // Initialize chat with first prompt for each week
  useEffect(() => {
    const initialMessages: Record<number, ChatMessage[]> = {};
    weeks.forEach((week) => {
      if (week.quizPrompts.length > 0 && week.studentProgress.quizStatus !== 'completed') {
        const currentPromptIndex = week.studentProgress.currentPromptIndex;
        if (currentPromptIndex < week.quizPrompts.length) {
          const prompt = week.quizPrompts[currentPromptIndex];
          initialMessages[week.id] = [
            {
              id: `msg-${week.id}-0`,
              sender: 'llm',
              content: `In your own words, explain what we covered about "${prompt.concept}" in Week ${prompt.relatedWeekId}.`,
              timestamp: new Date().toISOString(),
            },
          ];
        }
      }
    });
    setChatMessages(initialMessages);
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleWeekUpdate = (updatedWeek: Week) => {
    setWeeks(weeks.map((w) => (w.id === updatedWeek.id ? updatedWeek : w)));
  };

  const handleSendMessage = (message: string) => {
    const week = weeks.find((w) => w.id === currentWeek);
    if (!week || week.quizPrompts.length === 0) return;

    const currentPromptIndex = week.studentProgress.currentPromptIndex;
    if (currentPromptIndex >= week.quizPrompts.length) return;

    const currentPrompt = week.quizPrompts[currentPromptIndex];
    const weekMessages = chatMessages[currentWeek] || [];

    // Add student message
    const studentMessage: ChatMessage = {
      id: `msg-${currentWeek}-${weekMessages.length}`,
      sender: 'student',
      content: message,
      timestamp: new Date().toISOString(),
    };

    // Evaluate answer (simple keyword-based logic)
    const answer = message.toLowerCase();
    const keywords = currentPrompt.expectedKeywords.map((k) => k.toLowerCase());
    const matchedKeywords = keywords.filter((keyword) => answer.includes(keyword));
    const matchRatio = matchedKeywords.length / keywords.length;

    let feedback = '';
    let understandingLevel: 1 | 2 | 3 = 1;
    let reviewResources = currentPrompt.reviewResources;
    let newMasteryLevel = week.studentProgress.masteryLevel;

    if (matchRatio >= 0.6 && answer.length > 50) {
      // Good answer
      understandingLevel = 3;
      feedback = `Excellent! You've captured the key aspects of ${currentPrompt.concept}. ${
        matchedKeywords.length === keywords.length
          ? "You mentioned all the important concepts."
          : "Your explanation shows solid understanding."
      }`;
      newMasteryLevel = 'confident';
      reviewResources = [];
    } else if (matchRatio >= 0.3 && answer.length > 30) {
      // Partial answer
      understandingLevel = 2;
      const missingKeywords = keywords.filter((k) => !answer.includes(k));
      feedback = `You're on the right track, but you're missing some key aspects. Consider how ${currentPrompt.concept} relates to ${missingKeywords[0] || 'the core concepts'}. Review the materials below to strengthen your understanding.`;
      newMasteryLevel = 'getting-there';
    } else {
      // Weak answer
      understandingLevel = 1;
      feedback = `This explanation needs more detail. It seems like you might be confusing this with a concept from a different week, or missing the core idea. Please review the materials below and try again with a more complete explanation.`;
      newMasteryLevel = 'not-solid';
    }

    // Add LLM response
    const llmMessage: ChatMessage = {
      id: `msg-${currentWeek}-${weekMessages.length + 1}`,
      sender: 'llm',
      content: feedback,
      timestamp: new Date().toISOString(),
      understandingLevel,
      reviewResources: reviewResources.length > 0 ? reviewResources : undefined,
    };

    const newMessages = [...weekMessages, studentMessage, llmMessage];
    setChatMessages({ ...chatMessages, [currentWeek]: newMessages });

    // Update week progress
    const newAnswer = {
      promptId: currentPrompt.id,
      answer: message,
      feedback,
      understandingLevel,
      timestamp: new Date().toISOString(),
    };

    const updatedAnswers = [...week.studentProgress.answers, newAnswer];
    const nextPromptIndex = currentPromptIndex + 1;
    const isCompleted = nextPromptIndex >= week.quizPrompts.length;

    const updatedWeek: Week = {
      ...week,
      studentProgress: {
        ...week.studentProgress,
        answers: updatedAnswers,
        currentPromptIndex: nextPromptIndex,
        quizStatus: isCompleted ? 'completed' : 'in-progress',
        masteryLevel: newMasteryLevel,
      },
    };

    handleWeekUpdate(updatedWeek);

    // Add next question if not completed
    if (!isCompleted) {
      setTimeout(() => {
        const nextPrompt = week.quizPrompts[nextPromptIndex];
        const nextQuestionMessage: ChatMessage = {
          id: `msg-${currentWeek}-${newMessages.length + 2}`,
          sender: 'llm',
          content: `Great! Now, let's move on. In your own words, explain "${nextPrompt.concept}" from Week ${nextPrompt.relatedWeekId}.`,
          timestamp: new Date().toISOString(),
        };
        setChatMessages({
          ...chatMessages,
          [currentWeek]: [...newMessages, nextQuestionMessage],
        });
      }, 1000);
    }
  };

  const currentWeekData = weeks.find((w) => w.id === currentWeek) || weeks[0];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        theme={theme}
        onThemeToggle={handleThemeToggle}
      />
      
      <WeekTimeline
        weeks={weeks}
        currentWeek={currentWeek}
        onWeekChange={setCurrentWeek}
      />

      {viewMode === 'instructor' ? (
        <InstructorView week={currentWeekData} onWeekUpdate={handleWeekUpdate} />
      ) : (
        <StudentView
          week={currentWeekData}
          chatMessages={chatMessages[currentWeek] || []}
          onSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
}

export default App;
