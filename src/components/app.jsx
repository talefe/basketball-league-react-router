import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './home';
import Players from './players';
import Teams from './teams';
import Navbar from './navbar';
import TeamPage from './team-page';
import Articles from './articles';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/players" component={Players} />
          <Route path="/teams" component={Teams} />
          <Route path="/:teamId" exact component={TeamPage} />
          <Route path="/:teamId/articles" component={Articles} />
          <Route render={() => <h1 className="text-center">Four oh Four...</h1>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
