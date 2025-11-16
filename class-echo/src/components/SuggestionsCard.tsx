import React from 'react';
import type { SuggestedResource } from '../types';
import { Check, Plus } from './Icons';

interface SuggestionsCardProps {
  suggestions: SuggestedResource[];
  onToggleSuggestion: (id: string) => void;
}

export const SuggestionsCard: React.FC<SuggestionsCardProps> = ({
  suggestions,
  onToggleSuggestion,
}) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'podcast':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'case':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'video':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Keep your class fresh
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Suggested resources to enhance next week's content
      </p>

      {suggestions.length > 0 ? (
        <div className="space-y-4">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                      {suggestion.title}
                    </h4>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${getTypeColor(
                        suggestion.type
                      )}`}
                    >
                      {suggestion.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {suggestion.description}
                  </p>
                </div>
                <button
                  onClick={() => onToggleSuggestion(suggestion.id)}
                  className={`ml-4 flex-shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    suggestion.addedToPlan
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {suggestion.addedToPlan ? (
                    <div className="flex items-center space-x-1">
                      <Check className="w-4 h-4" />
                      <span>Added</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1">
                      <Plus className="w-4 h-4" />
                      <span>Add to plan</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
          No suggestions available yet
        </p>
      )}
    </div>
  );
};
