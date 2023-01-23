import {ColorManipulator} from 'goblin-theme';
import {Unit} from 'goblin-theme';
const px = Unit.toPx;
const n = Unit.toValue;

/******************************************************************************/

export const propNames = ['checked', 'disabled', 'width'];

export default function styles(theme, props) {
  const {checked, disabled, width = '40px'} = props;
  const w = n(width);
  const h = n(width / 2);
  const m = w / 10;

  const bc = checked ? '#f00' : '0f0';

  const switchOnOff = {
    'position': 'relative',
    'width': px(w),
    'height': px(h),
    'borderRadius': px(h / 2),
    'backgroundColor': bc,
    'cursor': disabled ? null : 'pointer',
    ':hover': {
      backgroundColor: disabled ? null : ColorManipulator.darken(bc, 0.2),
    },
    ':active': {
      backgroundColor: disabled ? null : ColorManipulator.darken(bc, 0.4),
    },
  };

  const spike = {
    position: 'absolute',
    left: checked ? null : px(m),
    right: checked ? px(m) : null,
    width: px(h - m * 2),
    height: px(h - m * 2),
    backgroundColor: '#fff',
  };

  /******************************************************************************/

  return {
    switchOnOff,
    spike,
  };
}

/******************************************************************************/
