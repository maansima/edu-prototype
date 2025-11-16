import React from 'react';
import type { Week } from '../types';

interface WeekSummaryCardProps {
  week: Week;
}

export const WeekSummaryCard: React.FC<WeekSummaryCardProps> = ({ week }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'in-progress':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Quiz Completed';
      case 'in-progress':
        return 'Quiz In Progress';
      default:
        return 'Quiz Not Started';
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 md:p-6 space-y-3 dark:bg-slate-900 dark:border-slate-700 transition-colors duration-300">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
          Week Summary
        </h3>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
            week.studentProgress.quizStatus
          )}`}
        >
          {getStatusText(week.studentProgress.quizStatus)}
        </span>
      </div>

      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
        {week.studentSummary}
      </p>

      {week.keyConcepts.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">
            Key concepts
          </h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-700 dark:text-slate-300">
            {week.keyConcepts.map((concept, index) => (
              <li key={index}>{concept}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
