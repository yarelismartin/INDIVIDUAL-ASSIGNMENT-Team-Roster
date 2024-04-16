import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';
import deleteTeamAndMembers from '../api/mergedData';

export default function ViewTeam({ teamObj, onUpdate }) {
  const deleteAllMembersAndTeam = () => {
    if (window.confirm(`If you delete ${teamObj.team_name} you will also delete all the players in this team. `)) {
      deleteTeamAndMembers(teamObj.firebaseKey).then(onUpdate);
    }
  };
  return (

    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={teamObj.logo} />
        <Card.Body>
          <Card.Title>{teamObj.team_name}</Card.Title>
          {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
          <Link href={`/team/edit/${teamObj.firebaseKey}`} passHref>
            <Button style={{ backgroundColor: '#90a955', border: 'none' }}>✏️</Button>
          </Link>
          <Button style={{ backgroundColor: '#ef5d60', border: 'none' }} onClick={deleteAllMembersAndTeam} className="m-2">
            🗑️
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

ViewTeam.propTypes = {
  teamObj: PropTypes.shape({
    team_name: PropTypes.string,
    logo: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
