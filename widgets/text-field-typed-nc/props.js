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
      'pixel',
      'volume',
      'number',
      'integer',
      'double',
      'percent',
      'delay',
      'color',
    ]),
    required: true,
  },
  {
    name: 'hasSlider',
    group: 'type',
    type: types.enum(['', 'yes']),
    description: 'Only for numeric types.',
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
    name: 'step',
    group: 'type',
    type: types.any,
  },
  {
    name: 'changeComboMode',
    group: 'functionality',
    type: types.enum(['', 'whenClosed']),
    description:
      "'whenClosed': onChange is called only when combo is closed (only works with type = 'color').",
  },
  {
    name: 'useTips',
    group: 'tips',
    type: types.bool,
  },
  ...props,
];
