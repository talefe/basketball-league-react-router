import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {getTeam} from '../api';
import useFetch from '../hooks/useFetch';
import TeamLogo from './team-logo';
import Loading from './loading';

export default function Team() {
  const {data: team, loading, error} = useFetch(getTeam);

  if (error) {
    console.warn(error);
    return <Redirect to="/" />;
  }

  if (loading) {
    return <Loading />;
  }

  const {name, id, established, manager, coach} = team;

  return (
    <div style={{width: '100%'}}>
      <TeamLogo id={id} className="center" />
      <h1 className="medium-header">{name}</h1>
      <ul className="info-list row">
        <li>
          Established<div>{established}</div>
        </li>
        <li>
          Manager<div>{manager}</div>
        </li>
        <li>
          Coach<div>{coach}</div>
        </li>
      </ul>
      <Link className="center btn-main" to={`/${id}`}>
        {name} Team Page
      </Link>
    </div>
  );
}
