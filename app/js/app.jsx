
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import ControlBar from './components/controlbar';


const DashBoardCol = (props) => (
  <div className="db-col">
    { props.bricks.map((brick, i) => (
      <div
        key={i}
        className="db-brick"
        style={{
          backgroundColor: brick.color,
          backgroundImage: 'url("' + brick.image + '")',
        }}
      >
        { brick.iframe ? <iframe src={brick.iframe} width="100%" height="100%" /> : '' }
      </div>
    ))}
  </div>
);


const DashBoardRow = (props) => (
  <div className="db-row">
    { props.cols.map((col, i) => (
      <DashBoardCol
        key={i}
        bricks={col.bricks}
      />
    ))}
  </div>
);


const DashBoard = (props) => (
  <div className={'db' + (props.currentScreen === props.db.id ? '' : ' hidden')}>
    { props.db.rows.map((row, i) => (
      <DashBoardRow
        key={i}
        cols={row.cols}
      />
    ))}
  </div>
);


class DashBoardWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: 0,
      timer: null,
      dashboards: undefined,
      timerInterval: 10,
    };
    this.updateInterval = this.updateInterval.bind(this);
  }

  componentDidMount() {
    axios.get('/api/dashboards/')
      .then(res => {
        const timer = setInterval(this.tick.bind(this), this.state.timerInterval * 1000);
        this.setState({
          timer,
          dashboards: res.data.dashboards,
        });
      });
  }

  componentWillUnmount() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
    }
  }

  rotateScreen() {
    this.setState({
      currentScreen: (this.state.currentScreen + 1) % this.state.dashboards.length,
    });
  }

  tick() {
    this.rotateScreen();
  }

  updateInterval(event) {
    clearInterval(this.state.timer);
    const newInterval = event.target.value;
    const timer = setInterval(this.tick.bind(this), newInterval * 1000);
    this.setState({
      timer,
      timerInterval: newInterval,
    });
  }


  render() {
    if (this.state.dashboards) {
      return (
        <div className="db-wrapper">
          {this.state.dashboards.map(db => (
            <DashBoard
              key={db.id}
              db={db}
              currentScreen={this.state.currentScreen}
            />
          ))}
          <ControlBar
            interval={this.state.timerInterval}
            updateInterval={this.updateInterval}
          />
        </div>
      );
    }
    return (<div>Loading...</div>);
  }
}


const App = () => (
  <div id="content">
    <DashBoardWrapper />
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
