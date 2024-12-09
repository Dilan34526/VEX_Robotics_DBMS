import React from 'react';
import { VdbSeason, VdbContact } from '../types';
import { Card } from './Card';
import { useTripleImpactContributor, useStingiestJudge } from '../hooks';

export const SeasonDetails = ({ 
  selectedSeason, 
}) => {
    const { tripleImpactContributor, loading: tripleImpactContributorLoading } = useTripleImpactContributor(selectedSeason);
    const { stingiestJudge, loading: stingiestJudgeLoading } = useStingiestJudge(selectedSeason);

  if (!selectedSeason) {
    return null;
  }

  console.log(stingiestJudge);

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
    </Card>
  );
}; 