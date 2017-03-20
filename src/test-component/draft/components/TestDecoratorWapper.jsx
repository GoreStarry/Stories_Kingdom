import React from 'react';

export default function TestDecoratorWapper(props) {
  console.log(props);

  const {test_data} = props.contentState.getEntity(props.entityKey).getData();
  const style = {
    color: 'red'
  }
  return (
    <span style={ style }>{ test_data }: { props.children }</span>
  )

}
