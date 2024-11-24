import React, { useState } from 'react';
import AwardsTab from '../tabs/AwardsTab';
import TeamsTab from '../tabs/TeamsTab';
import ContactsTab from '../tabs/ContactsTab';
import MatchesTab from '../tabs/MatchesTab';

const NextPage = () => {
  const [activeTab, setActiveTab] = useState('awards');

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
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex items-center">
          <h1 className="text-xl font-bold text-gray-800">VEX Robotics DBMS</h1>
        </div>
      </nav>

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

        <div className="mt-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default NextPage;