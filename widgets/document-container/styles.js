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
    transition = '0.2s ease-out',
  } = props;

  if (color) {
    color = ColorHelpers.getMarkColor(theme, color);
  }
  if (hoverColor) {
    hoverColor = ColorHelpers.getMarkColor(theme, hoverColor);
  }

  const documentContainer = {
    position: 'relative',
    width: width,
    height: height,
    flexGrow: grow,
    display: 'flex',
    transition: transition,
    flexDirection: 'row',
  };

  const mainPart = {
    position: 'absolute',
    left: 0,
    right: cornerSize,
    top: 0,
    bottom: 0,
    backgroundColor: color,
  };

  const rightPart = {
    position: 'absolute',
    right: 0,
    width: cornerSize,
    top: cornerSize,
    bottom: 0,
    backgroundColor: color,
  };

  // Style for top-right corner:
  //
  //            borderTop
  //            +-------+
  //            |\     /|
  //            | \   / |
  //            |  \ /  |
  // borderLeft |   X   | borderRight
  //            |  / \  |
  //            | /   \ |
  //            |/     \|
  //            +-------+
  //          borderBottom
  //
  // borderTop:    turned 45 degrees CW
  // borderBottom: invisible
  // borderLeft:   invisible
  // borderRight:  invisible

  const bs = Unit.sub(Unit.multiply(cornerSize, 0.5), '1px');
  const tx = Unit.multiply(cornerSize, -0.5);
  const ty = Unit.multiply(cornerSize, 0.5);

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
  };

  const foreground = {
    'position': 'absolute',
    'left': 0,
    'right': 0,
    'top': 0,
    'bottom': 0,
    'backgroundColor': 'transparent',
    'transition': transition,
    ':hover': {
      backgroundColor: hoverColor,
    },
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
