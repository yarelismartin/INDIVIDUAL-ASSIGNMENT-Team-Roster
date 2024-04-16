import { useRouter } from 'next/router';
import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function TeamCards({ teamObj }) {
  const router = useRouter();
  return (
    <div>
      <Card.Img src={teamObj.logo} style={{ height: '200px', width: '200px' }} onClick={() => router.push(`/team/${teamObj.firebaseKey}`)} />
    </div>
  );
}

TeamCards.propTypes = {
  teamObj: PropTypes.shape({
    logo: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};
