import React, { useReducer, useEffect } from 'react';
import { Route, useLocation, useRouteMatch } from 'react-router-dom';
import Sidebar from './sidebar';
import { getTeamNames } from '../api';
import Team from './team';
import Loading from './loading';

function teamsReducer(state, action) {
  if (action.type === 'success') {
    return {
      teamNames: action.teamNames,
      loading: false,
      error: null
    };
  } else if (action.type === 'error') {
    return {
      ...state,
      error: action.error,
      loading: false
    };
  } else {
    throw new Error('Action type not supported');
  }
}

export default function Teams() {
  const location = useLocation();
  const match = useRouteMatch({ path: `/teams` });

  const [state, dispatch] = useReducer(teamsReducer, { teamNames: [], loading: true });

  useEffect(() => {
    async function getNames() {
      try {
        let teamNames = await getTeamNames();
        dispatch({ type: 'success', teamNames });
      } catch (error) {
        dispatch({ type: 'error', error });
      }
    }
    getNames();
  }, []);

  return (
    <div className="container two-column">
      <Sidebar
        loading={state.loading}
        title="Teams"
        list={state.teamNames}
        match={match}
        location={location}
      />

      {state.loading === false && location.pathname === '/teams' ? (
        <div className="sidebar-instruction">Select a team</div>
      ) : null}

      {state.loading && <Loading />}

      <Route path={`${match.url}/:teamId`}>
        <Team />
      </Route>
    </div>
  );
}
