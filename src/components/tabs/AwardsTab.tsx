import React from 'react';

export const AwardsTab = () => {
    return (<div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Awards</h2>
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
            {/* Sample awards - will be replaced with actual data */}
            <div className="p-4 border-b hover:bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Tournament Champion</h3>
                  <p className="text-sm text-gray-600">Team: 90X</p>
                </div>
                <button className="text-red-500 hover:text-red-700">
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
};
