import React, { useState } from 'react';
import { clearCache, useTeams } from '../../hooks';
import { Card } from '../Card';
import { VdbEvent } from '../../types';

export const TeamsTab = ({ event }: { event: VdbEvent }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const { teams, loading, setTeams } = useTeams(event);

    const searchTeams = async (query: string) => {
        const res = await fetch(`//localhost:5174/event/${event.event_id}/team/search?q=${query}`);
        const data = await res.json();
        setSearchResults(data.data);
    };

    const addTeam = async (teamId: string) => {
        await fetch(`//localhost:5174/event/${event.event_id}/team`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ teamId }),
        });
        clearCache();
        setTeams([...teams!, searchResults.find(team => team.team_id === teamId)]);
        setSearchResults(searchResults.filter(team => team.team_id !== teamId));
    };

    const deleteTeam = async (teamId: string) => {
        if (event === null) return;

        await fetch(`//localhost:5174/event/${event.event_id}/team/${teamId}`, {
            method: 'DELETE',
        });

        clearCache();
        setTeams(teams!.filter(team => team.team_id !== teamId));
    };

    return (
        <Card>
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search teams..."
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={searchQuery}
                    onChange={e => {
                        setSearchQuery(e.target.value);
                        searchTeams(e.target.value);
                    }}
                  />
                  {searchResults.length > 0 && searchQuery.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                      {searchResults.map(team => (
                        <div key={team.team_id} className="px-4 py-2 hover:bg-gray-100 flex justify-between">
                          <div>
                            <div className="font-bold">{team.team_id}</div>
                            <div>{team.team_name}</div>
                          </div>
                          <button 
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => addTeam(team.team_id)}
                          >
                            Add
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="border rounded-md">
                <div className="p-3 border-b bg-gray-50 font-medium">
                  Registered Teams
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {loading ? (
                    <div className="p-3">Loading...</div>
                  ) : (
                    teams!.map((team) => (
                      <div key={team.team_id} className="p-2 border-b hover:bg-gray-50">
                        <div className="flex justify-between items-center">
                          <div className="flex gap-5">
                            <span className="font-bold">{team.team_id}</span>
                            <span>{team.team_name}</span>
                          </div>
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => deleteTeam(team.team_id)}
                          >
                            Unregister
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
        </Card>
    );
};
