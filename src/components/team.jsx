import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getTeam } from '../api';
import TeamLogo from './team-logo';

export default function Team() {
  let { teamId } = useParams();
  const [team, setTeam] = useState({});

  useEffect(() => {
    (async function() {
      const team = await getTeam(teamId);
      setTeam(team);
    })();
  }, [teamId]);

  return (
    <div style={{ width: '100%' }}>
      <TeamLogo id={teamId} className="center" />
      <h1 className="medium-header">{team.name}</h1>
      <ul className="info-list row">
        <li>
          Established<div>{team.established}</div>
        </li>
        <li>
          Manager<div>{team.manager}</div>
        </li>
        <li>
          Coach<div>{team.coach}</div>
        </li>
      </ul>
      <Link className="center btn-main" to={`/${teamId}`}>
        {team.name} Team Page
      </Link>
    </div>
  );
}
