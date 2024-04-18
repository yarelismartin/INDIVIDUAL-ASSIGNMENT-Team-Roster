import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import TeamDetails from '../../components/TeamDetails';
import { viewTeamDetails } from '../../api/mergedData';
import MemberCards from '../../components/MemberCards';

export default function ViewTeam() {
  const [teamDetails, SetTeamDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  const getTeamDetails = () => {
    viewTeamDetails(firebaseKey).then(SetTeamDetails);
  };

  useEffect(() => {
    getTeamDetails();
    return () => {
      SetTeamDetails({});
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseKey]);

  return (
    <div>
      <div style={{ margin: '15px' }}>
        <TeamDetails key={teamDetails.firebaseKey} teamObj={teamDetails} onUpdate={() => router.push('/teams')} />
      </div>
      <div
        className="text-center d-flex flex-wrap justify-content-center align-content-center"
        style={{ gap: '20px' }}
      >
        {teamDetails.members?.map((memObj) => (
          <MemberCards key={memObj.firebaseKey} memObj={memObj} onUpdate={getTeamDetails} />
        ))}
      </div>
    </div>
  );
}
