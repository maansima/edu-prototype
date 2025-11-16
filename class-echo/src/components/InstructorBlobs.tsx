import React from 'react';
import type { Week } from '../types';

interface InstructorBlobsProps {
  week: Week;
}

export const InstructorBlobs: React.FC<InstructorBlobsProps> = ({ week }) => {
  // Calculate blob intensities based on week data
  const clarityScore = week.analytics.totalQuestions > 10 ? 3 : week.analytics.totalQuestions > 5 ? 2 : 1;
  const engagementScore = week.analytics.participationRate > 75 ? 3 : week.analytics.participationRate > 50 ? 2 : 1;
  const continuityScore = week.id > 3 ? 3 : week.id > 1 ? 2 : 1; // Simple mock

  const getBlobOpacity = (score: number) => {
    switch (score) {
      case 3:
        return 'opacity-100 scale-110';
      case 2:
        return 'opacity-75 scale-100';
      default:
        return 'opacity-50 scale-90';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Week Quality Indicators
      </h3>
      
      <div className="flex items-center justify-around py-8">
        {/* Clarity Blob */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-24 h-24">
            <div
              className={`absolute inset-0 blob-gradient-1 rounded-full blur-xl transition-all duration-500 animate-pulse-slow ${getBlobOpacity(
                clarityScore
              )}`}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-900 dark:text-white z-10">
                {clarityScore}
              </span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-900 dark:text-white">Clarity</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {clarityScore === 3 ? 'Excellent' : clarityScore === 2 ? 'Good' : 'Needs work'}
            </p>
          </div>
        </div>

        {/* Engagement Blob */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-24 h-24">
            <div
              className={`absolute inset-0 blob-gradient-2 rounded-full blur-xl transition-all duration-500 animate-pulse-slow ${getBlobOpacity(
                engagementScore
              )}`}
              style={{ animationDelay: '0.5s' }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-900 dark:text-white z-10">
                {engagementScore}
              </span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-900 dark:text-white">Engagement</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {engagementScore === 3 ? 'High' : engagementScore === 2 ? 'Moderate' : 'Low'}
            </p>
          </div>
        </div>

        {/* Continuity Blob */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-24 h-24">
            <div
              className={`absolute inset-0 blob-gradient-3 rounded-full blur-xl transition-all duration-500 animate-pulse-slow ${getBlobOpacity(
                continuityScore
              )}`}
              style={{ animationDelay: '1s' }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-900 dark:text-white z-10">
                {continuityScore}
              </span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-900 dark:text-white">Continuity</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {continuityScore === 3 ? 'Strong' : continuityScore === 2 ? 'Building' : 'Starting'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
