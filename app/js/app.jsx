
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';

import ControlBar from './components/controlbar';


const DashBoardCol = (props) => {
  const brickCount = props.bricks.length;
  return (
    <div className={"db-col db-col-" + props.colCount}>
      { props.bricks.map((brick, i) => (
        <div
          key={i}
          className={"db-brick db-brick-" + brickCount}
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
      showControlBar: false,
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
      });
    } else {
      const timer = setInterval(this.tick.bind(this), this.state.timerInterval * 1000);
      this.setState({
        timer,
      });
    }
  }

  rotateScreen() {
    let nextscreen = (this.state.currentScreen + 1) % this.state.dashboards.length;
    let isVisible = true;
    if (this.state.dashboards[nextscreen].fromtime) {
      let currentTime= moment();
      let fromtime = moment(this.state.dashboards[nextscreen].fromtime, "HH:mm:ss");
      let totime = moment(this.state.dashboards[nextscreen].totime, "HH:mm:ss");
      if (!currentTime.isBetween(fromtime, totime)) {
        isVisible = false;
      }
    }
    this.setState({
      currentScreen: nextscreen,
      isVisible,
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
              isVisible={this.state.isVisible}
            />
          ))}
          <button
            className="cb-toggler"
            href="#"
            onClick={() => this.setState({ showControlBar: !this.state.showControlBar })}
          >
            <svg
              className="icon icon-cog"
            >
              <use
                xlinkHref="#icon-cog"
              />
            </svg>
          </button>
          <ControlBar
            interval={this.state.timerInterval}
            updateInterval={this.updateInterval}
            show={this.state.showControlBar}
            playPause={this.playPause}
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
