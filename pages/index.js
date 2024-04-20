import React from 'react';
import { useAuth } from '../utils/context/authContext';

export default function Home() {
  const { user } = useAuth();
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',
    }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1>{`Welcome to Rugby Roster Pro ${user.displayName}!`}</h1>
        <p>Get started by creating a team.</p>
      </div>
    </div>
  );
}
