import React, { useState, useEffect } from 'react';

import { VexRoboticsLayout } from './VexRoboticsLayout';
import { VdbRes, VdbSeason, VdbEvent } from '../types';
import { Debug } from './Debug';
import { SeasonDetails } from './SeasonDetails';
import { EventDetails } from './EventDetails';
export const LaunchPage = () => {
  const [seasons, setSeasons] = useState<VdbSeason[]>([]);
  const [events, setEvents] = useState<VdbEvent[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<VdbSeason | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<VdbEvent | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
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
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setSelectedEvent(null);
  }, [selectedSeason]);

  return (
    <VexRoboticsLayout>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Debug</h3>
          <Debug
            onReset={() => {
              setSelectedSeason(null);
              setSeasons([]);
              setEvents([]);
            }}

            onFinish={() => {
              fetchData();
            }}
          />
        </div>


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
                  {season.season_year} - {season.season_name}
                </option>
              ))}
            </select>
          </div>
          
          <SeasonDetails 
            selectedSeason={selectedSeason}
          />

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

          {selectedSeason && selectedEvent && (
            <EventDetails selectedEvent={selectedEvent} />
          )}
        </div>
      )}
    </VexRoboticsLayout>
  );
};