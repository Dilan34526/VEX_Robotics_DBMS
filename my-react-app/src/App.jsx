import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import SeasonManagement from './components/SeasonManagement';
import VolunteerManagement from './components/VolunteerManagement';
import './App.css';

const Navigation = ({ setCurrentView, currentView }) => {
  const navItems = [
    { view: 'seasons', label: 'Seasons' },
    { view: 'contacts', label: 'Contacts' },
    { view: 'events', label: 'Events' },
    { view: 'teams', label: 'Teams' },
    { view: 'matches', label: 'Matches' },
    { view: 'awards', label: 'Awards' },
    { view: 'registrations', label: 'Registrations' },
    { view: 'volunteers', label: 'Volunteers' },
    { view: 'mentors', label: 'Mentors' }
  ];

  return (
    <div className="w-full bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto">
        <div className="h-16 px-6 flex items-center justify-between">
          <div className="text-2xl font-bold text-white">VEX Robotics</div>
          <nav className="flex items-center space-x-1">
            {navItems.map(({ view, label }) => (
              <button
                key={view}
                onClick={() => setCurrentView(view)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  currentView === view
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [currentView, setCurrentView] = useState('seasons');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation setCurrentView={setCurrentView} currentView={currentView} />
      <div className="p-6">
        {currentView === 'seasons' && <SeasonManagement />}
        {currentView === 'volunteers' && <VolunteerManagement />}
      </div>
    </div>
  );
};

export default App;

