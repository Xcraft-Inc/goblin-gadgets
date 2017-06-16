import {Unit} from 'electrum-theme';

/******************************************************************************/

export default function styles (theme, props) {
  let flexGrow = props.grow;
  let flexShrink = null;
  let flexBasis = null;
  let marginRight = null;

  const m = Unit.multiply (theme.shapes.containerMargin, 0.5);

  if (!flexGrow) {
    flexGrow = 1;
  }
  if (flexGrow) {
    flexShrink = '1';
    flexBasis = '0%';
  }

  if (props.spacing === 'overlap') {
    marginRight = '-1px';
  } else if (props.spacing === 'large') {
    marginRight = m;
  }

  let boxStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexGrow: flexGrow,
    flexShrink: flexShrink,
    flexBasis: flexBasis,
    padding: '0px',
    marginTop: '0px',
    marginLeft: '0px',
    marginBottom: '0px',
    marginRight: marginRight,
  };

  return {
    box: boxStyle,
  };
}

/******************************************************************************/
