import React from 'react';
import { Link } from 'react-router-dom';
import TeamLogo from './team-logo';
import { getTeamNames } from '../api';
import Loading from './loading';
import useFetch from '../hooks/useFetch';

export default function Home() {
  const { data: teamNames, loading, error } = useFetch(getTeamNames);

  if (error) {
    return <p>{error}</p>;
  }

  if (loading) {
    return <Loading text="Loading Home" />;
  }

  return (
    <div className="container">
      <h1 className="large-header">Hash History Basketball League</h1>
      <h3 className="header text-center">Select a team</h3>
      <div className="home-grid">
        {teamNames.map(id => (
          <Link key={id} to={`/${id}`}>
            <TeamLogo id={id} width="125px" />
          </Link>
        ))}
      </div>
    </div>
  );
}
