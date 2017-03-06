import { createStore, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'
import combineReducer from '../reducers/reduceAll.js';
import { persistState } from 'redux-devtools';


let middleware = [ReduxThunk];
let finalCreateStore;

if (process.env.NODE_ENV === 'production') {
  finalCreateStore = applyMiddleware(...middleware)(createStore);
} else {
  finalCreateStore = compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
    persistState(
      window.location.href.match(
        /[?&]debug_session=([^&]+)\b/
      )
    )
  )(createStore)
}


export function configureStore(initialState) {
  const store = finalCreateStore(combineReducer, initialState);
  return store;
}
