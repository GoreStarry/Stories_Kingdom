import React from 'react';
import { render } from 'react-dom';
import DraftTest from './test-component/draft/DraftVertical.jsx';

// var Immutable = require("immutable");

// var installDevTools = require("immutable-devtools");

// installDevTools(Immutable);

const MainContainer = () => (
  <DraftTest/>
);

render(<MainContainer/>, document.getElementById('app'))
