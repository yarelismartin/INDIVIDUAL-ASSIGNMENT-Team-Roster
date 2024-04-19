import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createTeam, updateTeam } from '../../api/teamData';
/* import { updateTeam } from '../../api/teamData'; */

const initialValue = {
  team_name: '',
  logo: '',
};

export default function TeamForm({ teamObj }) {
  const [input, setInput] = useState(initialValue);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (teamObj.firebaseKey) setInput(teamObj);
  }, [teamObj, user]); /* why are these are deppendencies */

  const handleChange = (e) => {
    const { name, value } = e.target; /* got error when wrapping name, value in square brackets */
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...input, uid: user.uid };
    createTeam(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateTeam(patchPayload).then(() => router.push('/teams'));
    });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{teamObj.firebaseKey ? 'Update' : 'Create'} Team</h2>

        {/* TITLE INPUT  */}
        <Form.Group className="mb-3">
          <Form.Label>Name of Team</Form.Label>
          <Form.Control
            type="text"
            placeholder="Team Name..."
            name="team_name"
            value={input.team_name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Team Logo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a image address of the team logo..."
            name="logo"
            value={input.logo}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">{teamObj.firebaseKey ? 'Update' : 'Create'} Team</Button>
      </Form>
    </div>
  );
}

TeamForm.propTypes = {
  teamObj: PropTypes.shape({
    team_name: PropTypes.string,
    logo: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

TeamForm.defaultProps = {
  teamObj: initialValue,
};
