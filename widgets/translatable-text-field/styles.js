import * as Bool from 'goblin-gadgets/widgets/helpers/bool-helpers';
import * as SpacingHelpers from 'goblin-gadgets/widgets/helpers/spacing-helpers';
import {Unit} from 'electrum-theme';

/******************************************************************************/

export const propNames = ['grow', 'visibility', 'horizontalSpacing', 'width'];

export default function styles(theme, props) {
  const {grow, visibility, horizontalSpacing, width} = props;

  let flexGrow = grow;
  let flexShrink = null;
  let flexBasis = null;
  let marginRight = null;
  let opacity = Bool.isFalse(visibility) ? 0 : null;

  if (flexGrow) {
    flexShrink = '1';
    flexBasis = '0%';
  }

  marginRight = SpacingHelpers.getHorizontalSpacingRightMargin(
    theme,
    horizontalSpacing
  );

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
