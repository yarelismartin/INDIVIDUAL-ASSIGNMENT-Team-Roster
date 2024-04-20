import { useRouter } from 'next/router';
import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function TeamCards({ teamObj }) {
  const router = useRouter();

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div style={{ position: 'relative' }}>
        <Card.Img
          src={teamObj.logo}
          style={{ height: '150px', width: '150px', cursor: 'pointer' }}
          onClick={() => router.push(`/team/${teamObj.firebaseKey}`)}
          className="logo"
        />

        <h5 className={teamObj.is_public ? 'status-icon public' : 'status-icon private'}>&nbsp;</h5>
      </div>
    </div>
  );
}

TeamCards.propTypes = {
  teamObj: PropTypes.shape({
    logo: PropTypes.string,
    firebaseKey: PropTypes.string,
    is_public: PropTypes.bool,
  }).isRequired,
};
