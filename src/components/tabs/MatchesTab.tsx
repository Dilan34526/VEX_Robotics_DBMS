import React from 'react';

export const MatchesTab = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Matches</h2>
          <div className="space-y-4">
            <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
              Schedule New Match
            </button>
            <div className="border rounded-md">
              <div className="p-3 border-b bg-gray-50 font-medium">
                Match Schedule
              </div>
              <div className="max-h-96 overflow-y-auto">
                {[1,2,3].map((i) => (
                  <div key={i} className="p-3 border-b hover:bg-gray-50">
                    Match #{i}: Red Alliance vs Blue Alliance
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
};

