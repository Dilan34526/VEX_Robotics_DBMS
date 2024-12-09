import React, { useState } from 'react';
import { useContacts } from '../../hooks';
import { Card } from '../Card';
import { VdbEvent } from '../../types';

export const ContactsTab = ({ event }: { event: VdbEvent }) => {
    const [judgesSearch, setJudgesSearch] = useState('');
    const [mentorsSearch, setMentorsSearch] = useState('');
    const [volunteersSearch, setVolunteersSearch] = useState('');
    const { judges, mentors, volunteers, loading } = useContacts(event, judgesSearch, mentorsSearch, volunteersSearch);


    return (<Card>
      {/* <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">Quick actions</h3> 
          
          <div className="grid grid-cols-3 gap-5">
            <button className="w-full bg-purple-500 text-white p-2 rounded-md hover:bg-purple-600">
              List mentors judging same team
            </button>
            <button className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600">
              Find mentor award candidates
            </button>
          </div>
        </div> */}

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
              {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Add
              </button> */}
            </div>
            <div className="border rounded-md max-h-48 overflow-y-auto">
              {loading ? (
                <div className="p-2">Loading...</div>
              ) : (
                volunteers?.map((volunteer) => (
                  <div key={volunteer.contact_id} className="flex gap-2 items-center p-2 border-b hover:bg-gray-50">
                    <span>{volunteer.contact_first_name} {volunteer.contact_last_name}</span>
                    <span className="text-gray-500">({volunteer.hours} h)</span>
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
              {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Add
              </button> */}
            </div>
            <div className="border rounded-md max-h-48 overflow-y-auto">
              {loading ? (
                <div className="p-2">Loading...</div>
              ) : (
                mentors?.map((mentor) => (
                  <div key={mentor.contact_id} className="flex gap-2 items-center p-2 border-b hover:bg-gray-50">
                    <span>{mentor.contact_first_name} {mentor.contact_last_name}</span>
                    <span className="text-gray-500">({mentor.teams.map(team => team.team_id).join(', ')}; {mentor.hours} h)</span>
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
              {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Add
              </button> */}
            </div>
            <div className="border rounded-md max-h-48 overflow-y-auto">
              {loading ? (
                <div className="p-2">Loading...</div>
              ) : (
                judges?.map((judge) => (
                  <div key={judge.contact_id} className="flex gap-2 items-center p-2 border-b hover:bg-gray-50">
                    <span>{judge.contact_first_name} {judge.contact_last_name}</span>
                    <span className="text-gray-500">({judge.teams.map(team => team.team_id).join(', ')}; {judge.hours} h)</span>
                  </div>
                ))
              )}
            </div>
          </div>
      </div>
    </Card>);
};
