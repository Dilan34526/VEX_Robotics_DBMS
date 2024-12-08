import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { selectedEventAtom } from '../../store';
import { useContacts, useJudges, useMentors, useVolunteers } from '../../hooks';

export const ContactsTab = () => {
    const [selectedEvent, setSelectedEvent] = useAtom(selectedEventAtom);
    const [judgesSearch, setJudgesSearch] = useState('');
    const [mentorsSearch, setMentorsSearch] = useState('');
    const [volunteersSearch, setVolunteersSearch] = useState('');
    const { judges, mentors, volunteers, loading } = useContacts(selectedEvent, judgesSearch, mentorsSearch, volunteersSearch);

    return (<div className="flex flex-col gap-8 bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800">Event contacts</h2>

      <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">Quick actions</h3> 
          
          <div className="grid grid-cols-3 gap-5">
            <button className="w-full bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600">
              Find underperforming volunteers
            </button>
            <button className="w-full bg-purple-500 text-white p-2 rounded-md hover:bg-purple-600">
              List mentors judging same team
            </button>
            <button className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600">
              Find triple impact contributors
            </button>
          </div>
        </div>

        {/* Volunteers Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">Volunteers</h3>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={volunteersSearch}
                onChange={(e) => setVolunteersSearch(e.target.value)}
                placeholder="Search volunteers..."
                className="flex-1 p-2 border border-gray-300 rounded-md"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Add
              </button>
            </div>
            <div className="border rounded-md max-h-48 overflow-y-auto">
              {loading ? (
                <div className="p-2">Loading...</div>
              ) : (
                volunteers?.map((volunteer) => (
                  <div key={volunteer.contact_id} className="p-2 border-b hover:bg-gray-50">
                    {volunteer.contact_first_name} {volunteer.contact_last_name}
                  </div>
                ))
              )}
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
                value={mentorsSearch}
                onChange={(e) => setMentorsSearch(e.target.value)}
                placeholder="Search mentors..."
                className="flex-1 p-2 border border-gray-300 rounded-md"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Add
              </button>
            </div>
            <div className="border rounded-md max-h-48 overflow-y-auto">
              {loading ? (
                <div className="p-2">Loading...</div>
              ) : (
                mentors?.map((mentor) => (
                  <div key={mentor.contact_id} className="flex gap-2 items-center p-2 border-b hover:bg-gray-50">
                    <span>{mentor.contact_first_name} {mentor.contact_last_name}</span>
                    <span className="text-gray-500">({mentor.teams.map(team => team.team_id).join(', ')})</span>
                  </div>
                ))
              )}
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
                value={judgesSearch}
                onChange={(e) => setJudgesSearch(e.target.value)}
                placeholder="Search judges..."
                className="flex-1 p-2 border border-gray-300 rounded-md"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Add
              </button>
            </div>
            <div className="border rounded-md max-h-48 overflow-y-auto">
              {loading ? (
                <div className="p-2">Loading...</div>
              ) : (
                judges?.map((judge) => (
                  <div key={judge.contact_id} className="flex gap-2 items-center p-2 border-b hover:bg-gray-50">
                    <span>{judge.contact_first_name} {judge.contact_last_name}</span>
                    <span className="text-gray-500">({judge.teams.map(team => team.team_id).join(', ')})</span>
                  </div>
                ))
              )}
            </div>
          </div>
      </div>
    </div>);
};
