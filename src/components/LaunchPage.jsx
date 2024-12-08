import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { VexRoboticsLayout } from './VexRoboticsLayout';

export const LaunchPage = () => {
  const [seasons, setSeasons] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeasons = async () => {
      const response = await fetch('//localhost:5174/season');
      const data = await response.json();
      setSeasons(data.data);
    };

    const fetchEvents = async () => {
      const response = await fetch('//localhost:5174/event');
      const data = await response.json();
      setEvents(data.data);
    };

    Promise.all([fetchSeasons(), fetchEvents()]).then(() => {
      setLoading(false);
    });
  }, []);

  const handleNextPage = () => {
    navigate('/manage-event');
  };

  return (
    <VexRoboticsLayout>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
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
                <option key={season.season_year} value={season.season_year}>
                  {season.season_name}
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
                {events
                  .filter((event) => event.event_season_year === parseInt(selectedSeason))
                  .map((event) => (
                    <option key={event.event_id} value={event.event_id}>
                      {event.event_name}
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
      )}
    </VexRoboticsLayout>
  );
};