import React from 'react';
import PropTypes from 'prop-types';

const ControlBar = (props) => {
  return (
    <div
      className="cb"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="cb-slider">
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
        <button
          onClick={() => props.playPause()}
          className="btn btn-playpause"
        >{props.paused ? 'Play' : 'Pause'}
        </button>
      </div>
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
