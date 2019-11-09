import React from 'react';
import PropTypes from 'prop-types';

import './Actor.css';

const Actor = ({ actor }) => {
  const POSTER_SIZE = 'w154';

  return (
    <div className='rmdb-actor'>
      <img
        src={
          actor.profile_path
            ? `${process.env.REACT_APP_IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
            : './images/no_image.jpg'
        }
        alt='actorthumb'
      />
      <span className='rmdb-actor-name'>{actor.name}</span>
      <span className='rmdb-actor-character'>{actor.chracter}</span>
    </div>
  );
};

Actor.propTypes = {
  actor: PropTypes.object.isRequired,
};

export default Actor;
