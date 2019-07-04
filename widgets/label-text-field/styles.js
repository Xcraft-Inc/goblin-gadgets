import * as Bool from 'gadgets/helpers/bool-helpers';
import {Unit} from 'electrum-theme';

/******************************************************************************/

export const propNames = [
  'grow',
  'visibility',
  'horizontalSpacing',
  'width',
  'customMarginLeft',
];

export default function styles(theme, props) {
  const {grow, visibility, horizontalSpacing, width, customMarginLeft} = props;

  let flexGrow = grow;
  let flexShrink = null;
  let flexBasis = null;
  let marginRight = null;
  let marginLeft = customMarginLeft || null;
  let opacity = Bool.isFalse(visibility) ? 0 : null;

  const m = Unit.multiply(theme.shapes.containerMargin, 0.5);

  if (flexGrow) {
    flexShrink = '1';
    flexBasis = '0%';
  }

  // Initialise right margin according to horizontalSpacing.
  if (horizontalSpacing) {
    let spacingType = {
      overlap: '-1px',
      tiny: '1px',
      large: m,
      double: theme.shapes.containerMargin,
    };
    marginRight = spacingType[horizontalSpacing];
  }

  let boxStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    width: width,
    flexGrow: flexGrow,
    flexShrink: flexShrink,
    flexBasis: flexBasis,
    padding: '0px',
    marginTop: '0px',
    marginLeft: marginLeft || '0px',
    marginBottom: '0px',
    marginRight: marginRight,
    opacity: opacity,
  };

  return {
    box: boxStyle,
  };
}

/******************************************************************************/
