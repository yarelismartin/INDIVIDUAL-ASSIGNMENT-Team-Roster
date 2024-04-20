import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { deleteSingleMember } from '../api/memberData';
import { getTeams } from '../api/teamData';
import { useAuth } from '../utils/context/authContext';

export default function MemberCards({ memObj, onUpdate }) {
  /* when del we need to:
  1. make a confirmation message
  2. call our del api and pass it the correct  argument
  3. .then call the onUpdate function */
  const deleteMember = () => {
    if (window.confirm(`Are you sure you want to delete ${memObj.name}?`)) {
      deleteSingleMember(memObj.firebaseKey).then(onUpdate);
    }
  };

  // State to hold the team name value
  const [teamNameValue, setTeamNameValue] = useState(null);
  const { user } = useAuth();

  // Function to get the team name asynchronously
  const getTeamName = async () => {
    // Fetch teams based on user's UID
    const teams = await getTeams(user.uid);

    // Find the team with the matching ID
    const foundTeam = teams.find((team) => team.firebaseKey === memObj.team_id);

    // Return the team name if found, otherwise return a default value
    return foundTeam ? foundTeam.team_name : 'Team Not Found';
  };

  // Effect to fetch and update team name value when memObj.team_id changes
  useEffect(() => {
    // Call the teamName function to get the team name asynchronously
    getTeamName().then((result) => {
      // Set the teamNameValue state with the fetched team name
      setTeamNameValue(result);
    });
    // Update team name when memObj.team_id changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memObj.team_id]);

  return (
    <div style={{ marginBottom: '25px' }}>
      <div
        style={{
          backgroundColor: '#f8f9fa', padding: '3px', marginBottom: '0.5rem', borderRadius: '10px',
        }}
      >
        <div className="fw-semibold fs-4 text-center mb-3" style={{ marginTop: '5px' }}>{memObj.name}</div>
      </div>
      <Card style={{ width: '18rem', borderRadius: '10px' }}>
        <Card.Img variant="top" src={memObj.image} style={{ objectFit: 'cover', height: '200px' }} />
        <Card.Body className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="text-center w-100" style={{ marginBottom: '25px' }}>
            {memObj.uid === user.uid && (
            <><Card.Title style={{ fontSize: 'inherit', fontWeight: 400, margin: 5 }}> Team: {teamNameValue}</Card.Title>
            </>
            )}
            <Card.Title style={{ fontSize: 'inherit', fontWeight: 400, margin: 5 }}>Position: {memObj.position}</Card.Title>
          </div>
          <div className="d-flex flex-column align-items-center ml-auto">
            {memObj.uid === user.uid && (
            <>
              <Link href={`/member/edit/${memObj.firebaseKey}`} passHref>
                <Button style={{
                  backgroundColor: '#90a955', border: 'none', width: '100%', marginBottom: '5px', marginRight: '0',
                }}
                >✏️
                </Button>
              </Link>
              <Button style={{ backgroundColor: '#ef5d60', border: 'none', width: '100%' }} className="m-2" onClick={deleteMember}>
                🗑️
              </Button>
            </>
            )}

          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

MemberCards.propTypes = {
  memObj: PropTypes.shape({
    name: PropTypes.string,
    position: PropTypes.string,
    image: PropTypes.string,
    team_id: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
