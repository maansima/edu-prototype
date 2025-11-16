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
    <div className="space-y-6">
      {/* Upload & Context Section */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 dark:bg-slate-900 dark:border-slate-700 transition-colors duration-300">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">
          Upload & Context
        </h3>
        
        <div className="space-y-4">
          {/* Audio Recording */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Audio Recording
            </label>
            {uploadedRecording ? (
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
                    {uploadedRecording.filename}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Duration: {uploadedRecording.duration}
                  </p>
                </div>
                <label className="cursor-pointer text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
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
              <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl cursor-pointer hover:border-slate-400 dark:hover:border-slate-500 transition-colors">
                <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
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
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Slides
            </label>
            {uploadedSlides ? (
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
                    {uploadedSlides.filename}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {uploadedSlides.pageCount} pages
                  </p>
                </div>
                <label className="cursor-pointer text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
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
              <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl cursor-pointer hover:border-slate-400 dark:hover:border-slate-500 transition-colors">
                <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
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
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Readings
            </label>
            <div className="space-y-2">
              {readings.map((reading) => (
                <div
                  key={reading.id}
                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
                      {reading.title}
                    </p>
                    <a
                      href={reading.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      {reading.url}
                    </a>
                  </div>
                  <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full">
                    {reading.type}
                  </span>
                </div>
              ))}
              <button
                onClick={handleAddReading}
                className="w-full p-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-sm text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
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
