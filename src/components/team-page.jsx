import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import TeamLogo from './team-logo';
import Team from './team';
import { getTeamsArticles, getTeamNames } from '../api';
import slug from 'slug';
import { teams } from '../dummy-data';

export default class TeamPage extends Component {
  state = {
    loading: true,
    articles: [],
    teamNames: {}
  };
  componentDidMount() {
    const { teamId } = this.props.match.params;
    Promise.all([getTeamNames(), getTeamsArticles(teamId)]).then(([teamNames, articles]) => {
      this.setState({ loading: false, articles, teamNames });
    });
  }
  render() {
    const { loading, articles, teamNames } = this.state;
    const { match } = this.props;
    const { teamId } = match.params;

    if (!loading && !teamNames.includes(teamId)) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Team id={teamId}>
          {team =>
            team === null ? (
              <h1>LOADING</h1>
            ) : (
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
                <h2 className="header">Articles</h2>
                <ul className="articles">
                  {articles.map(article => (
                    <li key={article.id}>
                      <Link to={`${match.url}/articles/${slug(article.title)}`}>
                        <h4 className="article-title">{article.title}</h4>
                        <div className="article-date">{article.date.toLocaleDateString()}</div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          }
        </Team>
      </div>
    );
  }
}
