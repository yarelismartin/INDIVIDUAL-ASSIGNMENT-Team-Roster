import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function MemberCards() {
  return (
    <div>
      <Card border="warning" style={{ width: '18rem' }}>
        <Card.Header>name</Card.Header>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Position:</Card.Title>
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
