import React from 'react';
import type { Week, ChatMessage } from '../types';
import { WeekSummaryCard } from './WeekSummaryCard';
import { QuizInterface } from './QuizInterface';
import { StudentBlobs } from './StudentBlobs';

interface StudentViewProps {
  week: Week;
  chatMessages: ChatMessage[];
  onSendMessage: (message: string) => void;
}

export const StudentView: React.FC<StudentViewProps> = ({
  week,
  chatMessages,
  onSendMessage,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Week Summary */}
      <WeekSummaryCard week={week} />

      {/* Quiz Interface */}
      {week.quizPrompts.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <QuizInterface
              chatMessages={chatMessages}
              onSendMessage={onSendMessage}
            />
          </div>
          <div className="lg:col-span-1">
            <StudentBlobs week={week} />
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center transition-colors duration-300">
          <p className="text-gray-500 dark:text-gray-400">
            Quiz content will be available after the lecture.
          </p>
        </div>
      )}
    </div>
  );
};
