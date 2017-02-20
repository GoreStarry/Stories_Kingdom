import { getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';

const {hasCommandModifier} = KeyBindingUtil;

function testKeyBindingFn(e) {
  console.log(e.keyCode);
  if (e.keyCode === 83 && hasCommandModifier(e)) {
    return 'myeditor-save';
  }
  return getDefaultKeyBinding(e);
}

export default testKeyBindingFn;

