import {useReducer, useEffect} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import {parse} from 'query-string';

function dataReducer(state, action) {
  if (action.type === 'success') {
    return {
      ...state,
      loading: false,
      error: null,
      data: action.payload,
    };
  } else if (action.type === 'error') {
    return {
      loading: false,
      error: action.payload,
      data: null,
    };
  } else {
    throw new Error('Action type not supported');
  }
}

export default function useFetch(request) {
  const [state, dispatch] = useReducer(dataReducer, {
    loading: true,
    data: null,
    error: null,
  });

  const params = useParams();
  const {search} = useLocation();

  useEffect(() => {
    let isSubscribed = true;
    (async function () {
      try {
        const data = await request(
          (search && {...parse(search)}) || (params && {...params}),
        );
        if (isSubscribed) {
          dispatch({type: 'success', payload: data});
        }
      } catch (error) {
        if (isSubscribed) {
          console.warn(error);
          dispatch({type: 'error', payload: error});
        }
      }
    })();
    return () => (isSubscribed = false);
  }, [request, params, search]);

  return state;
}
