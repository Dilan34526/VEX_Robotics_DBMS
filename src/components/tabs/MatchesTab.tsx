import React, { useMemo, useState } from 'react';
import { clearCache, useMatches } from '../../hooks';
import { Card } from '../Card';
import { VdbEvent } from '../../types';

export const MatchesTab = ({ event }: { event: VdbEvent }) => {
    const { matches, loading, setMatches } = useMatches(event);
    const [editScores, setEditScores] = useState(new Map<number, { red: number, blue: number }>());

    const scores = useMemo<Map<number, { red: number, blue: number }>>(() => {
        if (matches === null) return new Map();
      
        const map = new Map();
        for (const match of matches) {
            map.set(match.match_id, { red: match.match_red_score, blue: match.match_blue_score });
        }
        return map;
    }, [matches]);

    const handleScoreChange = (matchId: number, alliance: 'red' | 'blue', score: number) => {
        const newScores = new Map(editScores);

        const newScoresRecord = editScores.get(matchId) ?? scores.get(matchId)!;
        newScores.set(matchId, { ...newScoresRecord, [alliance]: score });
        setEditScores(newScores);
    };

    const handleSubmitScores = async (matchId: number) => {
        const scores = editScores.get(matchId);
        if (!scores) return;

        await fetch(`//localhost:5174/event/${event.event_id}/match/${matchId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(scores),
        });

        editScores.delete(matchId);
        
        clearCache();
        setMatches(matches!.map(match => match.match_id !== matchId ? match : { ...match, match_blue_score: scores.blue, match_red_score: scores.red }));
    };

    return (
        <Card>
          <div className="space-y-4">
            {/* <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
              Schedule New Match
            </button> */}
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
                        <input 
                          type="number"
                          value={editScores.get(match.match_id)?.red ?? match.match_red_score}
                          onChange={e => handleScoreChange(match.match_id, 'red', Number(e.target.value))}
                          className="w-16 bg-red-50 rounded p-1"
                        />
                        &#x2212;
                        <input
                          type="number"  
                          value={editScores.get(match.match_id)?.blue ?? match.match_blue_score}
                          onChange={e => handleScoreChange(match.match_id, 'blue', Number(e.target.value))}
                          className="w-16 bg-blue-50 rounded p-1"
                        />
                        <span className="text-blue-400">{match.match_team_id_blue_1}, {match.match_team_id_blue_2}</span>

                        <span className="text-gray-500">{match.match_time.toLocaleString()}</span>
                        
                        <button
                          onClick={() => handleSubmitScores(match.match_id)}
                          disabled={!editScores.has(match.match_id)}
                          className={`  bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 ${editScores.has(match.match_id) ? 'opacity-100' : 'opacity-30'}`}
                        >
                          Update
                        </button>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </Card>
      );
};