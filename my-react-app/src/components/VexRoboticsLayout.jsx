import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VexRoboticsLayout = () => {
  const [selectedSeason, setSelectedSeason] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const navigate = useNavigate();

  // Sample data - replace with your actual seasons and events
  const seasons = ['2023-2024', '2022-2023', '2021-2022'];
  const events = [
    'VEX Robotics World Championship',
    'Signature Event',
    'Regional Championship',
    'Tournament',
    'League Event'
  ];

  const handleNextPage = () => {
    navigate('/next-page');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex items-center">
          <h1 className="text-xl font-bold text-gray-800">VEX Robotics DBMS</h1>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto mt-8 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Season Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Select Season
            </label>
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Choose a season</option>
              {seasons.map((season) => (
                <option key={season} value={season}>
                  {season}
                </option>
              ))}
            </select>
          </div>

          {/* Event Selection - Only shown if season is selected */}
          {selectedSeason && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Select Event
              </label>
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Choose an event</option>
                {events.map((event) => (
                  <option key={event} value={event}>
                    {event}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Next Page Button */}
          {selectedSeason && selectedEvent && (
            <div className="flex justify-end mt-6">
              <button
                onClick={handleNextPage}
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Next
                <svg
                  className="ml-2 h-5 w-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default VexRoboticsLayout;