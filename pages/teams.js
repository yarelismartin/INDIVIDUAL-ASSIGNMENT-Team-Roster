import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getAllPublicTeams } from '../api/teamData';
import TeamCards from '../components/TeamCards';
import { useAuth } from '../utils/context/authContext';

export default function Teams() {
  const [userTeams, setUserTeams] = useState([]);
  const [publicTeams, setPublicTeams] = useState([]);
  const { user } = useAuth();

  const getPublicTeams = async () => {
    const allTeams = await getAllPublicTeams(user.uid);
    const allUserTeams = allTeams.filter((team) => team.uid === user.uid);
    setUserTeams(allUserTeams);
    const publicUser = allTeams.filter((team) => team.uid !== user.uid && team.is_public);
    setPublicTeams(publicUser);
  };

  useEffect(() => {
    getPublicTeams();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center">
      <Link href="/team/new" passHref>
        <Button
          style={{
            marginTop: '15px', backgroundColor: '#B6A39E', color: 'black', border: 'none',
          }}
        > Add A Team
        </Button>
      </Link>
      {userTeams.length > 0 && (
        <>

          <h2 style={{ marginTop: '40px' }}>Your Teams</h2>
          <div className="d-flex flex-wrap justify-content-center align-content-center" style={{ gap: '40px', marginTop: '20px' }}>
            {userTeams.map((team) => (
              <TeamCards key={team.firebaseKey} teamObj={team} />
            ))}
          </div>
        </>
      )}

      {publicTeams.length > 0 && (
      <>
        <h2 style={{ marginTop: '70px' }}>Public Teams</h2>
        <div className="d-flex flex-wrap justify-content-center align-content-center" style={{ gap: '40px', marginTop: '20px' }}>
          {publicTeams.map((team) => (
            <TeamCards key={team.firebaseKey} teamObj={team} />
          ))}
        </div>
      </>
      )}
    </div>
  );
}
