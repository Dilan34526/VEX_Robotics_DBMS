import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { selectedEventAtom } from '../../store';
import { useAwards } from '../../hooks';
import { Card } from '../Card';

export const AwardsTab = () => {
  const [selectedEvent, setSelectedEvent] = useAtom(selectedEventAtom);
  const { awards, loading,  flushCache } = useAwards(selectedEvent);

  return (<Card>
    <div className="space-y-6">
      {/* Award Buttons */}
      <div className="flex flex-col gap-3">
        <button className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 font-medium">
          Assign Tournament Champion
        </button>
        <button className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 font-medium">
          Assign Judges Award
        </button>
      </div>

      {/* Awards List */}
      <div className="border rounded-md">
        <div className="p-3 border-b bg-gray-50 font-medium">
          Assigned Awards
        </div>
        <div className="max-h-96 overflow-y-auto">
          {loading ? (
            <div className="p-4">Loading...</div>
          ) : (
            awards!.map(award => (
              <div key={award.award_id} className="p-4 border-b hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{award.award_name}</span>
                    <span className="text-sm text-gray-600">({award.award_team_id})</span>
                    &#x2192;
                    <span>{award.award_qualification}</span>
                  </div>
                  {/* <button className="text-red-500 hover:text-red-700">
                    Remove
                  </button> */}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  </Card>);
};
