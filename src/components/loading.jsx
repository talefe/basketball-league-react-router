import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Loading({ text = 'Loading', delay = 300 }) {
  const [textToShow, setTextToShow] = useState(text);

  useEffect(() => {
    const id = setInterval(() => {
      setTextToShow(textToShow =>
        textToShow === `${text}...` ? text : `${textToShow}.`,
      );
    }, delay);
    return () => clearInterval(id);
  }, [delay, text]);

  return (
    <div className="container">
      <p className="text-center">{textToShow}</p>
    </div>
  );
}

Loading.propTypes = {
  text: PropTypes.string,
  delay: PropTypes.number,
};
