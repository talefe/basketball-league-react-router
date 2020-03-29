import React from 'react';
import { Route, useLocation, useRouteMatch, Redirect } from 'react-router-dom';
import Sidebar from './sidebar';
import { getTeamsArticles } from '../api';
import Article from './article';
import Loading from './loading';
import useFetch from '../hooks/useFetch';

export default function Articles() {
  const location = useLocation();
  const match = useRouteMatch({ path: `/:teamId/articles` });

  const { data: articles, loading, error } = useFetch(getTeamsArticles);

  if (error) {
    console.warn(error);
    return <Redirect to="/" />;
  }

  if (loading) {
    return <Loading text="Loading articles" />;
  }

  return (
    <div className="container two-column">
      <Sidebar
        loading={loading}
        title="Articles"
        list={articles.map(({ title }) => title)}
        match={match}
        location={location}
      />
      {loading === false && location.pathname === match.path ? (
        <div className="sidebar-instruction">Select an article</div>
      ) : null}
      <Route path={`${match.path}/:articleId`}>
        <Article />
      </Route>
    </div>
  );
}
