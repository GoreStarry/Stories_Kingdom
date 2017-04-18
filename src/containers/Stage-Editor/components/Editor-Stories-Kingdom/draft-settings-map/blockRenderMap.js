import React from 'react';
import Immutable from 'immutable';

import CommentBlock from '../components/Comment-Block/CommentBlock.jsx';

export const blockRenderMap = Immutable.Map({
  'commendBlock': {
    element: 'div',
    wrapper: <CommentBlock />,
  }
})

export function blockStyleFn(contentBlock) {
  const type = contentBlock.getType();
  switch (type) {
    case 'commendBlock':
      return 'block__comment'
  }
}
