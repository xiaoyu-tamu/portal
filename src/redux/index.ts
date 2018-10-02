import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { isDev, isBrowser } from '../utilities';
import { createLogger } from 'redux-logger';
import { loadingReducer, errorReducer } from './global';

const rootEpic = combineEpics();

const rootReducer = combineReducers({
  loading: loadingReducer,
  error: errorReducer
});

export function makeStore(initialState: any) {
  const composeEnhancers =
    (isDev && isBrowser && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  const epicMiddleware = createEpicMiddleware();
  const logger = createLogger({ collapsed: true });
  const reduxMiddleware = composeEnhancers(applyMiddleware(epicMiddleware, logger));

  const store = createStore(rootReducer, initialState, reduxMiddleware);
  epicMiddleware.run(rootEpic);

  return store;
}

export type RootState = ReturnType<typeof rootReducer>;
export { connect } from 'react-redux';
