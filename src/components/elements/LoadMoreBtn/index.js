import React from 'react';
import PropTypes from 'prop-types';

import './LoadMoreBtn.css';

const LoadMoreBtn = props => {
  const { onClick, children } = props;
  return (
    <div className='rmdb-loadmorebtn' onClick={onClick}>
      <p>{children}</p>
    </div>
  );
};

LoadMoreBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default LoadMoreBtn;
