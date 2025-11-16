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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300 flex flex-col h-[600px]">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Explain it back
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          This AI tutor only uses material from your course (recordings, slides, readings) up through the current week.
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
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
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.sender === 'student'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                
                {/* Understanding level indicator */}
                {message.understandingLevel && message.sender === 'llm' && (
                  <div className="mt-3 pt-3 border-t border-gray-300 dark:border-gray-600">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-medium">Understanding:</span>
                      <div className="flex space-x-1">
                        {[1, 2, 3].map((level) => (
                          <div
                            key={level}
                            className={`w-6 h-1.5 rounded-full ${
                              level <= message.understandingLevel!
                                ? 'bg-green-500'
                                : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Review resources */}
                {message.reviewResources && message.reviewResources.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-300 dark:border-gray-600 space-y-2">
                    <p className="text-xs font-medium">Review these materials:</p>
                    {message.reviewResources.map((resource, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleResourceClick(resource)}
                        className="block w-full text-left p-2 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                      >
                        <div className="flex items-start space-x-2">
                          <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded flex-shrink-0">
                            Week {resource.weekId}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-gray-900 dark:text-white">
                              {resource.title}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                              {resource.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your explanation..."
            className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};
