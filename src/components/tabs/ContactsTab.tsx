import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { selectedEventAtom } from '../../store';
import { VdbRes, VdbContact } from '../../types';

export const ContactsTab = () => {
    const [selectedEvent, setSelectedEvent] = useAtom(selectedEventAtom);
    const [volunteers, setVolunteers] = useState<VdbContact[]>([]);
    const [mentors, setMentors] = useState<VdbContact[]>([]);
    const [judges, setJudges] = useState<VdbContact[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContacts = async () => {
            const [volunteersRes, mentorsRes, judgesRes] = await Promise.all([
                fetch(`//localhost:5174/event/${selectedEvent?.event_id}/volunteer`),
                fetch(`//localhost:5174/event/${selectedEvent?.event_id}/mentor`),
                fetch(`//localhost:5174/event/${selectedEvent?.event_id}/judge`)
            ]);

            const volunteersData: VdbRes<VdbContact[]> = await volunteersRes.json();
            const mentorsData: VdbRes<VdbContact[]> = await mentorsRes.json();
            const judgesData: VdbRes<VdbContact[]> = await judgesRes.json();

            setVolunteers(volunteersData.data!);
            setMentors(mentorsData.data!);
            setJudges(judgesData.data!);
            setLoading(false);
        };

        if (selectedEvent) {
            fetchContacts();
        }
    }, [selectedEvent]);

    return (<div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
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
              {loading ? (
                <div className="p-2">Loading...</div>
              ) : (
                volunteers.map((volunteer) => (
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
              {loading ? (
                <div className="p-2">Loading...</div>
              ) : (
                mentors.map((mentor) => (
                  <div key={mentor.contact_id} className="p-2 border-b hover:bg-gray-50">
                    {mentor.contact_first_name} {mentor.contact_last_name}
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
              {loading ? (
                <div className="p-2">Loading...</div>
              ) : (
                judges.map((judge) => (
                  <div key={judge.contact_id} className="p-2 border-b hover:bg-gray-50">
                    {judge.contact_first_name} {judge.contact_last_name}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>);
};
