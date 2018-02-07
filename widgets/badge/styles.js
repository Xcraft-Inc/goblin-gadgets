import {Unit} from 'electrum-theme';

/******************************************************************************/

export default function styles (theme, props) {
  let boxWidth = theme.shapes.lineHeight;
  let boxHeight = theme.shapes.lineHeight;
  let boxAlignSelf = null;
  let boxPosition = null;
  let boxRight = null;
  let boxTop = null;
  let boxMargin = null;
  let labelHeight = theme.shapes.badgeHeight;
  let labelRadius = theme.shapes.badgeRadius;
  let color = theme.palette.badgeText;
  let backgroundColor = theme.palette.badgeBackground;

  if (props.kind === 'chronos-count') {
    color = theme.palette.chronoBadgeText;
    backgroundColor = theme.palette.chronoBadgeBackground;
  }

  // If badge has layer='over', place it on top-right corner of parent.
  if (props.layer === 'over') {
    boxPosition = 'absolute';
    boxRight = '0px';
    boxTop = '0px';
  }

  const boxStyle = {
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
  };

  const m = Unit.multiply (labelHeight, 0.25);
  const w = Unit.sub (labelHeight, Unit.multiply (m, 2.0));

  const labelStyle = {
    minWidth: w,
    height: labelHeight,
    borderRadius: labelRadius,
    padding: '0px ' + m + ' 1px ' + m,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: Unit.multiply (theme.shapes.badgeTextSize, theme.typo.fontScale),
    fontWeight: 'bold',
    color: color,
    backgroundColor: backgroundColor,
  };

  return {
    box: boxStyle,
    label: labelStyle,
  };
}

/******************************************************************************/
