import * as Bool from 'gadgets/helpers/bool-helpers';
import {Unit} from 'electrum-theme';

/******************************************************************************/

export const propNames = [
  'kind',
  'color',
  'layer',
  'shape',
  'disabled',
  'size',
];

export default function styles(theme, props) {
  const {kind, color, layer, shape, disabled, size} = props;

  let boxWidth = theme.shapes.lineHeight;
  let boxHeight = theme.shapes.lineHeight;
  let boxAlignSelf = null;
  let boxPosition = null;
  let boxRight = null;
  let boxTop = null;
  let boxMargin = null;
  let labelHeight = theme.shapes.badgeHeight;
  let labelRadius = theme.shapes.badgeRadius;
  let foregroundColor = theme.palette.badgeText;

  let backgroundColor = theme.palette.badgeBackground;
  if (color) {
    switch (color) {
      case 'red':
        backgroundColor = theme.palette.markSecondary;
        break;
      case 'dark':
        backgroundColor = theme.palette.markDark;
        break;
      case 'green':
      default:
        backgroundColor = theme.palette.markSuccess;
    }
  }

  if (kind === 'chronos-count' || kind === 'identical-count') {
    foregroundColor = theme.palette.chronoBadgeText;
    backgroundColor = theme.palette.chronoBadgeBackground;
  }

  // If badge has layer='over', place it on top-right corner of parent.
  if (layer === 'over') {
    boxPosition = 'absolute';
    boxRight = '0px';
    boxTop = '0px';
  }
  if (layer === 'top-right') {
    boxPosition = 'absolute';
    boxRight = '-7px';
    boxTop = '-7px';
  }

  if (shape === 'circle') {
    labelRadius = Unit.multiply(theme.shapes.lineHeight, 0.5);
  }

  if (Bool.isTrue(disabled)) {
    backgroundColor = theme.palette.buttonDisableBackground;
  }

  const box = {
    width: boxWidth,
    height: boxHeight,
    alignSelf: boxAlignSelf,
    margin: boxMargin,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: boxPosition,
    right: boxRight,
    top: boxTop,
    transform: size ? `scale(${size})` : null,
  };

  const m = Unit.multiply(labelHeight, 0.25);
  const w = Unit.sub(labelHeight, Unit.multiply(m, 2.0));

  const label = {
    minWidth: w,
    height: labelHeight,
    borderRadius: labelRadius,
    padding: '0px ' + m + ' 1px ' + m,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: Unit.multiply(theme.shapes.badgeTextSize, theme.typo.fontScale),
    fontWeight: 'bold',
    color: foregroundColor,
    backgroundColor: backgroundColor,
  };

  return {
    box,
    label,
  };
}

/******************************************************************************/
