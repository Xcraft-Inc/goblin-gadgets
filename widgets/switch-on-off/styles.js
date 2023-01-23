import {ColorManipulator} from 'goblin-theme';
import {Unit} from 'goblin-theme';
const px = Unit.toPx;
const n = Unit.toValue;

/******************************************************************************/

export const propNames = ['checked', 'disabled', 'width'];

export default function styles(theme, props) {
  const {checked, disabled, width = '60px'} = props;
  const w = n(width);
  const h = (n(width) * 2) / 5;
  const m = w / 15;

  const bc = checked ? '#1fc41f' : '#ff0000'; // green / red

  const switchOnOff = {
    'position': 'relative',
    'width': px(w),
    'height': px(h),
    'borderRadius': px(h / 2),
    'backgroundColor': disabled ? ColorManipulator.lighten(bc, 0.7) : bc,
    'display': 'flex',
    'flexDirection': 'row',
    'alignItems': 'center',
    'justifyContent': checked ? 'flex-start' : 'flex-end',
    'cursor': disabled ? null : 'pointer',
    ':hover': {
      backgroundColor: disabled ? null : ColorManipulator.darken(bc, 0.1),
    },
    ':active': {
      backgroundColor: disabled ? null : ColorManipulator.darken(bc, 0.2),
    },
  };

  const spike = {
    position: 'absolute',
    top: px(m),
    left: checked ? null : px(m),
    right: checked ? px(m) : null,
    width: px(h - m * 2),
    height: px(h - m * 2),
    backgroundColor: '#fff',
    borderRadius: px(h / 2),
  };

  const text = {
    margin: px(m * 2),
    color: '#fff',
    fontSize: px(h * 0.6),
  };

  /******************************************************************************/

  return {
    switchOnOff,
    spike,
    text,
  };
}

/******************************************************************************/
