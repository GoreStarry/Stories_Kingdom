import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, NavLinkyarn } from 'react-router-dom';
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory'

import { configureStore } from './redux/store/index.js';

let store = configureStore();

const history = syncHistoryWithStore(createBrowserHistory(), store);


import AllViewNav from './components/all-view-nav/AllNewNav.jsx';
import StoriesList from './containers/Stories-List/StoriesList.jsx';
import DraftTest from './test-component/draft/DraftVertical.jsx';

const routes = [
  {
    name: 'Stories List',
    path: '/',
    component: StoriesList
  },
  {
    name: 'Draft Test',
    path: '/draft_test',
    component: DraftTest
  }
];

const testPath = {
  path: '/',
  component: StoriesList
};


const MainContainer = () => (
  <Provider store={ store }>
    <Router history={ history }>
      <div>
        <AllViewNav routes={ routes } />
        <div>
          { routes.map((route, index) => {
              return <Route key={ route.path + index } {...route}></Route>
            }) }
        </div>
      </div>
    </Router>
  </Provider>
);

render(<MainContainer/>, document.getElementById('app'))
