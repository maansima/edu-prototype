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
        return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400';
      case 'podcast':
        return 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400';
      case 'case':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400';
      case 'video':
        return 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 dark:bg-slate-900 dark:border-slate-700 transition-colors duration-300">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">
        Suggestions for next week
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
        AI-curated resources to enhance your content
      </p>

      {suggestions.length > 0 ? (
        <div className="space-y-3">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 md:p-4 dark:bg-slate-800 dark:border-slate-700 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                    {suggestion.title}
                  </h4>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${getTypeColor(
                      suggestion.type
                    )}`}
                  >
                    {suggestion.type}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {suggestion.description}
                </p>
              </div>
              <button
                onClick={() => onToggleSuggestion(suggestion.id)}
                className={`flex-shrink-0 text-xs px-3 py-1 rounded-full font-medium transition-all duration-200 ${
                  suggestion.addedToPlan
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {suggestion.addedToPlan ? (
                  <div className="flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>Added</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <Plus className="w-3 h-3" />
                    <span>Add</span>
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500 dark:text-slate-400 italic">
          No suggestions available yet
        </p>
      )}
    </div>
  );
};
