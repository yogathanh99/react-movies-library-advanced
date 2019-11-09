import React from 'react';
import PropTypes from 'prop-types';

import './FourColGrid.css';

const FourColGrid = props => {
  const { header, loading, children } = props;
  return (
    <div className='rmdb-grid'>
      {header && !loading ? <h1>{header}</h1> : null}
      <div className='rmdb-grid-content'>
        {children.map((element, i) => (
          <div key={i} className='rmdb-grid-element'>
            {element}
          </div>
        ))}
      </div>
    </div>
  );
};

FourColGrid.propTypes = {
  header: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

export default FourColGrid;
