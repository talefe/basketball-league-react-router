import React from 'react';
import { Redirect } from 'react-router-dom';
import { getArticle } from '../api';
import useFetch from '../hooks/useFetch';
import Loading from './loading';

export default function Article() {
  const { data: article, loading, error } = useFetch(getArticle);

  if (error) {
    console.warn(error);
    return <Redirect to="/" />;
  }

  if (loading) {
    return <Loading text="Loading article" />;
  }

  const { id, title, body } = article;

  return (
    <div className="panel">
      <article className="article" key={id}>
        <h1 className="header">{title}</h1>
        <p>{body}</p>
      </article>
    </div>
  );
}
