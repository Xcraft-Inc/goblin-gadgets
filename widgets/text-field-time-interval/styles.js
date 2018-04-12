import * as Bool from 'gadgets/boolean-helpers';

/******************************************************************************/

export default function styles(theme, props) {
  let flexGrow = props.grow;
  let flexShrink = null;
  let flexBasis = null;
  let opacity = Bool.isFalse(props.visibility) ? 0 : null;

  if (flexGrow) {
    flexShrink = '1';
    flexBasis = '0%';
  }

  const boxStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: props.width,
    flexGrow: flexGrow,
    flexShrink: flexShrink,
    flexBasis: flexBasis,
    padding: '0px',
    margin: '0px',
    opacity: opacity,
  };

  return {
    box: boxStyle,
  };
}

/******************************************************************************/
