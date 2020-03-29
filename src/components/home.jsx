import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TeamLogo from './team-logo';
import { getTeamNames } from '../api';

export default function Home() {
  const [teamNames, setTeamNames] = useState([]);

  useEffect(() => {
    (async function() {
      try {
        const names = await getTeamNames();
        setTeamNames(names);
      } catch (error) {
        console.warn(error);
      }
    })();
  }, [teamNames]);

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
