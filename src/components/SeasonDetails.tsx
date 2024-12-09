import React, { useState } from 'react';
import { Card } from './Card';
import { useTripleImpactContributor, useStingiestJudge, useVolunteersBySeason } from '../hooks';
import { VdbSeason } from '../types';

export const SeasonDetails = ({ 
  selectedSeason, 
}: {
  selectedSeason: VdbSeason | null;
}) => {
  const { tripleImpactContributor, loading: tripleImpactContributorLoading } = useTripleImpactContributor(selectedSeason);
  const { stingiestJudge, loading: stingiestJudgeLoading } = useStingiestJudge(selectedSeason);
  const { volunteersBySeason, loading: volunteersBySeasonLoading } = useVolunteersBySeason(selectedSeason);
  const [filterUnderperforming, setFilterUnderperforming] = useState(false);
  const filteredVolunteers = volunteersBySeason?.filter((volunteer) => !filterUnderperforming || parseFloat(volunteer.total_hours) < 40) ?? [];

  if (!selectedSeason) {
    return null;
  }

  return (
    <Card>
      <div className="grid grid-cols-3 gap-4 items-center justify-items-center text-center">
        <h3 className="text-lg font-bold text-gray-700">Triple impact contributor</h3>
        {tripleImpactContributorLoading ? (
          <div>Loading...</div>
        ) : (
          tripleImpactContributor
            ?  (
              <div>
                {tripleImpactContributor.contact_first_name} {tripleImpactContributor.contact_last_name} 
              </div>
            )
            : (
              <div>No contacts qualify</div>
            )
        )}
        {
          !tripleImpactContributorLoading && tripleImpactContributor && (
            <div className="flex gap-2 items-center space-y-2 ">
              <span className="text-sm text-gray-500">
                {tripleImpactContributor.total_hours} h
                <br />
                = {tripleImpactContributor.volunteer_hours} volunteer + {tripleImpactContributor.mentor_hours} mentor + {tripleImpactContributor.judge_hours} judge
              </span>
            </div>
          )
        }
      </div>
      
      <div className="mt-8 grid grid-cols-3 gap-4 items-center justify-items-center">
        <h3 className="text-lg font-bold text-gray-700">Stingiest judge</h3>
        {stingiestJudgeLoading ? (
          <div>Loading...</div>
        ) : (
          stingiestJudge
            ?  (
              <div>
                {stingiestJudge.contact_first_name} {stingiestJudge.contact_last_name}
              </div>
            )
            : (
              <div>No judges qualify</div>
            )
        )}
        {
          !stingiestJudgeLoading && stingiestJudge && (
            <div className="flex gap-2 items-center space-y-2">
              <span className="text-sm text-gray-500">
                {parseFloat(stingiestJudge.avg_score).toFixed(2)} avg
              </span>
            </div>
          )
        }
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-bold text-gray-700 mb-4">Volunteers</h3>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filterUnderperforming}
            onChange={(e) => setFilterUnderperforming(e.target.checked)}
          />
          Show only underperforming (&lt; 40.00 h)
        </label>
        <div className="border rounded-md max-h-48 overflow-y-auto">
          {volunteersBySeasonLoading ? (
            <div className="p-2">Loading...</div>
          ) : (
            filteredVolunteers?.map((volunteer) => (
              <div key={volunteer.contact_id} className="flex gap-2 items-center p-2 border-b hover:bg-gray-50">
                <span>{volunteer.contact_first_name} {volunteer.contact_last_name}</span>
                <span className={`text-gray-500 ${parseFloat(volunteer.total_hours) < 40 ? 'text-red-500' : ''}`}>({parseFloat(volunteer.total_hours).toFixed(2)} h)</span>
              </div>
            ))
          )}
        </div>
      </div>
    </Card>
  );
}; 