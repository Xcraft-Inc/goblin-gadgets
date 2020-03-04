import * as Bool from 'goblin-gadgets/widgets/helpers/bool-helpers';

/******************************************************************************/

export const propNames = ['grow', 'visibility', 'width'];

export default function styles(theme, props) {
  const {grow, visibility, width} = props;

  let flexGrow = grow;
  let flexShrink = null;
  let flexBasis = null;
  let opacity = Bool.isFalse(visibility) ? 0 : null;

  if (flexGrow) {
    flexShrink = '1';
    flexBasis = '0%';
  }

  const box = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width,
    flexGrow: flexGrow,
    flexShrink: flexShrink,
    flexBasis: flexBasis,
    padding: '0px',
    margin: '0px',
    opacity: opacity,
  };

  return {
    box,
  };
}

/******************************************************************************/
