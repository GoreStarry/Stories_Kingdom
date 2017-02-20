import React from 'react';

export default function TestDecoratorWapper(props) {
  console.log(props);

  const {test_data} = props.contentState.getEntity(props.entityKey).getData();

  return (
    <span>{ test_data }: { props.children }</span>
  )

}
