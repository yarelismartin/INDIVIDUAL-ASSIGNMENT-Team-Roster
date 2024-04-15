import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default function MemberCards({ memObj }) {
  return (
    <div>
      <Card border="warning" style={{ width: '18rem' }}>
        <Card.Header className="fw-semibold fs-4">{memObj.name}</Card.Header>
        <Card.Img variant="top" src={memObj.image} style={{ objectFit: 'cover', height: '200px' }} />
        <Card.Body>
          <Card.Title style={{ fontSize: 'inherit', fontWeight: 400 }}>Position: {memObj.position}</Card.Title>
          <Link href={`/member/edit/${memObj.firebaseKey}`} passHref>
            <Button style={{ backgroundColor: '#90a955', border: 'none' }}>✏️</Button>
          </Link>
          <Button style={{ backgroundColor: '#ef5d60', border: 'none' }} className="m-2">
            🗑️
          </Button>

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
    firebaseKey: PropTypes.string,
  }).isRequired,
};
