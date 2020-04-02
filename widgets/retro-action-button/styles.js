import {ColorManipulator} from 'electrum-theme';
import helpers from './helpers';

/******************************************************************************/

export const propNames = [
  'width',
  'grow',
  'justify',
  'visibility',
  'cursor',
  'disabled',
  'readonly',
  'border',
  'horizontalSpacing',
  'kind',
  'place',
  'badgePush',
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
    visibility,
    disabled,
    readonly,
    kind,
    place: placeProp,
    busy,
  } = props;

  // Initialize all variables for a standard button.
  let boxWidth = width || '200px';
  let boxHeight = kind === 'secondary-action' ? '42px' : '58px';
  let boxFlexDirection = 'row';
  let boxFlexGrow = grow;
  let boxFlexShrink = null;
  let boxFlexBasis = null;
  let boxAlignItems = 'center';
  let boxOpacity = visibility === false ? 0 : null;
  let borderWidth = theme.shapes.buttonBorderWidth;
  let borderColor = theme.palette.buttonBorderColor;
  let borderStyle = 'solid';
  let borderRadius = kind === 'secondary-action' ? '5px' : '8px';
  let boxShadow = null;
  let backgroundColor = theme.palette.buttonBackground;
  let backgroundHoverColor = null;
  let transition = theme.transitions.easeOut();
  let specialDisabled = false;

  disabled = disabled || readonly;

  const place = helpers.getPlace(placeProp);

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

  if (boxFlexGrow) {
    boxFlexShrink = '1';
    boxFlexBasis = '0%';
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
    alignItems: boxAlignItems,
    borderWidth: borderWidth,
    borderColor: borderColor,
    borderStyle: borderStyle,
    borderRadius: borderRadius,
    background: backgroundColor,
    transition: transition,
    textDecoration: 'none',
    userSelect: 'none',
    cursor: 'default',
  };

  if (!disabled && !busy && boxOpacity !== 0) {
    box[':hover'] = {
      background: backgroundHoverColor,
      opacity: 1.0,
    };
  }

  /******************************************************************************/

  const busyKeyframes = {
    '0%': {
      left: '20%',
    },
    '80%': {
      left: '80%',
    },
    '100%': {
      left: '20%',
    },
  };

  const busyBox = {
    zIndex: 9,
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: '0px',
    height: '0px',
    display: 'flex',
    animationName: busyKeyframes,
    animationDuration: '5s',
    animationIterationCount: 'infinite',
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
  const frameBackgroundColor = theme.palette.chrome; // gold

  const _frame = {
    position: 'absolute',
    top: '0px',
    bottom: '0px',
    height: boxHeight,
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
    shadow,
    frameLeftScrew,
    frameRightScrew,
    frameLeft,
    frameRight,
    frameButton,
  };
}

/******************************************************************************/
