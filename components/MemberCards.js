import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

export default function MemberCards({ memObj }) {
  return (
    <div>
      <Card border="warning" style={{ width: '18rem' }}>
        <Card.Header>{memObj.name}</Card.Header>
        <Card.Img variant="top" src={memObj.image} />
        <Card.Body>
          <Card.Title>Position:{memObj.position}</Card.Title>
          <Button style={{ backgroundColor: '#f4a261', border: 'none' }} className="m-2">🔍</Button>
          <Button style={{ backgroundColor: '#90a955', border: 'none' }}>✏️</Button>
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
  }).isRequired,
};
