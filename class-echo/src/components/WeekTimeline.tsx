import React from 'react';
import type { Week } from '../types';

interface WeekTimelineProps {
  weeks: Week[];
  currentWeek: number;
  onWeekChange: (weekId: number) => void;
}

export const WeekTimeline: React.FC<WeekTimelineProps> = ({
  weeks,
  currentWeek,
  onWeekChange,
}) => {
  const getWeekStatus = (week: Week) => {
    const now = new Date();
    const weekDate = new Date(week.date);
    
    if (weekDate > now) return 'future';
    if (week.id === currentWeek) return 'current';
    return 'past';
  };

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {weeks.map((week) => {
            const status = getWeekStatus(week);
            const isCurrent = week.id === currentWeek;
            
            return (
              <button
                key={week.id}
                onClick={() => onWeekChange(week.id)}
                disabled={status === 'future'}
                className={`
                  flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${isCurrent
                    ? 'bg-blue-500 text-white shadow-lg scale-105'
                    : status === 'past'
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    : 'bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  }
                `}
              >
                Week {week.id}
              </button>
            );
          })}
        </div>
        
        {/* Week title and date */}
        <div className="mt-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {weeks.find(w => w.id === currentWeek)?.title}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {new Date(weeks.find(w => w.id === currentWeek)?.date || '').toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>
    </div>
  );
};
