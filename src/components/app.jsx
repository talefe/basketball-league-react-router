import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './navbar';
import { useImported } from 'react-imported-component';
import Loading from './loading';

const Home = () => {
  const { imported: Home, loading } = useImported(() => import('./home'));

  return loading ? <Loading /> : <Home />;
};

const Teams = () => {
  const { imported: Teams, loading } = useImported(() => import('./teams'));

  return loading ? <Loading /> : <Teams />;
};

const Players = () => {
  const { imported: Players, loading } = useImported(() => import('./players'));

  return loading ? <Loading /> : <Players />;
};

const TeamPage = () => {
  const { imported: TeamPage, loading } = useImported(() =>
    import('./team-page'),
  );

  return loading ? <Loading /> : <TeamPage />;
};

const Articles = () => {
  const { imported: Articles, loading } = useImported(() =>
    import('./articles'),
  );

  return loading ? <Loading /> : <Articles />;
};

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
          <Route
            render={() => <h1 className="text-center">Four oh Four...</h1>}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
