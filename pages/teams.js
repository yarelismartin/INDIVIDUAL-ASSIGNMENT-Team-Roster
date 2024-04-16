import React, { useEffect, useState } from 'react';
import { getTeams } from '../api/teamData';
import TeamCards from '../components/TeamCards';
import { useAuth } from '../utils/context/authContext';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const { user } = useAuth();

  const getAllTeams = () => {
    getTeams(user.uid).then(setTeams);
  };

  useEffect(() => {
    getAllTeams();
  });

  return (
    <div
      className="text-center d-flex flex-wrap justify-content-center align-content-center"
      style={{
        gap: '20px',
      }}
    >
      {teams.map((team) => (
        <TeamCards key={team.firebaseKey} teamObj={team} />
      ))}
    </div>
  );
}
