/* eslint-disable react/no-children-prop */
import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import slug from 'slug';
import Loading from './loading';

Sidebar.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

CustomLink.propTypes = {
  to: PropTypes.object,
};

// eslint-disable-next-line react/prop-types
function CustomLink({ to, children }) {
  return (
    <Route
      path={to.pathname}
      children={({ match }) => (
        <li
          style={{
            listStyleType: 'none',
            fontWeight: match ? 'bold' : 'normal',
          }}
        >
          <Link to={to}>{children}</Link>
        </li>
      )}
    />
  );
}

export default function Sidebar({ title, list, loading, match, location }) {
  return loading ? (
    <Loading />
  ) : (
    <div>
      <h3 className="header">{title}</h3>
      <ul className="sidebar-list">
        {list.map(item => (
          <CustomLink
            key={item}
            to={{
              pathname: `${match.url}/${slug(item)}`,
              search: location.search,
            }}
          >
            {item.toUpperCase()}
          </CustomLink>
        ))}
      </ul>
    </div>
  );
}
