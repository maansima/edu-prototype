import React, { useState } from 'react';
import type { Week } from '../types';
import { Upload } from './Icons';
import { AnalyticsCards } from './AnalyticsCards';
import { SuggestionsCard } from './SuggestionsCard';
import { InstructorBlobs } from './InstructorBlobs';

interface InstructorViewProps {
  week: Week;
  onWeekUpdate: (week: Week) => void;
}

export const InstructorView: React.FC<InstructorViewProps> = ({
  week,
  onWeekUpdate,
}) => {
  const [uploadedRecording, setUploadedRecording] = useState(week.recording);
  const [uploadedSlides, setUploadedSlides] = useState(week.slides);
  const [readings, setReadings] = useState(week.readings);

  const handleRecordingUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newRecording = {
        filename: file.name,
        duration: '1:23:45', // Mock duration
        uploadedAt: new Date().toISOString(),
      };
      setUploadedRecording(newRecording);
      onWeekUpdate({ ...week, recording: newRecording });
    }
  };

  const handleSlidesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newSlides = {
        filename: file.name,
        pageCount: 28, // Mock page count
        uploadedAt: new Date().toISOString(),
      };
      setUploadedSlides(newSlides);
      onWeekUpdate({ ...week, slides: newSlides });
    }
  };

  const handleAddReading = () => {
    const title = prompt('Enter reading title:');
    const url = prompt('Enter reading URL:');
    if (title && url) {
      const newReading = {
        id: `r${week.id}-${readings.length + 1}`,
        title,
        url,
        type: 'article' as const,
      };
      const newReadings = [...readings, newReading];
      setReadings(newReadings);
      onWeekUpdate({ ...week, readings: newReadings });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Upload & Context Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Upload & Context
        </h3>
        
        <div className="space-y-4">
          {/* Audio Recording */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Audio Recording
            </label>
            {uploadedRecording ? (
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {uploadedRecording.filename}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Duration: {uploadedRecording.duration}
                  </p>
                </div>
                <label className="cursor-pointer text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                  Replace
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleRecordingUpload}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Upload className="w-5 h-5" />
                  <span className="text-sm">Upload audio recording</span>
                </div>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleRecordingUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Slides */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Slides
            </label>
            {uploadedSlides ? (
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {uploadedSlides.filename}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {uploadedSlides.pageCount} pages
                  </p>
                </div>
                <label className="cursor-pointer text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300">
                  Replace
                  <input
                    type="file"
                    accept=".pdf,.ppt,.pptx"
                    onChange={handleSlidesUpload}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-green-500 dark:hover:border-green-400 transition-colors">
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Upload className="w-5 h-5" />
                  <span className="text-sm">Upload slides (PDF, PPT)</span>
                </div>
                <input
                  type="file"
                  accept=".pdf,.ppt,.pptx"
                  onChange={handleSlidesUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Readings */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Readings
            </label>
            <div className="space-y-2">
              {readings.map((reading) => (
                <div
                  key={reading.id}
                  className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {reading.title}
                    </p>
                    <a
                      href={reading.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      {reading.url}
                    </a>
                  </div>
                  <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded">
                    {reading.type}
                  </span>
                </div>
              ))}
              <button
                onClick={handleAddReading}
                className="w-full p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:border-purple-500 dark:hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                + Add reading
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Cards */}
      <AnalyticsCards analytics={week.analytics} />

      {/* Suggestions */}
      <SuggestionsCard
        suggestions={week.suggestedResources}
        onToggleSuggestion={(id) => {
          const updatedSuggestions = week.suggestedResources.map((s) =>
            s.id === id ? { ...s, addedToPlan: !s.addedToPlan } : s
          );
          onWeekUpdate({ ...week, suggestedResources: updatedSuggestions });
        }}
      />

      {/* Instructor Level Graphic */}
      <InstructorBlobs week={week} />
    </div>
  );
};
