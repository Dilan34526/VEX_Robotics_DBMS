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

export const ManageEvent = () => {
  const [activeTab, setActiveTab] = useState('awards');
  const [selectedEvent, setSelectedEvent] = useAtom(selectedEventAtom);
  const navigate = useNavigate();


  if (selectedEvent === null) {
    return <></>;
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
      <div className="flex flex-col gap-4 container mx-auto pt-8 pb-8 px-4">
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
                    ? 'bg-white text-blue-600 border-blue-600'
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
  );
};