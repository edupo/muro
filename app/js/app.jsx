
import React from 'react';
import ReactDOM from 'react-dom';

const DASHBOARDS = [
  {
    id: 0,
    rows: [
      {
        cols: [
          {
            tiles: [
              {
                color: '#00f',
                image: 'https://placekitten.com/500/502',
                iframe: 'http://mbl.is',
              },
            ],
          },
          {
            tiles: [
              {
                color: '#0ff',
                image: 'https://placekitten.com/500/501',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 1,
    rows: [
      {
        cols: [
          {
            tiles: [
              {
                color: '#00f',
                image: 'https://placekitten.com/500/502',
              },
            ],
          },
          {
            tiles: [
              {
                color: '#0ff',
                image: 'https://placekitten.com/500/501',
              },
            ],
          },
        ],
      },
      {
        cols: [
          {
            tiles: [
              {
                color: '#00f',
                image: 'https://placekitten.com/400/430',
                iframe: 'http://visir.is',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    rows: [
      {
        cols: [
          {
            tiles: [
              {
                color: '#ff0',
                image: 'https://placekitten.com/501/502',
              },
            ],
          },
        ],
      },
    ],
  },
];


const DashBoardCol = (props) => (
  <div className="db-col">
    { props.tiles.map(tile => (
      <div
        className="db-tile"
        style={{
          backgroundColor: tile.color,
          backgroundImage: 'url("' + tile.image + '")',
        }}
      >
        { tile.iframe ? <iframe src={tile.iframe} width="100%" height="100%" /> : '' }
      </div>
    ))}
  </div>
);


const DashBoardRow = (props) => (
  <div className="db-row">
    { props.cols.map(col => (
      <DashBoardCol
        tiles={col.tiles}
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
    };
  };

  componentDidMount() {
    let timer = setInterval(this.tick.bind(this), 10000);
    this.setState({timer});
  }
  componentWillUnmount() {
    this.clearInterval(this.state.timer);
  }

  rotateScreen() {
    this.setState({
      currentScreen: (this.state.currentScreen + 1) % DASHBOARDS.length,
    }, console.log(this.state.currentScreen));
  }

  tick() {
    this.rotateScreen();
  }


  render() {
    return (
      <div className="db-wrapper" onClick={() => this.rotateScreen()}>
        { DASHBOARDS.map(db => {
          return <DashBoard
            db={db}
            currentScreen={this.state.currentScreen}
          />;
        })};
      </div>
    );
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
