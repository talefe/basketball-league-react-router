import React from 'react';
import { Link, Redirect, useRouteMatch, useParams } from 'react-router-dom';
import TeamLogo from './team-logo';
import { getTeamsArticles, getTeam } from '../api';
import slug from 'slug';
import Loading from './loading';
import useFetch from '../hooks/useFetch';

export default function TeamPage() {
  const { data: team, loading: teamLoading, error: teamError } = useFetch(
    getTeam,
  );
  const { data: articles, loading: articlesLoading } = useFetch(
    getTeamsArticles,
  );

  const match = useRouteMatch({ path: '/:teamId' });
  const { teamId } = useParams();

  if (teamLoading) {
    return <Loading />;
  }

  if (teamError) {
    return <Redirect to="/" />;
  }

  return (
    <div className="panel">
      <TeamLogo id={teamId} />
      <h1 className="medium-header">{team.name}</h1>
      <h4 style={{ margin: 0 }}>
        <Link
          style={{ cursor: 'pointer' }}
          to={{ pathname: '/players', search: `?teamId=${teamId}` }}
        >
          View Rooster
        </Link>
      </h4>
      <ul className="championships">
        {team.championships.map(year => (
          <li key={year}>{year}</li>
        ))}
      </ul>
      <ul className="info-list row" style={{ width: '100%' }}>
        <li>
          Established<div>{team.established}</div>
        </li>
        <li>
          Manager<div>{team.manager}</div>
        </li>
        <li>
          Coach<div>{team.coach}</div>
        </li>
        <li>
          Record
          <div>
            {team.wins} - {team.losses}
          </div>
        </li>
      </ul>
      {!articlesLoading && (
        <div>
          <h2 className="header">Articles</h2>
          <ul className="articles">
            {articles.map(article => (
              <li key={article.id}>
                <Link to={`${match.url}/articles/${slug(article.title)}`}>
                  <h4 className="article-title">{article.title}</h4>
                  <div className="article-date">
                    {article.date.toLocaleDateString()}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
