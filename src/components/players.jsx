import React from 'react';
import { Link, Route, useParams, useLocation, useRouteMatch } from 'react-router-dom';
import Sidebar from './sidebar';
import { getPlayers } from '../api';
import slug from 'slug';
import Loading from './loading';
import useFetch from '../hooks/useFetch';

export default function Players() {
  const location = useLocation();
  const match = useRouteMatch({ path: `/players` });
  const { data: players, loading, error } = useFetch(getPlayers);

  if (error) {
    return <p>{error}</p>;
  }

  if (!players) {
    return <Loading />;
  }

  return (
    <div className="container two-column">
      <Sidebar
        loading={loading}
        title="Players"
        list={players.map(player => player.name)}
        match={match}
        location={location}
      />

      {location.pathname === match.path ? (
        <div className="sidebar-instruction">Select a player</div>
      ) : null}

      <Route path={`${match.url}/:playerId`}>
        <Player players={players} />
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
