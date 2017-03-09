import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory'

import { configureStore } from './redux/store/index.js';

let store = configureStore();

const history = syncHistoryWithStore(createBrowserHistory(), store);


import AllViewNav from './components/all-view-nav/AllNewNav.jsx';
import StoriesList from './containers/Stories-List/StoriesList.jsx';
import DraftTest from './test-component/draft/DraftVertical.jsx';
import CoverPage from './containers/Cover-Page/CoverPage.jsx';

const routes = [
  {
    name: 'Cover Page',
    path: '/',
    component: CoverPage
  },
  {
    name: 'Stories List',
    path: '/lists',
    component: StoriesList
  },
  {
    name: 'Draft Test',
    path: '/draft_test',
    component: DraftTest
  },
];

const MainContainer = () => (
  <Provider store={ store }>
    <Router history={ history }>
      <div>
        <AllViewNav routes={ routes } />
        <Switch>
          { routes.map((route, index) => {
              return <Route key={ route.path + index } {...route}></Route>
            }) }
        </Switch>
      </div>
    </Router>
  </Provider>
);

render(<MainContainer/>, document.getElementById('app'))
