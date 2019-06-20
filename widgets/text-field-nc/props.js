import {types} from 'goblin-gadgets/types/types.js';
import textInputNCProps from '../text-input-nc/props';

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
  ...textInputNCProps,
];
