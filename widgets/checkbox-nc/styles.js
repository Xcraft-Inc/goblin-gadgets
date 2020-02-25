import * as Bool from 'gadgets/helpers/bool-helpers';

/******************************************************************************/

export const propNames = ['kind', 'disabled', 'readonly'];

export default function styles(theme, props) {
  const {kind, disabled, readonly} = props;

  const inactive = Bool.isTrue(disabled) || Bool.isTrue(readonly);
  const colorShadow = kind === 'switch-dark' ? '#111' : '#444';

  const checkButtonRetro = {
    'display': 'flex',
    'flexDirection': 'row',
    'alignItems': 'center',
    ':hover .main-off-hover': {
      background: inactive ? null : 'radial-gradient(at 75% 75%, #888, #555)',
    },
    ':hover .main-on-hover': {
      background: inactive ? null : 'radial-gradient(at 75% 75%, #aaa, #777)',
    },
  };

  const checkButtonRetroMainOff = {
    position: 'relative',
    width: '32px',
    height: '32px',
    margin: '5px 15px 5px 0px',
    boxSizing: 'border-box',
    borderRadius: '16px',
    borderTop: '3px solid #888',
    borderLeft: '3px solid #888',
    borderBottom: '3px solid #444',
    borderRight: '3px solid #444',
    background: 'radial-gradient(at 75% 75%, #666, #333)',
    boxShadow: `2px 5px 17px 0px ${colorShadow}`,
    opacity: inactive ? 0.5 : 1,
    transition: '0.2s ease-out',
  };

  const checkButtonRetroMainOn = {
    ...checkButtonRetroMainOff,
    background: 'radial-gradient(at 75% 75%, #888, #555)',
  };

  const checkButtonRetroStem = {
    position: 'absolute',
    top: '4px',
    bottom: '4px',
    left: '10px',
    right: '10px',
    boxSizing: 'border-box',
    borderRadius: '8px',
    border: '1px solid #aaa',
    backgroundColor: '#333',
  };

  const checkButtonRetroTipOff = {
    position: 'absolute',
    top: '16px',
    left: '5px',
    width: '16px',
    height: '16px',
    boxSizing: 'border-box',
    borderRadius: '8px',
    border: '1px solid #111',
    boxShadow: '2px 5px 17px 0px #111',
    background: 'radial-gradient(at 30% 30%, #bbb, #333 40%)',
    transition: '0.2s ease-out',
  };

  const checkButtonRetroTipOn = {
    ...checkButtonRetroTipOff,
    top: '-6px',
    background: 'radial-gradient(at 30% 30%, #fff, #bbb 40%)',
  };

  /******************************************************************************/

  return {
    checkButtonRetro,
    checkButtonRetroMainOff,
    checkButtonRetroMainOn,
    checkButtonRetroStem,
    checkButtonRetroTipOff,
    checkButtonRetroTipOn,
  };
}

/******************************************************************************/
