import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function Search({ onKeyUp }) {
  const handleChange = (e) => {
    onKeyUp(e.target.value.toLowerCase());
  };

  return (
    <div>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          name="search"
          onChange={handleChange}
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
      </Form>
    </div>
  );
}

Search.propTypes = {
  onKeyUp: PropTypes.func.isRequired,
};
