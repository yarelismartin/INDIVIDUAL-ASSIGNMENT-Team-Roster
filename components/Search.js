import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
/* import { useState } from 'react'; */

export default function Search({ onKeyUp }) {
  /* props should always be wrapped in curly brackets */
/*   const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    onKeyUp(value);
  }; */
  const handleChange = (e) => {
    onKeyUp(e.target.value.toLowerCase());
  };

  /* handle change is calledwhen a keyup occurs on the search bar
  we are taking that value and making sure it is lowecased  */

  return (
    <div style={{ margin: '0 auto', maxWidth: '400px' }}>
      <Form className="d-flex" style={{ marginTop: '30px', marginBottom: '20px' }}>
        <Form.Control
          type="search"
          placeholder="Search"
          name="search"
          onChange={handleChange}
          className="me-2"
          aria-label="Search"
          style={{ width: '100%' }}
        />
        <Button variant="primary">Search</Button>
      </Form>
    </div>
  );
}

Search.propTypes = {
  onKeyUp: PropTypes.func.isRequired,
};
