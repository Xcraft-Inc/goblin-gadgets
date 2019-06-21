import {types} from 'goblin-gadgets/types/types.js';
import textFieldNCProps from '../text-field-nc/props';

const removedProps = ['format', 'parse', 'check'];
const props = textFieldNCProps.filter(
  prop => !removedProps.includes(prop.name)
);

export default [
  {
    name: 'type',
    group: 'type',
    type: types.enum([
      'date',
      'time',
      'datetime',
      'price',
      'weight',
      'length',
      'volume',
      'number',
      'percent',
      'delay',
    ]),
  },
  ...props,
];
