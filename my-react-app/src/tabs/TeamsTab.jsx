import React from 'react';

const TeamsTab = () => {
    return (<div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
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
                  {/* Sample teams - will be replaced with actual data */}
                  {[1,2,3].map((i) => (
                    <div key={i} className="p-3 border-b hover:bg-gray-50">
                      <div className="flex justify-between items-center">
                        <span>Team {i}</span>
                        <button className="text-red-500 hover:text-red-700">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>);
};

export default TeamsTab;

