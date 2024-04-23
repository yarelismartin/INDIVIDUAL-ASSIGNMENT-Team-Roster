import React from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { signIn } from '../utils/auth';

function Signin() {
  const router = useRouter();
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hi there!</h1>
      <p>Click the button below to login!</p>
      <Button type="button" size="lg" className="copy-btn" onClick={() => { signIn().then(() => { router.push('/'); }); }}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
