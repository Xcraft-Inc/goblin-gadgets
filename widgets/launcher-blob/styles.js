/******************************************************************************/

export const propNames = ['color', 'duration', 'direction'];

export default function styles(theme, props) {
  const {color = '#204261', duration = '60s', direction = 'normal'} = props;

  const keyframesBlob = {
    '0%': {transform: 'scale(1) translate(10px, -15px)'},
    '38%': {transform: 'scale(1, 0.6) translate(4vw, 18vh) rotate(160deg)'},
    '40%': {transform: 'scale(1, 0.6) translate(4vw, 18vh) rotate(160deg)'},
    '78%': {transform: 'scale(1.0, 0.8) translate(-5vw, -9vh) rotate(-20deg)'},
    '80%': {transform: 'scale(1.0, 0.8) translate(-5vw, -9vh) rotate(-20deg)'},
    '100%': {transform: 'scale(1) translate(10px, -15px)'},
  };

  const keyframesWave = {
    '0%': {transform: 'translate(37.5%, 24%) scale(4,0.7) rotate(0deg)'},
    '20%': {transform: 'translate(30%, 34%) scale(4,1) rotate(1deg)'},
    '24%': {transform: 'translate(26%, 26%) scale(4,0.7) rotate(-1deg)'},
    '30%': {transform: 'translate(20%, 28%) scale(4,0.7) rotate(0deg)'},
    '45%': {transform: 'translate(19%, 36%) scale(4,1.0) rotate(5deg)'},
    '70%': {transform: 'translate(10%, 32%) scale(4,0.75) rotate(-1deg)'},
    '74%': {transform: 'translate(6%, 26%) scale(4,0.6) rotate(0deg)'},
    '80%': {transform: 'translate(-13%, 35%) scale(4,1) rotate(-10deg)'},
    '85%': {transform: 'translate(-33%, 46%) scale(4,1.2) rotate(0deg)'},
    '100%': {transform: 'translate(37.5%, 24%) scale(4,0.7) rotate(0deg)'},
  };

  const launcherBlob = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    fill: color,
    transformOrigin: '50% 50%',
    animation: `${duration} ease-in-out infinite ${direction}`,
    animationName: keyframesBlob,
  };

  const launcherWave = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    fill: color,
    transformOrigin: '50% 50%',
    animation: `${duration} ease-in-out infinite ${direction}`,
    animationDirection: 'alternate',
    animationName: keyframesWave,
  };

  return {
    launcherBlob,
    launcherWave,
  };
}

/******************************************************************************/
