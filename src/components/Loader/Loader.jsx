import React from 'react';
import PropTypes from 'prop-types';
import { Oval } from 'react-loader-spinner';

const Loader = ({ loading }) => (
  <div>
    <Oval
      height="80"
      width="80"
      radius="9"
      color="#3f51b5"
      wrapperStyle={{ display: 'inline-block', textAlign: 'center' }}
      wrapperClassName=""
      visible={loading}
      ariaLabel="oval-loading"
    />
  </div>
);

Loader.propTypes = {
  loading: PropTypes.bool,
};

export default Loader;
