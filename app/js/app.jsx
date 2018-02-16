
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


const DashBoardCol = (props) => (
  <div className="db-col">
    { props.bricks.map(brick => (
      <div
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
    { props.cols.map(col => (
      <DashBoardCol
        bricks={col.bricks}
      />
    ))}
  </div>
);


const DashBoard = (props) => (
  <div className={'db' + (props.currentScreen === props.db.id ? '' : ' hidden')}>
    { props.db.rows.map(row => (
      <DashBoardRow
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
    };
  }

  componentDidMount() {
    axios.get('/api/dashboards/')
      .then(res => {
        const timer = setInterval(this.tick.bind(this), 10000);
        this.setState({
          timer,
          dashboards: res.data.dashboards,
        });
      });
  }

  componentWillUnmount() {
    if (this.state.timer) {
      this.clearInterval(this.state.timer);
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


  render() {
    if (this.state.dashboards) {
      return (
        <div className="db-wrapper">
          {this.state.dashboards.map(db => (
            <DashBoard
              db={db}
              currentScreen={this.state.currentScreen}
            />
          ))}
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
