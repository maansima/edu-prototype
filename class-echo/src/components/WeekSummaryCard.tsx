import React from 'react';
import type { Week } from '../types';

interface WeekSummaryCardProps {
  week: Week;
}

export const WeekSummaryCard: React.FC<WeekSummaryCardProps> = ({ week }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400';
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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Week Summary
        </h3>
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(
            week.studentProgress.quizStatus
          )}`}
        >
          {getStatusText(week.studentProgress.quizStatus)}
        </span>
      </div>

      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
        {week.studentSummary}
      </p>

      {week.keyConcepts.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Key concepts this week
          </h4>
          <ul className="space-y-2">
            {week.keyConcepts.map((concept, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">{concept}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
