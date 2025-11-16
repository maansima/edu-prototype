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
    <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {weeks.map((week) => {
            const status = getWeekStatus(week);
            const isCurrent = week.id === currentWeek;
            
            return (
              <button
                key={week.id}
                onClick={() => onWeekChange(week.id)}
                disabled={status === 'future'}
                className={`
                  flex-shrink-0 px-3 py-1.5 rounded-full text-sm border cursor-pointer transition-all duration-200
                  ${isCurrent
                    ? 'bg-slate-900 text-white border-slate-900 dark:bg-slate-50 dark:text-slate-900 dark:border-slate-50'
                    : status === 'past'
                    ? 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800'
                    : 'bg-slate-100 text-slate-400 border-slate-100 cursor-not-allowed dark:bg-slate-900 dark:text-slate-600 dark:border-slate-800'
                  }
                `}
              >
                Week {week.id}
              </button>
            );
          })}
        </div>
        
        {/* Week title and date */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            {weeks.find(w => w.id === currentWeek)?.title}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
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
