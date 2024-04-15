import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createMember, updateMember } from '../../api/memberData';

// with forms we need an inital value because when used to update and create each prop isn't required so the initial will be the default prop
const initialValue = {
  name: '',
  position: '',
  image: '',
};
/* forminput state variable is needed
1. so that our form control's value pull the key from our object.formInput
2. used in our handle submit when we update a memeber and pass it as the payload and create a member and pass it as th epayload along with the uid
3. setInput gets called  when we handlechange because we need to set our input to the new values
4. it's also ussed in the useeffect when we want to set the form values to the memObj values */
function MemberForm({ memObj }) {
  const [formInput, setFormInput] = useState(initialValue);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (memObj.firebaseKey) setFormInput(memObj);
  }, [memObj, user]);
  /* these dependencies are needed so it only runs if these are present */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  /* we need name and value to get the { key: value}
  we then set the form with the new changes made along with the prev
  values. name is wrapped in square bracket so that we are able to get key: value */

  const handleSubmit = (e) => {
    e.preventDefault();
    if (memObj.firebaseKey) {
      updateMember(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMember(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };
  /* need and if and else to handle create and update.
for update we call the api and pass it the forminput then re-route the user.
for create  we create a payload based on the forminputs to then pass to
our api call. and make the patchpayload for the firebased then reroute the user */

  return (
    <Form onSubmit={handleSubmit}>
      <h2>{memObj.firebaseKey ? 'Update' : 'Create'} Memeber</h2>

      {/* TITLE INPUT  */}
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Player's Name..."
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Position</Form.Label>
        <Form.Control
          type="text"
          placeholder="Player's Position..."
          name="position"
          value={formInput.position}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="text"
          placeholder="Eneter a image address of player"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button type="submit">{memObj.firebaseKey ? 'Update' : 'Create'} Memeber</Button>
    </Form>
  );
}

MemberForm.propTypes = {
  memObj: PropTypes.shape({
    name: PropTypes.string,
    position: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  memObj: initialValue,
};

export default MemberForm;
