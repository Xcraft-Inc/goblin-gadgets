/******************************************************************************/

export const propNames = ['width', 'height', 'showed'];

export default function styles(theme, props) {
  const {width, height, showed} = props;

  // Use + for dispatch the style to next brother (only one).
  // Use ~ for dispatch the style to all the following brothers.
  // Use nothing for dispatch the style to children.
  const monitor = {
    'position': 'relative',
    'width': width,
    'height': height,
    'borderRadius': '30px',
    'borderTop': '10px solid #666',
    'borderBottom': '10px solid #ccc',
    'borderLeft': '10px solid #888',
    'borderRight': '10px solid #aaa',
    'background': 'radial-gradient(ellipse at top left, #000, #333)',
    'boxShadow': '0px 0px 50px black',
    'overflow': 'hidden',
    ':hover .grid-hover': {
      stroke: 'rgba(0,255,0,0.4)',
    },
    ':hover .samples-hover': {
      strokeWidth: '5px',
    },
    ':hover .flare-hover': {
      right: '-300px',
      bottom: '-300px',
      width: '700px',
      height: '700px',
      opacity: 0.2,
    },
  };

  /******************************************************************************/

  const screenLeft = {
    position: 'absolute',
    margin: '2px',
    fill: '#444',
  };

  const screenRight = {
    ...screenLeft,
    fill: '#888',
  };

  const screenTop = {
    ...screenLeft,
    fill: '#222',
  };

  const screenBottom = {
    ...screenLeft,
    fill: '#aaa',
  };

  /******************************************************************************/

  const grid = {
    position: 'absolute',
    margin: '40px',
    stroke: 'rgba(0,255,0,0.2)',
    strokeWidth: '1px',
    fill: 'transparent',
    transition: '0.6s ease-out',
  };

  const samples = {
    position: 'absolute',
    margin: '40px',
    stroke: '#0f0',
    strokeWidth: '2px',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    fill: 'transparent',
    transition: '10s ease-out',
  };

  const flare = {
    position: 'absolute',
    margin: '20px',
    right: '0px',
    bottom: '0px',
    width: '100px',
    height: '100px',
    background: 'radial-gradient(circle closest-side, white, transparent)',
    opacity: 0.1,
    transition: '10s ease-out',
  };

  const powerOff = {
    position: 'absolute',
    margin: '40px',
    left: '0px',
    right: '0px',
    top: '0px',
    bottom: '0px',
    stroke: 'white',
    opacity: showed ? 0 : 0.3,
    transform: showed ? 'scale(0)' : 'scale(1)',
    transition: '0.3s ease-out',
  };

  const border = {
    position: 'absolute',
    left: '0px',
    right: '0px',
    top: '0px',
    bottom: '0px',
    borderRadius: '20px',
    borderTop: '2px solid #ddd',
    borderBottom: '2px solid #444',
    borderLeft: '2px solid #ddd',
    borderRight: '2px solid #444',
  };

  /******************************************************************************/

  return {
    monitor,

    screenLeft,
    screenRight,
    screenTop,
    screenBottom,

    grid,
    samples,
    flare,
    powerOff,
    border,
  };
}

/******************************************************************************/
