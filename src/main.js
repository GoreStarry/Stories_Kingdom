import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

var Immutable = require("immutable");
var installDevTools = require("immutable-devtools");
installDevTools(Immutable);

import AllViewNav from './components/all-view-nav/AllNewNav.jsx';
import StoriesList from './modules/Stories-List/StoriesList.jsx';
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
  <Router>
    <div>
      <AllViewNav routes={ routes } />
      <div>
        { routes.map((route, index) => {
            return <Route key={ route.path + index } {...route}></Route>
          }) }
      </div>
    </div>
  </Router>
);

render(<MainContainer/>, document.getElementById('app'))
