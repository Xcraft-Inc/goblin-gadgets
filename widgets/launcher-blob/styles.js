/******************************************************************************/

export const propNames = ['color', 'duration', 'direction'];

export default function styles(theme, props) {
  const {color = 'red', duration = '60s', direction = 'normal'} = props;

  const keyframesBlob = {
    '0%': {transform: 'scale(1) translate(10px, -15px)'},
    '38%': {transform: 'scale(1, 0.6) translate(4vw, 18vh) rotate(160deg)'},
    '40%': {transform: 'scale(1, 0.6) translate(4vw, 18vh) rotate(160deg)'},
    '78%': {transform: 'scale(1.0, 0.8) translate(-5vw, -9vh) rotate(-20deg)'},
    '80%': {transform: 'scale(1.0, 0.8) translate(-5vw, -9vh) rotate(-20deg)'},
    '100%': {transform: 'scale(1) translate(10px, -15px)'},
  };

  const keyframesWave = {
    '0%': {transform: 'scale(2,2) translateX(25%) rotate(0deg)'},
    '20%': {transform: 'scale(3,2) translateX(13%) rotate(-4deg)'},
    '30%': {transform: 'scale(2.5,2) translateX(6%) rotate(1deg)'},
    '50%': {transform: 'scale(2,2) translateX(-3%) rotate(-5deg)'},
    '60%': {transform: 'scale(3,2) translateX(-16%) rotate(-7deg)'},
    '70%': {transform: 'scale(3.5,2) translateX(-16%) rotate(5deg)'},
    '85%': {transform: 'scale(2.5,2) translateX(-22%) rotate(-3deg)'},
    '100%': {transform: 'scale(2,2) translateX(-25%) rotate(0deg)'},
  };

  const launcherBlob = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    fill: color,
    willChange: 'transform',
    transformOrigin: '50% 50%',
    animation: `${duration} ease-in-out infinite ${direction}`,
    animationName: keyframesBlob,
    pointerEvents: 'none',
  };

  const launcherWave = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 'calc(50% - 20px)',
    fill: color,
    willChange: 'transform',
    transformOrigin: 'top',
    animation: `${duration} ease-in-out infinite ${direction}`,
    animationDirection: 'alternate',
    animationName: keyframesWave,
    pointerEvents: 'none',
  };

  return {
    launcherBlob,
    launcherWave,
  };
}

/******************************************************************************/
