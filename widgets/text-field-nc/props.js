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
    type: types.enum(['blur', 'throttled', 'immediate']),
  },
  {
    name: 'throttleDelay',
    group: 'functionality',
    type: types.number, // TODO positive number
  },
  ...props,
];
