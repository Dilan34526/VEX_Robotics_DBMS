import React, { useState } from 'react';
import {AwardsTab} from './tabs/AwardsTab';
import {TeamsTab} from './tabs/TeamsTab';
import {ContactsTab} from './tabs/ContactsTab';
import {MatchesTab} from './tabs/MatchesTab';
import { VexRoboticsLayout } from './VexRoboticsLayout';
import { useAtom } from 'jotai';
import { selectedEventAtom } from '../store';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const ManageEventPage = () => {
  const [activeTab, setActiveTab] = useState('awards');
  const [selectedEvent, setSelectedEvent] = useAtom(selectedEventAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedEvent === null) {
      navigate('/');
    }
  }, []);


  if (selectedEvent === null) {
    return <VexRoboticsLayout />
  }

  const renderTabContent = () => {
    switch(activeTab) {
      case 'awards':
        return <AwardsTab />;
      case 'teams':
        return <TeamsTab />;
      case 'contacts':
        return <ContactsTab />;
      case 'matches':
        return <MatchesTab />;
      default:
        return null;
    }
  };

  return (
    <VexRoboticsLayout>
      <button
        className="inline-flex items-center pl-2 pr-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={() => navigate(-1)}
      >
        <svg
          className="ml-2 h-5 w-5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M9 5l-7 7 7 7" />
        </svg>
        Back
      </button>

      <div className="flex flex-col gap-4 container mx-auto pt-8 pb-8 px-4">
        <h2 className="text-2xl font-bold mb-4">{selectedEvent!.event_name ?? ''}</h2>

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
          <div className="mt-6">
            {renderTabContent()}
          </div>
      </div>
    </VexRoboticsLayout>
  );
};