import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { selectedEventAtom } from '../../store';
import { VdbRes, VdbTeam } from '../../types';

export const TeamsTab = () => {
    const [selectedEvent, setSelectedEvent] = useAtom(selectedEventAtom);
    const [teams, setTeams] = useState<VdbTeam[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeams = async () => {
            const response = await fetch(`//localhost:5174/event/${selectedEvent?.event_id}/team`);
            const data: VdbRes<VdbTeam[]> = await response.json();
            setTeams(data.data!);
            setLoading(false);
        };

        if (selectedEvent) {
            fetchTeams();
        }
    }, [selectedEvent]);

    return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Teams</h2>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search teams..."
                  className="flex-1 p-2 border border-gray-300 rounded-md"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Add Team
                </button>
              </div>
              <div className="border rounded-md">
                <div className="p-3 border-b bg-gray-50 font-medium">
                  Registered Teams
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {loading ? (
                    <div className="p-3">Loading...</div>
                  ) : (
                    teams.map((team) => (
                      <div key={team.team_id} className="p-2 border-b hover:bg-gray-50">
                        <div className="flex justify-between items-center">
                          <div className="flex gap-5">
                            <span className="font-bold">{team.team_id}</span>
                            <span>{team.team_name}</span>
                          </div>
                          <button className="text-red-500 hover:text-red-700">Remove</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
    );
};
