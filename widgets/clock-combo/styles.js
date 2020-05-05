import {ColorManipulator} from 'electrum-theme';

/******************************************************************************/

export const propNames = ['tipsRank'];

export default function styles(theme, props) {
  const {tipsRank} = props;

  const clockCombo = {
    height: tipsRank === -1 ? '200px' : '232px',
    width: '360px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.calendarBackground,
    boxShadow: theme.shapes.flyingShadow,
  };

  const content = {
    position: 'relative',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const tips = {
    width: '320px',
    height: '48px',
    padding: '0px 20px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const part = {
    position: 'relative',
    marginRight: '10px',
    padding: '2px',
    border: `1px solid ${theme.palette.buttonBorder}`,
    borderRadius: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.buttonBackground,
    boxShadow: '3px 3px 10px 1px rgba(0,0,0,0.9)',
    transition: '0.4s ease-out',
  };

  const partHidden = {
    ...part,
    transform: 'translate(120px)', // hide the panel under the clock
    opacity: 0.5,
  };

  const button = {
    'width': '48px',
    'height': '48px',
    'display': 'flex',
    'flexDirection': 'column',
    'justifyContent': 'center',
    'alignItems': 'center',
    'borderRadius': '24px',
    'cursor': 'pointer',
    'color': theme.palette.text,
    'backgroundColor': theme.palette.buttonBackground,
    'transition': '0.2s ease-out',
    ':hover': {
      backgroundColor: ColorManipulator.emphasize(
        theme.palette.buttonBackground,
        0.1
      ),
    },
  };

  const vsep = {
    height: '32px',
  };

  const cursor = {
    'position': 'absolute',
    'width': '48px',
    'height': '48px',
    'display': 'flex',
    'flexDirection': 'column',
    'justifyContent': 'center',
    'alignItems': 'center',
    'borderRadius': '24px',
    'cursor': 'ns-resize',
    'color': theme.palette.text,
    'transition':
      'background-color 0.2s ease-out, transform 0.2s ease-out, box-shadow 0.2s ease-out, font-size 0.2s ease-out',
    ':hover': {
      backgroundColor: ColorManipulator.emphasize(theme.palette.base, 0.8),
      transform: 'scale(1.2)',
      boxShadow: '3px 3px 10px 1px rgba(0,0,0,0.9)',
    },
  };

  // Use a big size, for accept quick dragging.
  // This allows the mouse not to leave the <div>.
  const cursorDragged = {
    zIndex: 1,
    position: 'absolute',
    width: '1048px',
    height: '1048px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'ns-resize',
    // backgroundColor: 'rgba(255,0,0,0.2)', // for debugging
  };

  const cursorDraggedInside = {
    width: '48px',
    height: '48px',
    backgroundColor: theme.palette.base,
    color: ColorManipulator.emphasize(theme.palette.text, 1),
    boxShadow: '3px 3px 10px 1px rgba(0,0,0,0.9)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '24px',
    transform: 'scale(1.2)',
  };

  const guideHidden = {
    position: 'absolute',
    width: '6px',
    height: '800px',
    background: `linear-gradient(0deg, rgba(255,255,255,0) 0%, ${theme.palette.base} 20%, ${theme.palette.base} 80%, rgba(255,255,255,0) 100%)`,
    opacity: 0,
    pointerEvents: 'none',
    transition: '0.3s ease-out',
  };

  const guideShowed = {
    ...guideHidden,
    opacity: 1,
  };

  const clock = {
    marginLeft: '20px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    transition: '0.4s ease-out',
  };

  /******************************************************************************/

  return {
    clockCombo,
    content,
    tips,
    part,
    partHidden,
    button,
    vsep,
    cursor,
    cursorDragged,
    cursorDraggedInside,
    guideHidden,
    guideShowed,
    clock,
  };
}

/******************************************************************************/
