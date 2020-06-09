import {types} from 'goblin-gadgets/types/types.js';
import textFieldNCProps from '../text-field-nc/props';

const removedProps = ['format', 'parse', 'check'];
const props = textFieldNCProps.filter(
  (prop) => !removedProps.includes(prop.name)
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
      'integer',
      'double',
      'percent',
      'delay',
    ]),
    required: true,
  },
  {
    name: 'required',
    group: 'type',
    type: types.bool,
  },
  {
    name: 'defaultValue',
    group: 'type',
    type: types.any,
  },
  {
    name: 'min',
    group: 'type',
    type: types.any,
  },
  {
    name: 'max',
    group: 'type',
    type: types.any,
  },
  {
    name: 'useTips',
    group: 'tips',
    type: types.bool,
  },
  ...props,
];
