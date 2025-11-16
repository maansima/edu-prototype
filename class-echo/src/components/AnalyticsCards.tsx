import React from 'react';
import type { Analytics } from '../types';

interface AnalyticsCardsProps {
  analytics: Analytics;
}

export const AnalyticsCards: React.FC<AnalyticsCardsProps> = ({ analytics }) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Engagement Overview */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 md:p-6 dark:bg-slate-900 dark:border-slate-700 transition-colors duration-300">
        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">
          Engagement Overview
        </h3>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Total Questions</p>
            <p className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
              {analytics.totalQuestions}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Participation Rate</p>
            <div className="flex items-end space-x-2">
              <p className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
                {analytics.participationRate}%
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                spoke
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Attendance</p>
            <p className="text-xl font-semibold text-slate-900 dark:text-slate-50">
              {analytics.attendance}/{analytics.totalStudents}
            </p>
          </div>
        </div>
      </div>

      {/* Key Themes */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 md:p-6 dark:bg-slate-900 dark:border-slate-700 transition-colors duration-300">
        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">
          Key Themes
        </h3>
        <ul className="space-y-3">
          {analytics.keyThemes.length > 0 ? (
            analytics.keyThemes.map((theme, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full mt-2"></span>
                <span className="text-sm text-slate-700 dark:text-slate-300">{theme}</span>
              </li>
            ))
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400 italic">
              No lecture content yet
            </p>
          )}
        </ul>
      </div>

      {/* Participation Details */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 md:p-6 dark:bg-slate-900 dark:border-slate-700 transition-colors duration-300">
        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">
          Participation Details
        </h3>
        <div className="space-y-2">
          {analytics.participationDetails.length > 0 ? (
            analytics.participationDetails.map((detail, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded-lg"
              >
                <span className="text-sm font-medium text-slate-900 dark:text-slate-50">
                  {detail.studentName}
                </span>
                <div className="flex items-center space-x-3 text-xs text-slate-600 dark:text-slate-400">
                  <span>{detail.questionsAsked} Q</span>
                  <span>{detail.timesSpoken} spoke</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400 italic">
              No participation data yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
