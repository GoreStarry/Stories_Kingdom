import React from 'react';
import { render } from 'react-dom';
import DraftTest from './test-component/draft/draft_vertical.jsx';

const MainContainer = () => (
  <DraftTest/>
);

render(<MainContainer />, document.getElementById('app'))
