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
    <div className="space-y-6">
      {/* Week Summary */}
      <WeekSummaryCard week={week} />

      {/* Quiz Interface */}
      {week.quizPrompts.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-8 text-center dark:bg-slate-900 dark:border-slate-700 transition-colors duration-300">
          <p className="text-slate-500 dark:text-slate-400">
            Quiz content will be available after the lecture.
          </p>
        </div>
      )}
    </div>
  );
};
