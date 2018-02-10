
import React from 'react';
import ReactDOM from 'react-dom';

const DASHBOARDS = [
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
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 3,
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
      />
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
  <div className="db">
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
    this.dashboards = DASHBOARDS.map(db => {
      return <DashBoard db={db} />;
    });
    this.state = {
      currentScreen: 0,
    };
  };

  rotateScreen() {
    this.setState({
      currentScreen: (this.state.currentScreen + 1) % this.dashboards.length,
    });
  }

  render() {
    return (
      <div className="db-wrapper" onClick={() => this.rotateScreen()}>
        {this.dashboards[this.state.currentScreen]}
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
