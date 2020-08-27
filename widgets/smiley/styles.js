import {Unit} from 'goblin-theme';
const px = Unit.toPx;
const n = Unit.toValue;

import {ColorHelpers} from 'goblin-theme';
import {color as ColorConverters} from 'xcraft-core-converters';

/******************************************************************************/

function adjust(satisfaction, happyValue, unhappyValue) {
  return (happyValue - unhappyValue) * (satisfaction / 100) + unhappyValue;
}

/******************************************************************************/

export const propNames = [
  'step',
  'size',
  'mainColor',
  'topColor',
  'satisfaction',
  'transition',
];

export default function styles(theme, props) {
  let {
    step = 7,
    size = '100px',
    mainColor = '#ff0',
    topColor,
    satisfaction = 100,
    transition = '1.0s ease-out',
  } = props;

  let smiley = {};
  let leftEye = {};
  let rightEye = {};
  let smile = {};
  let leftCorner = {};
  let rightCorner = {};
  let reflexion1 = {};
  let reflexion2 = {};

  //////////////////////////////////////////////
  //   STEP 1                                 //
  //   Simple yellow circle                   //
  //////////////////////////////////////////////

  if (step === 1) {
    // const smily = {
    smiley = {
      position: 'absolute',
      width: '200px',
      height: '200px',
      borderRadius: '200px',
      border: '10px solid black',
      background: 'yellow',
    };
  }

  //////////////////////////////////////////////
  //   STEP 2                                 //
  //   Yellow circle with eyes and smile      //
  //////////////////////////////////////////////

  if (step === 2) {
    // const smily = {
    smiley = {
      position: 'relative',
      width: '200px',
      height: '200px',
      borderRadius: '200px',
      border: '10px solid black',
      background: 'yellow',
    };

    const _eye = {
      position: 'absolute',
      top: '60px',
      width: '20px',
      height: '20px',
      borderRadius: '20px',
      backgroundColor: 'black',
      transform: 'scaleY(2)',
    };

    // const leftEye = {
    leftEye = {
      ..._eye,
      left: '70px',
    };

    // const rightEye = {
    rightEye = {
      ..._eye,
      right: '70px',
    };

    // const smile = {
    smile = {
      position: 'absolute',
      bottom: '40px',
      left: '30px',
      right: '30px',
      height: '60px',
      borderRadius: '0 0 150px 150px',
      border: '10px solid black',
      borderTop: 0,
    };
  }

  //////////////////////////////////////////////
  //   STEP 3                                 //
  //   Add gradient inside circle             //
  //////////////////////////////////////////////

  if (step === 3) {
    // const smily = {
    smiley = {
      position: 'relative',
      width: '200px',
      height: '200px',
      borderRadius: '200px',
      border: '10px solid black',
      background: 'linear-gradient(180deg, #f80, #ff0)',
    };

    const _eye = {
      position: 'absolute',
      top: '60px',
      width: '20px',
      height: '20px',
      borderRadius: '20px',
      backgroundColor: 'black',
      transform: 'scaleY(2)',
    };

    // const leftEye = {
    leftEye = {
      ..._eye,
      left: '70px',
    };

    // const rightEye = {
    rightEye = {
      ..._eye,
      right: '70px',
    };

    // const smile = {
    smile = {
      position: 'absolute',
      bottom: '40px',
      left: '30px',
      right: '30px',
      height: '60px',
      borderRadius: '0 0 150px 150px',
      border: '10px solid black',
      borderTop: 0,
    };
  }

  //////////////////////////////////////////////
  //   STEP 4                                 //
  //   Adds a reflection behind the eyes      //
  //////////////////////////////////////////////

  if (step === 4) {
    // const smily = {
    smiley = {
      position: 'relative',
      width: '200px',
      height: '200px',
      borderRadius: '200px',
      border: '10px solid black',
      background: 'linear-gradient(180deg, #f80, #ff0)',
    };

    const _eye = {
      position: 'absolute',
      top: '60px',
      width: '20px',
      height: '20px',
      borderRadius: '20px',
      backgroundColor: 'black',
      transform: 'scaleY(2)',
    };

    // const leftEye = {
    leftEye = {
      ..._eye,
      left: '70px',
    };

    // const rightEye = {
    rightEye = {
      ..._eye,
      right: '70px',
    };

    // const smile = {
    smile = {
      position: 'absolute',
      bottom: '40px',
      left: '30px',
      right: '30px',
      height: '60px',
      borderRadius: '0 0 150px 150px',
      border: '10px solid black',
      borderTop: 0,
    };

    // const reflexion1 = {
    reflexion1 = {
      position: 'absolute',
      left: '50px',
      right: '50px',
      top: '10px',
      bottom: '80px',
      borderRadius: '200px',
      background: 'linear-gradient(180deg, white, #fc0)',
      transform: 'scaleX(1.5)',
      opacity: 0.8,
    };
  }

  //////////////////////////////////////////////
  //   STEP 5                                 //
  //   Adds a reflection at the bottom of     //
  //   the circle                             //
  //////////////////////////////////////////////

  if (step === 5) {
    // const smily = {
    smiley = {
      position: 'relative',
      width: '200px',
      height: '200px',
      borderRadius: '200px',
      border: '10px solid black',
      background: 'linear-gradient(180deg, #f80, #ff0)',
    };

    const _eye = {
      position: 'absolute',
      top: '60px',
      width: '20px',
      height: '20px',
      borderRadius: '20px',
      backgroundColor: 'black',
      transform: 'scaleY(2)',
    };

    // const leftEye = {
    leftEye = {
      ..._eye,
      left: '70px',
    };

    // const rightEye = {
    rightEye = {
      ..._eye,
      right: '70px',
    };

    // const smile = {
    smile = {
      position: 'absolute',
      bottom: '40px',
      left: '30px',
      right: '30px',
      height: '60px',
      borderRadius: '0 0 150px 150px',
      border: '10px solid black',
      borderTop: 0,
    };

    // const reflexion1 = {
    reflexion1 = {
      position: 'absolute',
      left: '50px',
      right: '50px',
      top: '10px',
      bottom: '80px',
      borderRadius: '200px',
      background: 'linear-gradient(180deg, white, #fc0)',
      transform: 'scaleX(1.5)',
      opacity: 0.8,
    };

    // const reflexion2 = {
    reflexion2 = {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      borderStyle: 'solid',
      borderRadius: '200px',
      borderWidth: '5px',
      borderColor: 'transparent white white transparent',
      transform: 'rotate(45deg)',
      opacity: 0.8,
    };
  }

  //////////////////////////////////////////////
  //   STEP 6                                 //
  //   Simple circle with the diameter        //
  //   according to the property 'size'       //
  //////////////////////////////////////////////

  if (step === 6) {
    // const smily = {
    smiley = {
      position: 'absolute',
      width: props.size,
      height: props.size,
      borderRadius: props.size,
      border: '10px solid black',
      background: 'linear-gradient(180deg, #f80, #ff0)',
    };
  }

  //////////////////////////////////////////////
  //   STEP 7                                 //
  //   Final version                          //
  //////////////////////////////////////////////

  if (step === 7) {
    const s = n(size);
    satisfaction = Math.min(Math.max(0, satisfaction), 100);
    const happy = satisfaction >= 50;

    mainColor = ColorHelpers.getMarkColor(theme, mainColor);
    topColor = ColorHelpers.getMarkColor(theme, topColor);

    /******************************************************************************/

    // Main circle.
    if (!topColor) {
      topColor = ColorConverters.changeColor(mainColor, -30);
    }

    const borderColor = ColorConverters.changeColor(mainColor, 0, 1, 0.5);

    smiley = {
      position: 'relative',
      width: px(s),
      height: px(s),
      borderRadius: px(s),
      border: `${px(s * 0.05)} solid ${borderColor}`,
      background: `linear-gradient(180deg, ${topColor}, ${mainColor})`,
      transition,
    };

    /******************************************************************************/

    // Eyes.
    const _eye = {
      position: 'absolute',
      top: px(s * 0.3),
      width: px(s * 0.1),
      height: px(s * 0.1),
      borderRadius: px(s * 0.1),
      backgroundColor: '#000',
      transform: `scaleY(${adjust(satisfaction, 2, 1)})`,
      transition,
    };

    leftEye = {
      ..._eye,
      left: px(s * adjust(satisfaction, 0.35, 0.3)),
    };

    rightEye = {
      ..._eye,
      right: px(s * adjust(satisfaction, 0.35, 0.3)),
    };

    /******************************************************************************/

    // Smile.
    const ss = happy ? (satisfaction - 50) * 2 : 50 - satisfaction;
    const sr1 = adjust(ss, s * 0.75, s * 1.25);
    const sr2 = adjust(ss, s * 0.75, s * 0.37);

    smile = {
      position: 'absolute',
      bottom: px(adjust(satisfaction, s * 0.2, s * 0.3)),
      left: px(s * 0.15),
      right: px(s * 0.15),
      height: px(adjust(ss, s * 0.3, 0)),
      borderRadius: happy
        ? `0 0 ${px(sr1)} ${px(sr1)} / 0 0 ${px(sr2)} ${px(sr2)}`
        : `${px(sr1)} ${px(sr1)} 0 0 / ${px(sr2)} ${px(sr2)} 0 0`,
      border: `${px(s * 0.05)} solid #000`,
      borderTop: happy ? 0 : null,
      borderBottom: happy ? null : 0,
      transition,
    };

    const _corner = {
      position: 'absolute',
      top: px(adjust(ss, -s * 0.07, -s * 0.03)),
      width: px(s * 0.05),
      height: px(adjust(ss, s * 0.15, s * 0.075)),
      borderRadius: `${px(s * 0.05)} / ${px(s * 0.08)}`,
      backgroundColor: '#000',
      display: happy ? null : 'none',
      transition,
    };

    const a = adjust(ss, 65, 0);

    leftCorner = {
      ..._corner,
      left: px(-s * 0.055),
      transform: `rotate(${a}deg)`,
    };

    rightCorner = {
      ..._corner,
      right: px(-s * 0.055),
      transform: `rotate(${-a}deg)`,
    };

    /******************************************************************************/

    const reflexionColor = ColorConverters.slide(mainColor, topColor, 0.4);
    const reflexionOpacity = Math.max(adjust(satisfaction, 0.8, -0.8), 0);

    reflexion1 = {
      position: 'absolute',
      left: px(s * 0.25),
      right: px(s * 0.25),
      top: px(s * 0.05),
      bottom: px(s * 0.4),
      borderRadius: px(s),
      background: `linear-gradient(180deg, white, ${reflexionColor})`,
      transform: 'scaleX(1.5)',
      opacity: reflexionOpacity,
    };

    reflexion2 = {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      borderStyle: 'solid',
      borderRadius: px(s),
      borderWidth: px(s * 0.025),
      borderColor: 'transparent white white transparent',
      transform: 'rotate(45deg)',
      opacity: reflexionOpacity,
    };
  }

  /******************************************************************************/

  const documentation = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: px(n(size) + 20),
  };

  /******************************************************************************/

  return {
    smiley,
    leftEye,
    rightEye,
    smile,
    leftCorner,
    rightCorner,
    reflexion1,
    reflexion2,
    documentation,
  };
}

/******************************************************************************/
