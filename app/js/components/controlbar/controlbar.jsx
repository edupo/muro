import React from 'react';

const ControlBar = (props) => {
  return (
    <div className="cb">
      <input
        type="number"
        value={props.interval}
        onChange={props.updateInterval}
      />
    </div>
  );
};

export default ControlBar;
