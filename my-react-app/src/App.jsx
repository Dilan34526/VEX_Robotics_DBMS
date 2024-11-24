import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VexRoboticsLayout from './components/VexRoboticsLayout';
// import NextPage from './components/NextPage';
import "./App.css"

const NextPage = () => {
  const [activeTab, setActiveTab] = useState('event');

  // Tab rendering helper function
  const renderTabContent = () => {
    switch(activeTab) {
      case 'awards':  // changed from 'event'
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
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
    </div>
  );

      case 'teams':
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
          </div>
        );

        case 'contacts':
  return (
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
  );

      case 'matches':
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

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex items-center">
          <h1 className="text-xl font-bold text-gray-800">VEX Robotics DBMS</h1>
        </div>
      </nav>

      {/* Tab Navigation */}
      <div className="container mx-auto mt-8 px-4">
        <div className="flex space-x-1 border-b">
          {[
            { id: 'awards', label: 'Awards' },
            { id: 'teams', label: 'Teams' },
            { id: 'contacts', label: 'Contacts' },
            { id: 'matches', label: 'Matches' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 border border-b-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VexRoboticsLayout />} />
        <Route path="/next-page" element={<NextPage />} />
      </Routes>
    </Router>
  );
}

export default App;