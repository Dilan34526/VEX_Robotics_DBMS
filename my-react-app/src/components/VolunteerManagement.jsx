import React, { useState, useEffect } from 'react';

const VolunteerManagement = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [newVolunteer, setNewVolunteer] = useState({
    volunteer_contact_id: '',
    event_id: '',
    volunteer_hours: 0
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [underperformingVolunteers, setUnderperformingVolunteers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Simulated data loading
  useEffect(() => {
    setVolunteers([
      { volunteer_contact_id: 1, event_id: 1, volunteer_hours: 35 },
      { volunteer_contact_id: 2, event_id: 1, volunteer_hours: 45 },
      { volunteer_contact_id: 1, event_id: 2, volunteer_hours: 20 }
    ]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!newVolunteer.volunteer_contact_id || !newVolunteer.event_id || newVolunteer.volunteer_hours < 0) {
      setError('All fields are required and hours must be positive');
      return;
    }

    if (editingId) {
      setVolunteers(volunteers.map(volunteer => 
        volunteer.volunteer_contact_id === editingId.contact_id && 
        volunteer.event_id === editingId.event_id
          ? newVolunteer 
          : volunteer
      ));
      setEditingId(null);
    } else {
      setVolunteers([...volunteers, newVolunteer]);
    }

    setNewVolunteer({
      volunteer_contact_id: '',
      event_id: '',
      volunteer_hours: 0
    });
    setError('');
  };

  const handleEdit = (volunteer) => {
    setNewVolunteer(volunteer);
    setEditingId({
      contact_id: volunteer.volunteer_contact_id,
      event_id: volunteer.event_id
    });
  };

  const handleDelete = (contactId, eventId) => {
    setVolunteers(volunteers.filter(
      volunteer => !(volunteer.volunteer_contact_id === contactId && volunteer.event_id === eventId)
    ));
  };

  const findUnderperformingVolunteers = async () => {
    setIsLoading(true);
    try {
      // Replace with actual API call
      const response = await fetch('http://localhost:3000/api/volunteers/underperforming');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setUnderperformingVolunteers(data);
    } catch (error) {
      setError('Failed to fetch underperforming volunteers');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-md">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Volunteer Management</h2>
          <button
            onClick={findUnderperformingVolunteers}
            disabled={isLoading}
            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Loading...' : 'Find Volunteers Under 40 Hours'}
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="number"
              placeholder="Contact ID"
              value={newVolunteer.volunteer_contact_id}
              onChange={(e) => setNewVolunteer({ 
                ...newVolunteer, 
                volunteer_contact_id: parseInt(e.target.value) || '' 
              })}
              className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Event ID"
              value={newVolunteer.event_id}
              onChange={(e) => setNewVolunteer({ 
                ...newVolunteer, 
                event_id: parseInt(e.target.value) || '' 
              })}
              className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-4">
              <input
                type="number"
                placeholder="Hours"
                value={newVolunteer.volunteer_hours}
                onChange={(e) => setNewVolunteer({ 
                  ...newVolunteer, 
                  volunteer_hours: parseInt(e.target.value) || 0 
                })}
                className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                min="0"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {editingId ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </form>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-medium">Contact ID</th>
                <th className="text-left p-4 font-medium">Event ID</th>
                <th className="text-left p-4 font-medium">Hours</th>
                <th className="text-right p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map((volunteer) => (
                <tr 
                  key={`${volunteer.volunteer_contact_id}-${volunteer.event_id}`} 
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4">{volunteer.volunteer_contact_id}</td>
                  <td className="p-4">{volunteer.event_id}</td>
                  <td className="p-4">{volunteer.volunteer_hours}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleEdit(volunteer)}
                      className="px-3 py-1 text-blue-500 hover:bg-blue-50 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(volunteer.volunteer_contact_id, volunteer.event_id)}
                      className="px-3 py-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {underperformingVolunteers.length > 0 && (
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Volunteers Under 40 Hours in 2024:</h3>
            <ul className="space-y-2">
              {underperformingVolunteers.map(volunteer => (
                <li key={`${volunteer.volunteer_contact_id}-${volunteer.event_id}`}>
                  Contact ID: {volunteer.volunteer_contact_id} - {volunteer.volunteer_hours} hours
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerManagement;