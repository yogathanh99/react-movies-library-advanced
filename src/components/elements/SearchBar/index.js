import React from 'react';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

import './SearchBar.css';

class SearchBar extends React.Component {
  state = {
    value: '',
  };
  timeout = null;

  handleChange = e => {
    this.setState({ value: e.target.value });
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.props.callback(this.state.value);
    }, 500);
  };

  render() {
    const {
      state: { value },
      handleChange,
    } = this;

    return (
      <div className='rmdb-searchbar'>
        <div className='rmdb-searchbar-content'>
          <FontAwesome className='rmdb-fa-search' name='search' size='2x' />
          <input
            type='text'
            className='rmdb-searchbar-input'
            placeholder='Input here...'
            onChange={handleChange}
            value={value}
          />
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  callback: PropTypes.func.isRequired,
};

export default SearchBar;
