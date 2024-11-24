import React, { useState, useEffect } from 'react';

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    contact_id: '',
    contact_phone_number: '',
    contact_first_name: '',
    contact_last_name: ''
  });
  const [editingContact, setEditingContact] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Simulated initial data
    setContacts([
      {
        contact_id: 1,
        contact_phone_number: '123-456-7890',
        contact_first_name: 'John',
        contact_last_name: 'Doe'
      },
      {
        contact_id: 2,
        contact_phone_number: '098-765-4321',
        contact_first_name: 'Jane',
        contact_last_name: 'Smith'
      }
    ]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!newContact.contact_first_name || !newContact.contact_last_name) {
      setError('Name fields are required');
      return;
    }

    if (editingContact !== null) {
      setContacts(contacts.map((contact) => 
        contact.contact_id === editingContact 
          ? { ...newContact } 
          : contact
      ));
      setEditingContact(null);
    } else {
      const newId = Math.max(...contacts.map(c => c.contact_id), 0) + 1;
      setContacts([...contacts, { ...newContact, contact_id: newId }]);
    }

    setNewContact({
      contact_id: '',
      contact_phone_number: '',
      contact_first_name: '',
      contact_last_name: ''
    });
    setError('');
  };

  const handleEdit = (contact) => {
    setNewContact(contact);
    setEditingContact(contact.contact_id);
  };

  const handleDelete = (contactId) => {
    setContacts(contacts.filter(contact => contact.contact_id !== contactId));
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-md">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Contact Management</h2>
        
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
            <input
              type="text"
              placeholder="First Name"
              value={newContact.contact_first_name}
              onChange={(e) => setNewContact({ ...newContact, contact_first_name: e.target.value })}
              className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={newContact.contact_last_name}
              onChange={(e) => setNewContact({ ...newContact, contact_last_name: e.target.value })}
              className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              placeholder="Phone Number (XXX-XXX-XXXX)"
              value={newContact.contact_phone_number}
              onChange={(e) => setNewContact({ ...newContact, contact_phone_number: e.target.value })}
              className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {editingContact !== null ? 'Update Contact' : 'Add Contact'}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-medium">ID</th>
                <th className="text-left p-4 font-medium">First Name</th>
                <th className="text-left p-4 font-medium">Last Name</th>
                <th className="text-left p-4 font-medium">Phone</th>
                <th className="text-right p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.contact_id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{contact.contact_id}</td>
                  <td className="p-4">{contact.contact_first_name}</td>
                  <td className="p-4">{contact.contact_last_name}</td>
                  <td className="p-4">{contact.contact_phone_number}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleEdit(contact)}
                      className="px-3 py-1 text-blue-500 hover:bg-blue-50 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(contact.contact_id)}
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
      </div>
    </div>
  );
};

export default ContactManagement;