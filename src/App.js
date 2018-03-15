import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HostGame from "./host/HostGame";
import PlayerGame from "./player/PlayerGame";
import Home from "./Home";

const App = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
      <hr />
      <Route exact path="/" component={Home} />
      <Route path="/host/game/:id" component={HostGame} />
      <Route path="/player/game/:id/:name" component={PlayerGame} />
    </div>
  </Router>

);

export default App;
