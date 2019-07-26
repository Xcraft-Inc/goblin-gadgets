import {ColorHelpers} from 'electrum-theme';
import {Unit} from 'electrum-theme';

/******************************************************************************/

export const propNames = [
  'width',
  'height',
  'grow',
  'color',
  'hoverColor',
  'cornerSize',
  'hoverCornerSize',
  'transition',
];

export default function styles(theme, props) {
  let {
    width,
    height,
    grow,
    color,
    hoverColor,
    cornerSize = '12px',
    hoverCornerSize = '16px',
    transition = '0.2s ease-out',
  } = props;

  if (color) {
    color = ColorHelpers.getMarkColor(theme, color);
  }
  if (hoverColor) {
    hoverColor = ColorHelpers.getMarkColor(theme, hoverColor);
  }

  const bs = Unit.sub(Unit.multiply(cornerSize, 0.5), '1px');
  const tx = Unit.multiply(cornerSize, -0.5);
  const ty = Unit.multiply(cornerSize, 0.5);

  const hbs = Unit.sub(Unit.multiply(hoverCornerSize, 0.5), '1px');
  const htx = Unit.multiply(hoverCornerSize, -0.5);
  const hty = Unit.multiply(hoverCornerSize, 0.5);

  // Use + for dispatch the style to next brother (only one).
  // Use ~ for dispatch the style to all the following brothers.
  // Use nothing for dispatch the style to children.
  const documentContainer = {
    'position': 'relative',
    'width': width,
    'height': height,
    'flexGrow': grow,
    'display': 'flex',
    'flexDirection': 'row',
    ':hover .main-hover': {
      backgroundColor: hoverColor,
      right: hoverCornerSize,
    },
    ':hover .right-hover': {
      backgroundColor: hoverColor,
      width: hoverCornerSize,
      top: hoverCornerSize,
    },
    ':hover .corner-hover': {
      borderTop: `${hbs} solid ${hoverColor}`,
      borderBottom: `${hbs} solid transparent`,
      borderLeft: `${hbs} solid transparent`,
      borderRight: `${hbs} solid transparent`,
      transform: `translate(${htx}, ${hty}) scale(1.4142) rotate(45deg)`,
    },
  };

  //     +--------------+\                   ^
  //     |              | \                  |
  //     |              | o----- cornerPart  | cornerSize
  //     |              |   \                |
  //     |       o      +----\               v
  //     |       |      |    |
  //     |       |      |  o---- rightPart
  //     |       |      |    |
  //     +-------|------+----|
  //             |      <---->
  //         mainPart  cornerSize

  const mainPart = {
    position: 'absolute',
    left: 0,
    right: cornerSize,
    top: 0,
    bottom: 0,
    backgroundColor: color,
    transition: transition,
  };

  const rightPart = {
    position: 'absolute',
    right: 0,
    width: cornerSize,
    top: cornerSize,
    bottom: 0,
    backgroundColor: color,
    transition: transition,
  };

  // Style for top-right corner (cornerPart):
  // Square of zero size with a large border, rotated 45 degrees clockwise.
  // So, the borderTop becomes the corner!
  //
  //                  ^
  //                / |X\
  //               /  |XX\
  //   borderLeft /   |XXX\ borderTop
  //             /    |XXXX\
  //            /     |XXXXX\
  //           <------+------>
  //            \     |     /
  //             \    |    /
  // borderBottom \   |   / borderRight
  //               \  |  /
  //                \ | /
  //                  v
  // borderTop:    visible (X)
  // borderBottom: invisible
  // borderLeft:   invisible
  // borderRight:  invisible

  const cornerPart = {
    position: 'absolute',
    width: '0px',
    height: '0px',
    right: '0px',
    top: '0px',
    borderTop: `${bs} solid ${color}`,
    borderBottom: `${bs} solid transparent`,
    borderLeft: `${bs} solid transparent`,
    borderRight: `${bs} solid transparent`,
    transform: `translate(${tx}, ${ty}) scale(1.4142) rotate(45deg)`,
    transition: transition,
  };

  const foreground = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  };

  return {
    documentContainer,
    mainPart,
    rightPart,
    cornerPart,
    foreground,
  };
}

/******************************************************************************/
