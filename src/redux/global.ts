import { isApiAction } from '~/utilities/redux';
import { AnyAction, Action } from 'typescript-fsa';
import { Dictionary } from '~/utilities/types';
import { AxiosResponse } from 'axios';
/**
 * set [LOADING] for async actions. Assume we have an action called
 * fetchUser, the action creator will generate three action types.
 *
 * [FETCH_USER_START], [FETCH_USER_DONE], [FETCH_USER_FAILED].
 *
 * we will set loading.FETCH_USER to true if and only if action is [FETCH_USER_STARTED]
 */
export const loadingReducer = (state = {}, action: AnyAction): Dictionary<boolean> => {
  const ret = isApiAction(action);
  // if not async api call, return state
  if (!ret) return state;
  return {
    ...state,
    [ret.name]: ret.state === 'STARTED'
  };
};

/**
 * set [ERROR] state for async actions. Assume we have an action called
 * fetchUser, the action creator will generate three action types.
 *
 * [FETCH_USER_START], [FETCH_USER_DONE], [FETCH_USER_FAILED].
 *
 * we will set error.FETCH_USER to true if and only if action is [FETCH_USER_FAILED]
 *
 * TODO: Make the error message more readable
 */

export const errorReducer = (state = {}, action: Action<AxiosResponse>): Dictionary<string> => {
  const ret = isApiAction(action);
  // if not async api call, return state
  if (!ret) return state;

  return {
    ...state,
    [ret.name]: ret.state === 'FAILED' ? action.payload.statusText : ''
  };
};
