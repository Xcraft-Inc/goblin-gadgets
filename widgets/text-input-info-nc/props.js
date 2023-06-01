// @ts-check
import {types, addType} from 'goblin-gadgets/types/types.js';
import textInputNCProps from '../text-input-nc/props';
import {func} from 'xcraft-core-stones';
import {propsList} from '../../types/props-list.js';

/******************************************************************************/

addType('checkFunction', {
  type: func,
  widget: 'combo',
  restrictsToList: true,
  samples: [
    {value: 'T1', text: 'Test length 5/10/15'},
    {value: 'T2', text: 'Test empty'},
    {value: 'T3', text: 'Test password'},
  ],
  samplesData: {
    T1: function (value) {
      if (value && value.length >= 15) {
        return {info: 'Attention', warning: 'Vraiment trop long !'};
      } else if (value && value.length >= 10) {
        return {warning: 'Trop long'};
      } else if (value && value.length >= 5) {
        return {info: 'Bientôt trop long'};
      }
    },
    T2: function (value) {
      if (!value) {
        return {warning: 'Donnez une valeur'};
      }
    },
    T3: function (value) {
      if (!value) {
        return {info: 'Donnez votre mot de passe'};
      } else if (value && value.length < 8) {
        return {warning: 'Mot de passe trop court'};
      }
    },
  },
});

/******************************************************************************/

const ownProps = propsList({
  ['info']: {
    check: {
      type: types.checkFunction,
      description: 'Function to validate the text entered by the user.',
    },
    warning: {
      type: types.nabu,
    },
    info: {
      type: types.nabu,
    },
  },
});

export default [...textInputNCProps, ...ownProps];
