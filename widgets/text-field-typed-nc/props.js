// @ts-check
import {types} from 'goblin-gadgets/types/types.js';
import textFieldNCProps from '../text-field-nc/props';
import {propsList} from '../../types/props-list.js';

const removedProps = ['format', 'parse', 'check'];
const props = textFieldNCProps.filter(
  (prop) => !removedProps.includes(prop.name)
);

const ownProps = propsList({
  ['type']: {
    type: {
      type: types.enumeration(
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
        'percentage',
        'delay',
        'color'
      ),
      required: true,
    },
    shift: {
      type: types.number,
    },
    hasSlider: {
      type: types.enumeration('', 'yes'),
      description: 'Only for numeric types.',
    },
    required: {
      type: types.boolean,
    },
    defaultValue: {
      type: types.any,
    },
    min: {
      type: types.any,
    },
    max: {
      type: types.any,
    },
    step: {
      type: types.any,
    },
  },

  ['functionality']: {
    changeComboMode: {
      type: types.enumeration('', 'whenClosed'),
      description:
        "'whenClosed': onChange is called only when combo is closed (only works with type = 'color').",
    },
  },

  ['tips']: {
    useTips: {
      type: types.boolean,
    },
  },
});

export default [...ownProps, ...props];
