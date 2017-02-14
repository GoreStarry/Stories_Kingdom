import React from 'react';
import Immutable from 'immutable';

import BlockWapperTest from '../components/BlockWapperTest.jsx';


export const BlockRenderMap = Immutable.Map({
  'superTitleBlock': {
    element: 'h1',
    wrapper: <BlockWapperTest/>
  }
})


export function myBlockStyleFn(contentBlock) {
  const type = contentBlock.getType();
  switch (type) {
    case 'superTitleBlock':
      return 'super__title'
  }
}
