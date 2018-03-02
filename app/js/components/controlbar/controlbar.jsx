import React from 'react';
import PropTypes from 'prop-types';

const ControlBar = (props) => {
  return (
    <div
      className={"cb" + (props.show ? '' : ' is-hidden')}
      onClick={(e) => e.stopPropagation()}
    >
      <h2>muro dashboard settings</h2>
      <label htmlFor="cb-interval">Interval:</label>
      <input
        className="cb-input"
        type="number"
        value={props.interval}
        onChange={props.updateInterval}
        name="cb-interval"
        id="cb-interval"
      /> seconds
    </div>
  );
};

ControlBar.propTypes = {
  show: PropTypes.bool,
};

ControlBar.defaultProps = {
  show: false,
};

export default ControlBar;
