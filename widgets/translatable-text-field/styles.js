import * as Bool from 'gadgets/helpers/bool-helpers';
import {Unit} from 'electrum-theme';

/******************************************************************************/

export const propNames = ['grow', 'visibility', 'spacing', 'width'];

export default function styles(theme, props) {
  const {grow, visibility, spacing, width} = props;

  let flexGrow = grow;
  let flexShrink = null;
  let flexBasis = null;
  let marginRight = null;
  let opacity = Bool.isFalse(visibility) ? 0 : null;

  const m = Unit.multiply(theme.shapes.containerMargin, 0.5);

  if (flexGrow) {
    flexShrink = '1';
    flexBasis = '0%';
  }

  // Initialise right margin according to spacing.
  if (spacing) {
    let spacingType = {
      overlap: '-1px',
      tiny: '1px',
      large: m,
      double: theme.shapes.containerMargin,
    };
    marginRight = spacingType[spacing];
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
    marginLeft: '0px',
    marginBottom: '0px',
    marginRight: marginRight,
    opacity: opacity,
  };

  return {
    box: boxStyle,
  };
}

/******************************************************************************/