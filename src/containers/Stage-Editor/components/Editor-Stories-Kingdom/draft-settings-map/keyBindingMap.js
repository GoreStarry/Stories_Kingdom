import { getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';

const {hasCommandModifier} = KeyBindingUtil;

export function testKeyBindingFn(e) {
  // console.log(e.keyCode);
  const hasCommand = hasCommandModifier(e);
  switch (e.keyCode) {
    case ( hasCommand && 83):
      return 'myeditor-save';

    case ( hasCommand && 191):
      return 'commend-block';

    case ( hasCommand && 13):
      return 'new-block';

    default:
      return getDefaultKeyBinding(e);
  }

}


