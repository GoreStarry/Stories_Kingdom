import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory'
import 'semantic-ui-css/semantic.min.css';

import { configureStore } from './redux/store/index.js';

let store = configureStore();

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./redux/reducers/reduceAll.js', () => {
    const nextRootReducer = require('./redux/reducers/reduceAll.js');
    store.replaceReducer(nextRootReducer);
  });
}

// import { whyDidYouUpdate } from 'why-did-you-update'

// if (['production', 'testing'].indexOf(process.env.NODE_ENV) == -1) {
//   whyDidYouUpdate(React)
// }


const history = syncHistoryWithStore(createBrowserHistory(), store);

import './global.scss';
import AllViewNav from './components/all-view-nav/AllNewNav.jsx';
import StoriesList from './containers/Stories-List/StoriesList.jsx';
import DraftTest from './test-component/draft/DraftVertical.jsx';
import CoverPage from './containers/Cover-Page/CoverPage.jsx';
import ChapterList from './containers/Chapter-List/ChapterList.jsx';
import StageEditor from './containers/Stage-Editor/StageEditor.jsx';

// chapter list route should not in nav list, so I independent it
const routes = [
  {
    name: 'Cover Page',
    path: '/',
    component: CoverPage,
    exact: true
  },
  {
    name: 'Stories List',
    path: '/list',
    component: StoriesList
  },
  {
    name: 'Draft Test',
    path: '/draft_test',
    component: DraftTest
  },
];


class MainContainer extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router history={ history }>
          <AllViewNav routes={ routes }>
            <Switch>
              { routes.map((route, index) => {
                  return <Route key={ route.path + index } {...route}></Route>
                }) }
              <Route
                name="Chapter List"
                path='/chapter/:story_id'
                component={ ChapterList } />
              <Route
                name="Stage Editor"
                path='/editor/:story_id'
                component={ StageEditor } />
            </Switch>
          </AllViewNav>
        </Router>
      </Provider>
      );
  }
}


// const MainContainer = () => (
//   <Provider store={ store }>
//     <Router history={ history }>
//       <AllViewNav routes={ routes }>
//         <Switch>
//           { routes.map((route, index) => {
//               return <Route key={ route.path + index } {...route}></Route>
//             }) }
//         </Switch>
//       </AllViewNav>
//     </Router>
//   </Provider>
// );

render(<MainContainer/>, document.getElementById('app'))
