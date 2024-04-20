import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { deleteTeamAndMembers } from '../api/mergedData';
import { useAuth } from '../utils/context/authContext';

export default function TeamDetails({ teamObj, onUpdate }) {
  const { user } = useAuth();

  const deleteAllMembersAndTeam = () => {
    if (window.confirm(`If you delete ${teamObj.team_name} you will also delete all the players in this team. `)) {
      deleteTeamAndMembers(teamObj.firebaseKey).then(onUpdate);
      console.warn(teamObj.firebaseKey);
    }
  };
  return (

    <div
      className="card"
      style={{
        display: 'flex', flexDirection: 'row', width: '400px', padding: '5px', height: '200px',
      }}
    >
      <Card.Img
        variant="top"
        src={teamObj.logo}
        style={{
          maxWidth: '150px', // Set maximum width for the logo
          maxHeight: '100%', // Maintain aspect ratio by setting maximum height to 100%
          objectFit: 'contain', // Maintain aspect ratio and fit within the specified dimensions
          flex: '1',
        }}
      />
      <div className="card-body" style={{ flex: '2' }}>
        <h5 className="card-title">{teamObj.team_name}</h5>
        <h5>{teamObj.is_public ? '🌐' : '🔒'}</h5>
        {teamObj.uid === user.uid && (
          <>
            <Link href={`/team/edit/${teamObj.firebaseKey}`} passHref>
              <Button style={{ backgroundColor: '#90a955', border: 'none', marginRight: '5px' }}>✏️</Button>
            </Link>
            <Button style={{ backgroundColor: '#ef5d60', border: 'none' }} onClick={deleteAllMembersAndTeam}>🗑️</Button>
          </>
        ) }

      </div>
    </div>
  );
}

TeamDetails.propTypes = {
  teamObj: PropTypes.shape({
    team_name: PropTypes.string,
    logo: PropTypes.string,
    firebaseKey: PropTypes.string,
    is_public: PropTypes.bool,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
