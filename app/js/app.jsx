
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';

import ControlBar from './components/controlbar';


class DashBoardBrick extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      iframeKey: 0,
      refreshInterval: this.props.brick.refreshInterval,
    };
  }

  componentDidMount() {
    if (this.state.refreshInterval) {
      this.refresh();
    }
  }

  refresh() {
    setTimeout(() => {
      this.setState({
        iframeKey: this.state.iframeKey + 1,
      });
      this.refresh();
    }, this.state.refreshInterval);
  }

  render() {
    return (
      <div
        className={"db-brick db-brick-" + this.props.brickCount}
        style={{
          backgroundColor: this.props.brick.color,
          backgroundImage: this.props.brick.image && 'url("' + this.props.brick.image + '")',
        }}
      >
        {this.props.brick.iframe ?
          <iframe key={this.state.iframeKey} title={this.props.brick.name} src={this.props.brick.iframe} width="100%" height="100%"/> : ''}
      </div>
    );
  }
};


const DashBoardCol = (props) => {
  const brickCount = props.bricks.length;
  return (
    <div className={"db-col db-col-" + props.colCount}>
      { props.bricks.map((brick, i) => (
        <DashBoardBrick
          key={i}
          brick={brick}
          brickCount={brickCount}
        />
      ))}
    </div>
  );
};


const DashBoardRow = (props) => {
  const colCount = props.cols.length;
  return (
    <div className={"db-row db-row-" + props.rowCount}>
      {props.cols.map((col, i) => (
        <DashBoardCol
          key={i}
          bricks={col.bricks}
          colCount={colCount}
        />
      ))}
    </div>
  );
};


const DashBoard = (props) => {
  const rowCount = props.db.rows.length;
  return (
    <div className={'db ' + (props.currentScreen === props.order ? 'show' : 'hidden')}>
      {props.db.rows.map((row, i) => (
        <DashBoardRow
          key={i}
          cols={row.cols}
          rowCount={rowCount}
        />
      ))}
    </div>
  );
};

class DashBoardWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: 0,
      timer: null,
      dashboards: undefined,
      timerInterval: 10,
      paused: false,
    };
    this.updateInterval = this.updateInterval.bind(this);
    this.playPause = this.playPause.bind(this);
  }

  componentDidMount() {
    axios.get('json_feed/')
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

  playPause() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
      this.setState({
        timer: null,
        paused: true,
      });
    } else {
      const timer = setInterval(this.tick.bind(this), this.state.timerInterval * 1000);
      this.setState({
        timer,
        paused: false,
      });
    }
  }

  rotateScreen() {
    let nextscreen = (this.state.currentScreen + 1) % this.state.dashboards.length;
    let looking = true;
    const currentTime = moment();
    while (looking) {
      /* We need to check two things for this dashboard:
      1: is it active today?
      2: is it active at this time?

      We only need to check #2 is #1 is true.
       */
      const daysActive = this.state.dashboards[nextscreen].daysActive;
      let activeToday = true;
      if (daysActive.length > 0) {
        const today = moment().format('E').toString();
        if (!daysActive.includes(today)) {
          activeToday = false;
          nextscreen = (nextscreen + 1) % this.state.dashboards.length;
        }
      }
      if (activeToday) {
        if (this.state.dashboards[nextscreen].fromtime) {
          const fromtime = moment(this.state.dashboards[nextscreen].fromtime, 'HH:mm:ss');
          const totime = moment(this.state.dashboards[nextscreen].totime, 'HH:mm:ss');
          if (!currentTime.isBetween(fromtime, totime)) {
            nextscreen = (nextscreen + 1) % this.state.dashboards.length;
          } else {
            looking = false;
          }
        }
        else {
          looking = false;
        }
      }
    }
    this.setState({
      currentScreen: nextscreen,
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
        <div
          className="db-wrapper"
        >
          {this.state.dashboards.map((db, i) => (
            <DashBoard
              key={db.id}
              order={i}
              db={db}
              currentScreen={this.state.currentScreen}
            />
          ))}
          <ControlBar
            interval={this.state.timerInterval}
            updateInterval={this.updateInterval}
            playPause={this.playPause}
            paused={this.state.paused}
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
