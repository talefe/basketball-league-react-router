import { useReducer, useEffect } from 'react';

function dataReducer(state, action) {
  if (action.type === 'success') {
    return {
      teamNames: action.teamNames,
      loading: false,
      error: null
    };
  } else if (action.type === 'error') {
    return {
      ...state,
      error: action.error,
      loading: false
    };
  } else {
    throw new Error('Action type not supported');
  }
}

export default function useFetch(url) {
  const [state, dispatch] = useReducer(dataReducer, {
    loading: true,
    data: null,
    error: null
  });

  useEffect(async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch({ type: 'success', data });
    } catch (error) {
      dispatch({ type: 'error', error });
    }
  }, [url]);

  return { ...state };
}
