import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './home';
import Players from './players';
import Teams from './teams';
import Navbar from './navbar';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/players" component={Players} />
            <Route path="/teams" component={Teams} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
