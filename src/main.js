import React, { Component } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import "semantic-ui-css/semantic.min.css";
import "./semanticRewrite.scss";

import { configureStore, history } from "./redux/store/index.js";

let store = configureStore();

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept("./redux/reducers/reduceAll.js", () => {
    const nextRootReducer = require("./redux/reducers/reduceAll.js");
    store.replaceReducer(nextRootReducer);
  });
}

import "./global.scss";
import AllViewNav from "./components/all-view-nav/AllNewNav.jsx";
import StoriesList from "./containers/Stories-List/StoriesList.jsx";
import DraftTest from "./test-component/draft/DraftVertical.jsx";
import CoverPage from "./containers/Cover-Page/CoverPage.jsx";
import ChapterList from "./containers/Chapter-List/ChapterList.jsx";
import StageEditor from "./containers/Stage-Editor/StageEditor.jsx";

// chapter list route should not in nav list, so I independent it
const routes = [
  {
    name: "Cover Page",
    path: "/",
    component: CoverPage,
    exact: true,
    inNav: true
  },
  {
    name: "Stories List",
    path: "/list",
    component: StoriesList,
    inNav: true
  },
  {
    name: "Chapter List",
    path: "/chapter/:story_id",
    component: ChapterList,
    inNav: false
  },
  {
    name: "Stage Editor",
    path: "/editor/:story_id/:article_id?/",
    component: StageEditor,
    inNav: false
  }
];

class MainContainer extends Component {
  componentDidCatch(error, info) {
    console.log(error);
    console.log(info);
  }
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <AllViewNav routes={routes} />
        </ConnectedRouter>
      </Provider>
    );
  }
}

render(<MainContainer />, document.getElementById("app"));
