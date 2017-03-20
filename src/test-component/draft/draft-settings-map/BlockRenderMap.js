import React from 'react';
import Immutable from 'immutable';

import BlockWapperTest from '../components/BlockWapperTest.jsx';
import CommentBlock from '../components/CommentBlock.jsx';

export const BlockRenderMap = Immutable.Map({
  'superTitleBlock': {
    element: 'h1',
    wrapper: <BlockWapperTest/>
  },
  'commendBlock': {
    element: 'div',
    wrapper: <CommentBlock/>
  }
})


export function myBlockStyleFn(contentBlock) {
  const type = contentBlock.getType();
  switch (type) {
    case 'superTitleBlock':
      return 'super__title'
    case 'commendBlock':
      return 'block__comment'
  }
}
