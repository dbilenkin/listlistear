import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Game from "./Game";

function createNewGame() {
  return Math.floor(Math.random() * 100);
}

const HostButton = ({ title, id, history }) => (
  <button type="button" onClick={() => history.push("/game/" + id)}>
    {title}
  </button>
);

const JoinButton = (props) => (
  <button
    type="button"
    onClick={() => props.history.push("/game/" + props.id)}
  >
    Join Game
  </button>
);

const HostGame = () => (
  <Route
    path="/"
    render={props => (
      <HostButton {...props} title="Host Game" id={createNewGame()} />
    )}
  />
);

const JoinGame = (parentProps) => (
  <div>
    <label>
      Game Id:
      <input
        type="text"
        value={parentProps.id}
        onChange={parentProps.onChange}
      />
    </label>
    <Route
      path="/"
      render={props => <JoinButton {...props} id={parentProps.id}/>}
    />
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: ""
    };

    this.handlePickGame = this.handlePickGame.bind(this);
  }

  handlePickGame(event) {
    this.setState({ gameId: event.target.value });
  }

  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
          </ul>
          <HostGame />
          <JoinGame id={this.state.gameId} onChange={this.handlePickGame}/>
          <hr />
          <Route exact path="/" component={Home} />
          <Route path="/game/:id" component={Game} />
          <Route path="/topics" component={Topics} />
        </div>
      </Router>
    );
  }
}

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

export default App;
