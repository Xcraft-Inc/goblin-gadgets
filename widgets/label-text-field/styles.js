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

  // Initialise right margin according to spacing.
  if (props.spacing) {
    let spacingType = {
      overlap: '-1px',
      tiny: '1px',
      large: m,
    };
    marginRight = spacingType[props.spacing];
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
