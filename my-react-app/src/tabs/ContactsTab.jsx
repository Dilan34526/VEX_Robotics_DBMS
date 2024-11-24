import React from 'react';

const ContactsTab = () => {
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Event Contacts</h2>
      <div className="space-y-6">
        {/* Volunteers Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">Volunteers</h3>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search volunteers..."
                className="flex-1 p-2 border border-gray-300 rounded-md"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Add
              </button>
            </div>
            <button className="w-full bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600">
              Find Underperforming Volunteers
            </button>
            <div className="border rounded-md max-h-48 overflow-y-auto">
              {[1,2,3].map((i) => (
                <div key={i} className="p-2 border-b hover:bg-gray-50">
                  Volunteer {i}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mentors Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">Mentors</h3>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search mentors..."
                className="flex-1 p-2 border border-gray-300 rounded-md"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Add
              </button>
            </div>
            {/* New Button for Mentor-Judge Same Team */}
            <button className="w-full bg-purple-500 text-white p-2 rounded-md hover:bg-purple-600">
              List Mentors Judging Same Team
            </button>
            <div className="border rounded-md max-h-48 overflow-y-auto">
              {[1,2,3].map((i) => (
                <div key={i} className="p-2 border-b hover:bg-gray-50">
                  Mentor {i}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Judges Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">Judges</h3>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search judges..."
                className="flex-1 p-2 border border-gray-300 rounded-md"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Add
              </button>
            </div>
            {/* New Button for Triple Impact */}
            <button className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600">
              Find Triple Impact Contributors
            </button>
            <div className="border rounded-md max-h-48 overflow-y-auto">
              {[1,2,3].map((i) => (
                <div key={i} className="p-2 border-b hover:bg-gray-50">
                  Judge {i}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
};

export default ContactsTab;

