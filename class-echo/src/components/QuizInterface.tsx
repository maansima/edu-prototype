import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage, ReviewResource } from '../types';
import { Send } from './Icons';

interface QuizInterfaceProps {
  chatMessages: ChatMessage[];
  onSendMessage: (message: string) => void;
}

export const QuizInterface: React.FC<QuizInterfaceProps> = ({
  chatMessages,
  onSendMessage,
}) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleResourceClick = (resource: ReviewResource) => {
    // In a real app, this would navigate to or highlight the resource
    alert(`Opening: ${resource.title} from Week ${resource.weekId}`);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col gap-4 p-4 md:p-6 dark:bg-slate-900 dark:border-slate-700 transition-colors duration-300 h-[600px]">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
          Explain it back
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          This AI tutor only uses material from your course up through the current week.
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 max-h-80">
        {chatMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-slate-500 dark:text-slate-400 text-sm text-center">
              The AI tutor will ask you to explain concepts.<br />
              Answer in your own words to demonstrate understanding.
            </p>
          </div>
        ) : (
          chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'student' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                  message.sender === 'student'
                    ? 'self-end bg-indigo-600 text-white'
                    : 'self-start bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                
                {/* Understanding level indicator */}
                {message.understandingLevel && message.sender === 'llm' && (
                  <div className="mt-3 pt-3 border-t border-slate-300 dark:border-slate-600">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-medium">Understanding:</span>
                      <div className="flex space-x-1">
                        {[1, 2, 3].map((level) => (
                          <div
                            key={level}
                            className={`w-6 h-1.5 rounded-full ${
                              level <= message.understandingLevel!
                                ? 'bg-emerald-500'
                                : 'bg-slate-300 dark:bg-slate-600'
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Review resources */}
                {message.reviewResources && message.reviewResources.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-300 dark:border-slate-600 space-y-2">
                    <p className="text-xs font-medium">Review materials:</p>
                    <div className="flex flex-wrap gap-2">
                      {message.reviewResources.map((resource, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleResourceClick(resource)}
                          className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 cursor-pointer hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 transition-colors"
                        >
                          Week {resource.weekId}: {resource.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your explanation..."
          className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-50 dark:placeholder-slate-500"
        />
        <button
          type="submit"
          disabled={!inputValue.trim()}
          className="rounded-xl px-4 py-2 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};
