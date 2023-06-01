// @ts-check
import {types} from 'goblin-gadgets/types/types.js';
import textInputInfoNCProps from '../text-input-info-nc/props';
import {propsList} from '../../types/props-list.js';

const props = textInputInfoNCProps.map((prop) => {
  if (prop.name === 'value') {
    return {
      ...prop,
      type: types.any,
    };
  }
  return prop;
});

const ownProps = propsList({
  ['functionality']: {
    format: {
      type: types.function,
    },
    parse: {
      type: types.function,
    },
    changeMode: {
      type: types.enumeration('blur', 'throttled', 'immediate', 'passthrough'),
      description:
        "'blur': onChange is called only on blur.\n'throttled': onChange is called on blur and every X ms (see 'throttleDelay').\n'immediate': onChange is called on each key press.\n'passthrough': value and onChange are directly given to the underlying input.",
    },
    throttleDelay: {
      type: types.number,
      min: 0,
      max: 10000,
    },
  },
});

export default [...ownProps, ...props];
