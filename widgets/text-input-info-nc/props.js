import {types, addType} from 'goblin-gadgets/types/types.js';
import PropTypes from 'prop-types';
import textInputNCProps from '../text-input-nc/props';

/******************************************************************************/

addType('checkFunction', {
  type: 'checkFunction',
  widget: 'combo',
  readonly: true,
  samples: [
    {text: 'Test length 5/10/15', value: 'T1'},
    {text: 'Test empty', value: 'T2'},
  ],
  samplesData: {
    T1: function(value) {
      if (value && value.length >= 15) {
        return {info: 'Attention', warning: 'Vraiment trop long'};
      } else if (value && value.length >= 10) {
        return {warning: 'Trop long'};
      } else if (value && value.length >= 5) {
        return {info: 'Bientôt trop long'};
      }
    },
    T2: function(value) {
      if (!value) {
        return {warning: 'Donnez une valeur'};
      }
    },
  },
  propType: PropTypes.func,
});

/******************************************************************************/

export default [
  {
    name: 'check',
    group: 'info',
    type: types.checkFunction,
  },
  {
    name: 'warning',
    group: 'info',
    type: types.nabu,
  },
  {
    name: 'info',
    group: 'info',
    type: types.nabu,
  },
  ...textInputNCProps,
];
