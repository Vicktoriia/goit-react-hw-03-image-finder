import { useState  } from 'react';
import PropTypes from 'prop-types';
import { Header, Form, Button, ButtonLabel, Input } from './Searchbar.styled';

const Searchbar = ({ onSubmitForm })=>{
  const[name, setName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
   onSubmitForm(name);
    setName('');
  };

  const handleInputChange = e => {
    const { value } = e.currentTarget;
    setName(value.toLowerCase());
  };
    return (
      <Header className="searchbar">
        <Form onSubmit={handleSubmit}>
          <Button type="submit">
            <ButtonLabel>Search</ButtonLabel>
          </Button>
          <Input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="name"
            value={name}
            onChange={handleInputChange}
          />
        </Form>
      </Header>
    );
  }

Searchbar.propTypes = {
  name: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleInputChange: PropTypes.func,
};

export default Searchbar;
