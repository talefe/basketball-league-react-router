import React, { useReducer, useEffect } from 'react';
import { Link, Route, useParams, useLocation, useRouteMatch } from 'react-router-dom';
import Sidebar from './sidebar';
import { getPlayers } from '../api';
import { parse } from 'query-string';
import slug from 'slug';
import Loading from './loading';

function playersReducer(state, action) {
  if (action.type === 'success') {
    return {
      loading: false,
      players: action.players,
      error: null
    };
  } else if (action.type === 'error') {
    return {
      ...state,
      loading: false,
      error: action.error
    };
  } else {
    throw new Error('Action type not supported');
  }
}

export default function Players() {
  const location = useLocation();
  const match = useRouteMatch({ path: `/players` });

  const [state, dispatch] = useReducer(playersReducer, {
    players: [],
    loading: true
  });

  useEffect(() => {
    async function fetchPlayers(teamId) {
      try {
        let players = await getPlayers(teamId);
        dispatch({ type: 'success', players });
      } catch (error) {
        dispatch({ type: 'error', error });
      }
    }
    location.search ? fetchPlayers(parse(location.search).teamId) : fetchPlayers();
  }, [location]);

  return (
    <div className="container two-column">
      <Sidebar
        loading={state.loading}
        title="Players"
        list={state.players.map(player => player.name)}
        match={match}
        location={location}
      />

      {state.loading === false && location.pathname === '/players' ? (
        <div className="sidebar-instruction">Select a player</div>
      ) : null}
      {state.loading && <Loading />}

      <Route path={`${match.url}/:playerId`}>
        <Player players={state.players} />
      </Route>
    </div>
  );
}

function Player({ players }) {
  let { playerId } = useParams();

  const { name, position, teamId, number, avatar, apg, ppg, rpg, spg } = players.find(
    player => slug(player.name) === playerId
  );

  return (
    <div className="panel">
      <img className="avatar" src={avatar} alt={`${name}'s avatar`} />
      <h1 className="medium-header">{name}</h1>
      <h3 className="header">#{number}</h3>
      <div className="row">
        <ul className="info-list" style={{ marginRight: 80 }}>
          <li>
            Team
            <div>
              <Link style={{ color: '#68809a' }} to={`/${teamId}`}>
                {teamId[0].toUpperCase() + teamId.slice(1)}
              </Link>
            </div>
          </li>
          <li>
            Position <div>{position}</div>
          </li>
          <li>
            PPG <div>{ppg}</div>
          </li>
        </ul>
        <ul className="info-list">
          <li>
            APG<div>{apg}</div>
          </li>
          <li>
            SPG <div>{spg}</div>
          </li>
          <li>
            RPG <div>{rpg}</div>
          </li>
        </ul>
      </div>
    </div>
  );
}
