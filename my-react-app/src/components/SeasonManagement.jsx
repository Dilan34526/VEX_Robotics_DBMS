import React, { useState, useEffect } from 'react';

// Management Components styling update
const SeasonManagement = () => {
    const [seasons, setSeasons] = useState([
      { season_year: 2024, season_name: "VEX 2024 Competition" },
      { season_year: 2023, season_name: "VEX 2023 Competition" }
    ]);
    const [newSeason, setNewSeason] = useState({ season_year: '', season_name: '' });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (newSeason.season_year && newSeason.season_name) {
        setSeasons([...seasons, newSeason]);
        setNewSeason({ season_year: '', season_name: '' });
      }
    };
  
    return (
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-[#1a237e] mb-8">Season Management</h2>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Season Year</label>
                <input
                  type="number"
                  value={newSeason.season_year}
                  onChange={(e) => setNewSeason({ ...newSeason, season_year: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1a237e] focus:border-[#1a237e] outline-none"
                  placeholder="Enter year..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Season Name</label>
                <input
                  type="text"
                  value={newSeason.season_name}
                  onChange={(e) => setNewSeason({ ...newSeason, season_name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1a237e] focus:border-[#1a237e] outline-none"
                  placeholder="Enter name..."
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#1a237e] text-white rounded-lg hover:bg-[#3949ab] transition-colors duration-150"
            >
              Add Season
            </button>
          </form>
        </div>
  
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Year</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {seasons.map((season) => (
                <tr key={season.season_year} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{season.season_year}</td>
                  <td className="px-6 py-4 text-gray-900">{season.season_name}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="text-[#1a237e] hover:text-[#3949ab] font-medium">Edit</button>
                    <button className="text-red-600 hover:text-red-700 font-medium">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };  

export default SeasonManagement;