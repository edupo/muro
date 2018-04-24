import React from 'react';
import PropTypes from 'prop-types';

const ControlBar = (props) => {
  return (
    <div
      className="cb"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="cb-slider">
        <div className="cb-setting">
          <button
            onClick={() => props.playPause()}
            className="btn btn-playpause"
          >{props.paused ? <svg className="icon icon-play"><use xlinkHref="#icon-play" /></svg> : <svg className="icon icon-pause"><use xlinkHref="#icon-pause" /></svg>}
          </button>
        </div>

        <div className="cb-setting">
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
