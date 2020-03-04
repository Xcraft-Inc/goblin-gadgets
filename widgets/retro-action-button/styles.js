import {Unit} from 'electrum-theme';
import {ColorHelpers} from 'electrum-theme';
import {ColorManipulator} from 'electrum-theme';
import * as Bool from 'gadgets/helpers/bool-helpers';

function convertJustify(justify) {
  switch (justify) {
    case 'start':
      return 'flex-start';
    case 'end':
      return 'flex-end';
    case 'around':
      return 'space-around';
    case 'between':
      return 'space-between';
    default:
      return justify;
  }
}

/******************************************************************************/

export const propNames = [
  'width',
  'grow',
  'justify',
  'zIndex',
  'visibility',
  'cursor',
  'disabled',
  'readonly',
  'border',
  'horizontalSpacing',
  'kind',
  'place',
  'badgePush',
  'backgroundColor',
  'activeColor',
  'busy',
];

export function mapProps(props) {
  return {
    ...props,
    text: Boolean(props.text),
  };
}

export default function styles(theme, props) {
  let {
    width,
    grow,
    justify,
    zIndex,
    visibility,
    disabled,
    readonly,
    kind,
    place: placeProp,
    backgroundColor: backgroundColorProp,
    activeColor: activeColorProp,
    busy,
  } = props;

  const m = Unit.multiply(theme.shapes.containerMargin, 0.5);

  // Initialize all variables for a standard button.
  let boxWidth = width || '200px';
  let boxHeight = kind === 'secondary-action' ? '42px' : '58px';
  let boxFlexDirection = 'row';
  let boxFlexGrow = grow;
  let boxFlexShrink = null;
  let boxFlexBasis = null;
  let boxJustifyContent = convertJustify(justify);
  let boxAlignItems = 'center';
  let boxAlignSelf = null;
  let boxZIndex = zIndex;
  let boxOpacity = Bool.isFalse(visibility) ? 0 : null;
  let borderWidth = theme.shapes.buttonBorderWidth;
  let borderColor = theme.palette.buttonBorderColor;
  let borderColorForced = null;
  let borderStyle = 'solid';
  let borderRadius = kind === 'secondary-action' ? '5px' : '8px';
  let boxSizing = null;
  let boxShadow = null;
  let backgroundColor = theme.palette.buttonBackground;
  let borderHoverColor = null;
  let borderHoverStyle = null;
  let borderHoverWidth = null;
  let backgroundHoverColor = null;
  let transition = theme.transitions.easeOut();
  let specialDisabled = false;

  disabled = Bool.isTrue(disabled) || Bool.isTrue(readonly);

  let place = placeProp || 'middle';
  if (place === '1/1') {
    place = 'single';
  } else if (place.indexOf('/') !== -1) {
    const n = place.split('/');
    if (n.length === 2) {
      if (n[0] === '1') {
        place = 'left';
      } else if (n[0] === n[1]) {
        place = 'right';
      } else {
        place = 'middle';
      }
    }
  }

  const c1 = theme.palette.actionButtonBackground;
  const c2 = ColorManipulator.darken(theme.palette.actionButtonBackground, 0.4);
  backgroundColor = `radial-gradient(at 30% 30%, ${c1}, ${c2})`;

  const ch1 = ColorManipulator.lighten(
    theme.palette.actionButtonBackground,
    0.2
  );
  const ch2 = ColorManipulator.darken(
    theme.palette.actionButtonBackground,
    0.2
  );
  backgroundHoverColor = `radial-gradient(at 30% 30%, ${ch1}, ${ch2})`;

  let tColor = ColorManipulator.lighten(
    theme.palette.actionButtonBackground,
    0.4
  );
  let rColor = ColorManipulator.darken(
    theme.palette.actionButtonBackground,
    0.3
  );
  let bColor = ColorManipulator.darken(
    theme.palette.actionButtonBackground,
    0.5
  );
  let lColor = ColorManipulator.lighten(
    theme.palette.actionButtonBackground,
    0.2
  );

  if (disabled) {
    const c1 = ColorManipulator.lighten(
      theme.palette.buttonDisableBackground,
      0.2
    );
    const c2 = ColorManipulator.darken(
      theme.palette.buttonDisableBackground,
      0.1
    );
    tColor = c1;
    rColor = c2;
    bColor = c2;
    lColor = c1;
    backgroundColor = theme.palette.buttonDisableBackground;
    specialDisabled = true;
  }

  borderColor = `${tColor} ${rColor} ${bColor} ${lColor}`;
  borderStyle = 'solid';
  boxJustifyContent = boxJustifyContent ? boxJustifyContent : 'none';

  // Action button (usual parent is container with kind='actions').
  if (kind === 'action') {
    borderWidth = '6px';
    boxShadow = '3px 5px 21px 2px rgba(0,0,0,0.7)';
  }

  // Action button (usual parent is container with kind='actions-line-secondary').
  if (kind === 'secondary-action') {
    borderWidth = '2px';
    boxShadow = '2px 4px 14px 0px rgba(0,0,0,0.6)';
  }

  // Compute colors for glyph, text and hover if necessary.
  let buttonBackgroundColor = backgroundColor;
  if (!buttonBackgroundColor || buttonBackgroundColor === 'transparent') {
    buttonBackgroundColor = theme.palette.buttonBackground;
  }

  // Alter colors if component is disable.
  if (disabled && !specialDisabled) {
    borderColor = theme.palette.buttonDisableBorder;
    if (backgroundColor) {
      backgroundColor = theme.palette.buttonDisableBackground;
    }
  }

  if (borderColorForced) {
    borderColor = borderColorForced;
  }

  if (boxFlexGrow) {
    boxFlexShrink = '1';
    boxFlexBasis = '0%';
  }

  if (!boxJustifyContent) {
    boxJustifyContent = 'center';
  }
  if (boxJustifyContent === 'none') {
    boxJustifyContent = null;
  }

  const retroActionButton = {
    position: 'relative',
    width: boxWidth,
    height: boxHeight,
    flexDirection: boxFlexDirection,
    flexGrow: boxFlexGrow,
    flexShrink: boxFlexShrink,
    flexBasis: boxFlexBasis,
  };

  const box = {
    position: 'absolute',
    left: '0px',
    right: '0px',
    top: '5px',
    bottom: '5px',
    opacity: boxOpacity,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: boxJustifyContent,
    alignItems: boxAlignItems,
    alignSelf: boxAlignSelf,
    borderWidth: borderWidth,
    borderColor: borderColor,
    borderStyle: borderStyle,
    borderRadius: borderRadius,
    boxSizing: boxSizing,
    background: backgroundColor,
    transition: transition,
    zIndex: boxZIndex,
    textDecoration: 'none',
    userSelect: 'none',
    cursor: 'default',
  };

  if (!disabled && !Bool.isTrue(busy) && boxOpacity !== 0) {
    box[':hover'] = {
      borderColor: borderHoverColor,
      borderStyle: borderHoverStyle,
      borderWidth: borderHoverWidth,
      background: backgroundHoverColor,
      opacity: 1.0,
    };
  }

  const busyBox = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    backgroundColor: theme.palette.busyBackground,
  };

  const busyGlyph = {
    margin: 'auto',
    color: theme.palette.busyForeground,
  };

  /******************************************************************************/

  const shadow = {
    position: 'absolute',
    top: '0px',
    bottom: '0px',
    left: place === 'left' || place === 'single' ? '10px' : '0px',
    right: place === 'right' || place === 'single' ? '10px' : '0px',
    boxShadow: boxShadow,
  };

  const frameBorderColor = ColorManipulator.darken(
    theme.palette.actionButtonBackground,
    0.7
  );
  const frameBackgroundColor = '#ecc802'; // gold

  const _frame = {
    position: 'absolute',
    top: '0px',
    bottom: '0px',
    height: boxHeight,
    stroke: frameBorderColor,
    strokeWidth: '1px',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    fill: frameBackgroundColor,
  };

  const frameLeftScrew = {
    ..._frame,
    left: '0px',
    width: '20px',
  };

  const frameRightScrew = {
    ..._frame,
    right: '0px',
    width: '20px',
  };

  const frameLeft = {
    ..._frame,
    left: '0px',
    width: '10px',
  };

  const frameRight = {
    ..._frame,
    right: '0px',
    width: '10px',
  };

  const frameButton = {
    position: 'absolute',
    top: '0px',
    bottom: '0px',
    left: place === 'left' || place === 'single' ? '20px' : '10px',
    right: place === 'right' || place === 'single' ? '20px' : '10px',
    backgroundColor: frameBackgroundColor,
    borderTop: `1px solid ${frameBorderColor}`,
    borderBottom: `1px solid ${frameBorderColor}`,
  };

  /******************************************************************************/

  return {
    retroActionButton,
    box,
    busyBox,
    busyGlyph,
    shadow,
    frameLeftScrew,
    frameRightScrew,
    frameLeft,
    frameRight,
    frameButton,
  };
}

/******************************************************************************/
