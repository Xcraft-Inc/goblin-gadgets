// @ts-check
import {propsList} from '../../types/props-list.js';
import {types} from '../../types/types.js';

export default propsList({
  ['aspect']: {
    inputType: {
      type: types.enumeration('', 'textarea', 'password'),
    },
    active: {
      type: types.boolean,
    },
    required: {
      type: types.boolean,
    },
    wrong: {
      type: types.boolean,
    },
    disabled: {
      type: types.boolean,
    },
    tooltip: {
      type: types.nabu,
    },
    shape: {
      type: types.shape,
    },
    show: {
      type: types.boolean,
    },
    visibility: {
      type: types.boolean,
    },
  },

  ['event']: {
    onUpDown: {
      type: types.function,
    },
    onChange: {
      type: types.function,
    },
    onFocus: {
      type: types.function,
    },
    onBlur: {
      type: types.function,
    },
    onValidate: {
      type: types.function,
      description: 'When "enter" is pressed.',
    },
  },

  ['text']: {
    value: {
      type: types.nabu,
    },
    hintText: {
      type: types.nabu,
    },
    readonly: {
      type: types.boolean,
    },
    rows: {
      type: types.number,
      min: 1,
      max: 20,
    },
    autoRows: {
      type: types.boolean,
    },
    minRows: {
      type: types.number,
      min: 0,
    },
    maxRows: {
      type: types.number,
      min: 1,
    },
    justify: {
      type: types.textJustify,
    },
  },

  ['layout']: {
    width: {
      type: types.pixel,
      min: 0,
      max: 1000,
    },
    stretchHeight: {
      type: types.boolean,
    },
    grow: {
      type: types.grow,
    },
  },
});
