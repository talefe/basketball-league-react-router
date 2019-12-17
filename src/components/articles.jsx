import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Sidebar from './sidebar';
import { getTeamsArticles } from '../api';
import Article from './article';
import Loading from './loading';

export default class Articles extends Component {
  state = {
    loading: true,
    teamsArticles: []
  };
  componentDidMount() {
    const { teamId } = this.props.match.params;
    getTeamsArticles(teamId).then(articles => {
      this.setState({
        loading: false,
        teamsArticles: articles.map(articles => articles.title)
      });
    });
  }
  render() {
    const { loading, teamsArticles } = this.state;
    const { params, url } = this.props.match;
    const { teamId } = params;

    return loading ? (
      <Loading />
    ) : (
      <div className="container two-column">
        <Sidebar loading={loading} title="Articles" list={teamsArticles} {...this.props} />
        <Route
          path={`${url}/:articleId`}
          render={({ match }) => (
            <Article articleId={match.params.articleId} teamId={teamId}>
              {article =>
                !article ? (
                  <Loading />
                ) : (
                  <div className="panel">
                    <article className="article" key={article.id}>
                      <h1 className="header">{article.title}</h1>
                      <p>{article.body}</p>
                    </article>
                  </div>
                )
              }
            </Article>
          )}
        />
      </div>
    );
  }
}
