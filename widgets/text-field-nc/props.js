import {types} from 'goblin-gadgets/types/types.js';
import textInputInfoNCProps from '../text-input-info-nc/props';

const props = textInputInfoNCProps.map(prop => {
  if (prop.name === 'value') {
    return {
      ...prop,
      type: types.any,
    };
  }
  return prop;
});

export default [
  {
    name: 'format',
    group: 'functionality',
    type: types.function,
  },
  {
    name: 'parse',
    group: 'functionality',
    type: types.function,
  },
  {
    name: 'changeMode',
    group: 'functionality',
    type: types.enum(['blur', 'throttled', 'immediate', 'passthrough']),
    description:
      "'blur': onChange is called only on blur. 'throttled': onChange is called on blur and every X ms (see 'throttleDelay'). 'immediate': onChange is called on each key press. 'passthrough': value and onChange are directly given to the underlying input.",
  },
  {
    name: 'throttleDelay',
    group: 'functionality',
    type: types.number, // TODO positive number
  },
  ...props,
];
