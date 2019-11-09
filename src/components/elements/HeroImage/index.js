import React from 'react';
import PropTypes from 'prop-types';

import './HeroImage.css';

const HeroImage = props => {
  const { image, title, children } = props;
  return (
    <div
      className='rmdb-heroimage'
      style={{
        background: `linear-gradient(to bottom,rgba(0,0,0,0)
        39%,rgba(0,0,0,0)
        41%,rgba(0,0,0,0.65)
        100%),
        url('${image}'), #1c1c1c`,
      }}
    >
      <div className='rmdb-heroimage-content'>
        <div className='rmdb-heroimage-text'>
          <h1>{title}</h1>
          <p>{children}</p>
        </div>
      </div>
    </div>
  );
};

HeroImage.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default HeroImage;
