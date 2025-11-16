import React from 'react';
import type { Week } from '../types';

interface StudentBlobsProps {
  week: Week;
}

export const StudentBlobs: React.FC<StudentBlobsProps> = ({ week }) => {
  const masteryLevel = week.studentProgress.masteryLevel;

  const getBlobState = (level: 'not-solid' | 'getting-there' | 'confident', current: string) => {
    const levels = ['not-solid', 'getting-there', 'confident'];
    const currentIndex = levels.indexOf(current);
    const levelIndex = levels.indexOf(level);

    if (levelIndex < currentIndex) {
      return 'opacity-100 scale-100';
    } else if (levelIndex === currentIndex) {
      return 'opacity-100 scale-125 ring-4 ring-blue-300 dark:ring-blue-600';
    } else {
      return 'opacity-30 scale-90';
    }
  };

  const getLevelGradient = (level: 'not-solid' | 'getting-there' | 'confident') => {
    switch (level) {
      case 'not-solid':
        return 'blob-gradient-1';
      case 'getting-there':
        return 'blob-gradient-2';
      case 'confident':
        return 'blob-gradient-3';
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 dark:bg-slate-900 dark:border-slate-700 transition-colors duration-300">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-6">
        Your Mastery Level
      </h3>

      <div className="space-y-8 py-4">
        {/* Not Yet Solid */}
        <div className="flex items-center space-x-4">
          <div className="relative w-20 h-20 flex-shrink-0">
            <div
              className={`absolute inset-0 ${getLevelGradient(
                'not-solid'
              )} rounded-full blur-lg transition-all duration-500 ${getBlobState(
                'not-solid',
                masteryLevel
              )}`}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              {masteryLevel === 'not-solid' && (
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
              )}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              Not yet solid
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Keep working on the concepts
            </p>
          </div>
        </div>

        {/* Getting There */}
        <div className="flex items-center space-x-4">
          <div className="relative w-20 h-20 flex-shrink-0">
            <div
              className={`absolute inset-0 ${getLevelGradient(
                'getting-there'
              )} rounded-full blur-lg transition-all duration-500 ${getBlobState(
                'getting-there',
                masteryLevel
              )}`}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              {masteryLevel === 'getting-there' && (
                <div className="w-3 h-3 bg-pink-500 rounded-full animate-ping"></div>
              )}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              Getting there
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Good progress, refine your understanding
            </p>
          </div>
        </div>

        {/* Confident */}
        <div className="flex items-center space-x-4">
          <div className="relative w-20 h-20 flex-shrink-0">
            <div
              className={`absolute inset-0 ${getLevelGradient(
                'confident'
              )} rounded-full blur-lg transition-all duration-500 ${getBlobState(
                'confident',
                masteryLevel
              )}`}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              {masteryLevel === 'confident' && (
                <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
              )}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              Confident
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Great job! You understand this well
            </p>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      {week.studentProgress.answers.length > 0 && (
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
            {week.studentProgress.answers.length} of {week.quizPrompts.length} questions answered
          </p>
        </div>
      )}
    </div>
  );
};
