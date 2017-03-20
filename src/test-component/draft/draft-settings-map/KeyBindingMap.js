import { getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';

const {hasCommandModifier} = KeyBindingUtil;

function testKeyBindingFn(e) {
  // console.log(e.keyCode);
  const hasCommand = hasCommandModifier(e);
  switch (e.keyCode) {
    case ( hasCommand && 83):
      return 'myeditor-save';

    case ( hasCommand && 191):
      return 'commend-block';

    default:
      return getDefaultKeyBinding(e);
  }

}

export default testKeyBindingFn;

