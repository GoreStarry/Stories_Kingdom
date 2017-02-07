import React from 'react';
import Immutable from 'immutable';

import BlockWapperTest from '../components/BlockWapperTest.jsx';

export default Immutable.Map({
  'superTitleBlock': {
    element: 'h1',
    wapper: <BlockWapperTest {...this.props} />
  }
})
