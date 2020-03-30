import React from 'react';
import {Route, useLocation, useRouteMatch, Redirect} from 'react-router-dom';
import Sidebar from './sidebar';
import {getTeamNames} from '../api';
import Team from './team';
import Loading from './loading';
import useFetch from '../hooks/useFetch';

export default function Teams() {
  const location = useLocation();
  const match = useRouteMatch({path: `/teams`});
  const {data: teamNames, loading, error} = useFetch(getTeamNames);

  if (error) {
    console.warn(error);
    return <Redirect to="/" />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container two-column">
      <Sidebar
        loading={loading}
        title="Teams"
        list={teamNames}
        match={match}
        location={location}
      />

      {loading === false && location.pathname === match.path ? (
        <div className="sidebar-instruction">Select a team</div>
      ) : null}

      <Route path={`${match.url}/:teamId`}>
        <Team />
      </Route>
    </div>
  );
}
