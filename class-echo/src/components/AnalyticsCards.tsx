import React from 'react';
import type { Analytics } from '../types';

interface AnalyticsCardsProps {
  analytics: Analytics;
}

export const AnalyticsCards: React.FC<AnalyticsCardsProps> = ({ analytics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Engagement Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Engagement Overview
        </h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Questions</p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {analytics.totalQuestions}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Participation Rate</p>
            <div className="flex items-end space-x-2">
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {analytics.participationRate}%
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                of students spoke
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Attendance</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {analytics.attendance}/{analytics.totalStudents}
            </p>
          </div>
        </div>
      </div>

      {/* Key Themes */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Key Themes / Takeaways
        </h3>
        <ul className="space-y-3">
          {analytics.keyThemes.length > 0 ? (
            analytics.keyThemes.map((theme, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">{theme}</span>
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
              No lecture content yet
            </p>
          )}
        </ul>
      </div>

      {/* Participation Details */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Participation Details
        </h3>
        <div className="space-y-3">
          {analytics.participationDetails.length > 0 ? (
            analytics.participationDetails.map((detail, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {detail.studentName}
                </span>
                <div className="flex items-center space-x-3 text-xs text-gray-600 dark:text-gray-400">
                  <span>{detail.questionsAsked} Q</span>
                  <span>{detail.timesSpoken} spoke</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
              No participation data yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
