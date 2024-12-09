import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { selectedEventAtom } from '../../store';
import { useMatches } from '../../hooks';
import { Card } from '../Card';

export const MatchesTab = () => {
    const [selectedEvent, setSelectedEvent] = useAtom(selectedEventAtom);
    const { matches, loading, flushCache } = useMatches(selectedEvent);

    return (
        <Card>
          <div className="space-y-4">
            <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
              Schedule New Match
            </button>
            <div className="border rounded-md">
              <div className="p-3 border-b bg-gray-50 font-medium">
                Match Schedule
              </div>
              <div className="max-h-96 overflow-y-auto">
                {loading ? (
                  <div className="p-3">Loading...</div>
                ) : (
                  matches!
                    .map((match) => (
                      <div key={match.match_id} className="flex gap-2 items-center p-3 border-b hover:bg-gray-50">
                        <span className="text-red-400">{match.match_team_id_red_1}, {match.match_team_id_red_2}</span>
                        <span className="text-red-700 font-bold text-xl">{match.match_red_score}</span>
                        &#x2212;
                        <span className="text-blue-700 font-bold text-xl">{match.match_blue_score}</span>
                        <span className="text-blue-400">{match.match_team_id_blue_1}, {match.match_team_id_blue_2}</span>

                        <span className="text-gray-500">({match.match_time.toLocaleString()})</span>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </Card>
      );
};