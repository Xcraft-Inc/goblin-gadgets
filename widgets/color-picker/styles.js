import {Unit} from 'goblin-theme';

/******************************************************************************/

export const propNames = [
  'grow',
  'width',
  'frame',
  'backgroundColor',
  'borderRadius',
];

export default function styles(theme, props) {
  const {grow, width = '400px', frame, backgroundColor, borderRadius} = props;

  const isDark = theme.colors.isDarkTheme;
  const r = borderRadius || theme.shapes.smoothRadius;
  const rs = borderRadius || Unit.multiply(r, 3);
  const noFrame = frame === 'no';

  const colorPicker = {
    flexGrow: grow,
    width: width,
    minWidth: '520px',
    height: '330px',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: r,
    backgroundColor: backgroundColor || theme.palette.calendarBackground,
    boxShadow: noFrame ? null : theme.shapes.flyingShadow,
  };

  const modes = {
    padding: '15px 20px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: `${r} ${r} 0px 0px`,
  };

  const content = {
    padding: '20px',
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
    background: noFrame
      ? null
      : isDark
      ? 'linear-gradient(180deg, rgba(0,0,0,0.70), transparent 20px)'
      : 'linear-gradient(180deg, rgba(0,0,0,0.15), transparent 20px)',
  };

  const composants = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  };

  const composantHorizontal = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: '5px 0px',
  };

  const composantVertical = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '5px 10px 5px 0px',
  };

  const composantHsl = {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
  };

  const composantHslFields = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  const composantHslSliders = {
    position: 'relative',
    height: '214px',
    flexGrow: 1,
  };

  const composantHslCircle = {
    position: 'absolute',
    left: '0px',
    top: '0px',
    width: '214px',
    height: '214px',
  };

  const composantHslSquare = {
    position: 'absolute',
    left: '44px',
    top: '44px',
    width: '126px',
    height: '126px',
  };

  const pallets = {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    flexWrap: 'wrap',
    flexBasis: 0,
    flexShrink: 1,
    alignContent: 'flex-start',
  };

  const pallet = {
    'margin': '2px',
    'width': '32px',
    'height': '32px',
    'border': `1px solid ${theme.palette.buttonBorder}`,
    'borderRadius': rs,
    ':hover': {
      border: `1px solid ${isDark ? 'white' : 'black'}`,
    },
  };

  const samples = {
    height: '100%',
    width: '110px',
    minWidth: '110px',
    marginLeft: '10px',
    border: `1px solid ${theme.palette.buttonBorder}`,
    borderRadius: rs,
    display: 'flex',
    flexDirection: 'column',
  };

  const sampleUp = {
    'flexGrow': 1,
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    'fontSize': '60%',
    'borderRadius': `${rs} ${rs} 0px 0px`,
    'border': `1px solid transparent`,
    'cursor': 'pointer',
    ':hover': {
      border: `1px solid ${isDark ? 'white' : 'black'}`,
    },
  };

  const sampleDown = {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '60%',
    borderRadius: `0px 0px ${rs} ${rs}`,
  };

  const lastColors = {
    width: '20px',
    margin: '0px 0px -5px 10px',
    display: 'flex',
    flexDirection: 'column-reverse',
  };

  const lastColor = {
    'width': '20px',
    'height': '20px',
    'marginBottom': '5px',
    'borderRadius': '12px',
    'border': `1px solid ${theme.palette.buttonBorder}`,
    'cursor': 'pointer',
    'transition': '0.2s ease-out',
    ':hover': {
      border: `1px solid ${isDark ? 'white' : 'black'}`,
      transform: 'scale(1.2)',
    },
  };

  /******************************************************************************/

  return {
    colorPicker,
    modes,
    content,
    composants,
    composantHorizontal,
    composantVertical,
    composantHsl,
    composantHslFields,
    composantHslSliders,
    composantHslCircle,
    composantHslSquare,
    pallets,
    pallet,
    samples,
    sampleUp,
    sampleDown,
    lastColors,
    lastColor,
  };
}

/******************************************************************************/
