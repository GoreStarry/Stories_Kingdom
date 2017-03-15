import { createStore, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'
import combineReducer from '../reducers/reduceAll.js';

let middleware = [ReduxThunk];
let finalCreateStore;


if (['production', 'testing'].indexOf(process.env.NODE_ENV) != -1) {
  finalCreateStore = applyMiddleware(...middleware)(createStore);
} else {

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  finalCreateStore = composeEnhancers(
    applyMiddleware(...middleware),
  )(createStore)

  var Immutable = require("immutable");
  var installDevTools = require("immutable-devtools");
  installDevTools(Immutable);

}


export function configureStore(initialState) {
  const store = finalCreateStore(combineReducer, initialState);
  return store;
}
