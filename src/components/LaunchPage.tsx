import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { VexRoboticsLayout } from './VexRoboticsLayout';
import { VdbRes, VdbSeason, VdbEvent } from '../types';
import { selectedEventAtom } from '../store';
import { useAtom } from 'jotai';
import { useCachedFetch, useTripleImpactContributor } from '../hooks';



export const LaunchPage = () => {
  const [seasons, setSeasons] = useState<VdbSeason[]>([]);
  const [events, setEvents] = useState<VdbEvent[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<VdbSeason | null>(null);
  const [selectedEvent, setSelectedEvent] = useAtom(selectedEventAtom);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { tripleImpactContributor, loading: tripleImpactContributorLoading } = useTripleImpactContributor(selectedSeason);

  useEffect(() => {
    const fetchSeasons = async () => {
      const response = await fetch('//localhost:5174/season');
      const data: VdbRes<VdbSeason[]> = await response.json();
      setSeasons(data.data!);
    };

    const fetchEvents = async () => {
      const response = await fetch('//localhost:5174/event');
      const data: VdbRes<VdbEvent[]> = await response.json();
      setEvents(data.data!);
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
            <h3 className="text-lg font-medium text-gray-700 mb-3">Season</h3>
            <select
              value={selectedSeason?.season_year ?? ''}
              onChange={(e) => {
                const selectedSeasonYear = Number(e.target.value);
                const season = seasons.find((s) => s.season_year === selectedSeasonYear);
                setSelectedSeason(season ?? null);
              }}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={undefined}>Choose a season</option>
              {seasons.map((season) => (
                <option
                  key={season.season_year}
                  value={season.season_year}
                >
                  {season.season_name}
                </option>
              ))}
            </select>
          </div>
          
          {selectedSeason && (
            <>
              <h4 className="text-md font-medium text-gray-700 mb-3">Season quick stats</h4>
              <div className="grid grid-cols-2 gap-4 items-center" style={{gridTemplateColumns: '1fr 3fr'}}>
                <h5 className="text-sm font-medium text-gray-700 mb-3">Triple impact contributor</h5>
                {tripleImpactContributorLoading ? (
                  <div className="flex gap-2 items-center space-y-2 ">Loading...</div>
                ) : (
                  tripleImpactContributor && (
                    <div className="flex gap-2 items-center space-y-2 ">
                      {tripleImpactContributor.contact_first_name} {tripleImpactContributor.contact_last_name} 
                      <span className="text-sm text-gray-500">({tripleImpactContributor.total_hours} h = {tripleImpactContributor.volunteer_hours} volunteer + {tripleImpactContributor.mentor_hours} mentor + {tripleImpactContributor.judge_hours} judge)</span>
                    </div>
                  )
                )}
              </div>
            </>
          )}

          {/* Event Selection - Only shown if season is selected */}
          {selectedSeason && (
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-700 mb-3">Event</h3>
              <select
                value={selectedEvent?.event_id ?? ''}
                onChange={(e) => {
                  const selectedEventId = Number(e.target.value);
                  const event = events.find((ev) => ev.event_id === selectedEventId);
                  setSelectedEvent(event ?? null);
                }}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={undefined}>Choose an event</option>
                {events
                  .filter((event) => event.event_season_year === selectedSeason.season_year)
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
                className="inline-flex items-center pl-4 pr-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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