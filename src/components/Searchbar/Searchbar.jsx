import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Header, Form, Button, ButtonLabel, Input } from './Searchbar.styled';

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    pictures: [],
  };

  handleSubmit = e => {
    e.preventDefault();

    const { name } = this.state;
    const normilizedName = name.trim();

    this.props.onSubmit(normilizedName);
    this.setState({ name: normilizedName });

    if (!normilizedName) {
      toast.warning('Please, enter your search query.');
    }
  };

  handleInputChange = e => {
    const { value } = e.currentTarget;
    this.setState({ name: value.toLowerCase() });
  };

  render() {
    return (
      <Header className="searchbar">
        <Form onSubmit={this.handleSubmit}>
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
            value={this.state.name}
            onChange={this.handleInputChange}
          />
        </Form>
      </Header>
    );
  }
}
Searchbar.propTypes = {
  name: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleInputChange: PropTypes.func,
};

export default Searchbar;
