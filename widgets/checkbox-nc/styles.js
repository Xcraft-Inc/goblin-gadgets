import {ColorManipulator} from 'goblin-theme';

/******************************************************************************/

export const propNames = [
  'backgroundBrigtness',
  'checked',
  'disabled',
  'readonly',
  'text',
];

export default function styles(theme, props) {
  const {backgroundBrigtness, checked, disabled, readonly, text} = props;

  const isInactive = disabled || readonly;
  const isDark = backgroundBrigtness === 'dark';

  const f1 = isDark ? 0.0 : 0.2;
  const f2 = isDark ? 0.0 : 0.6;

  const colorBorderTop = ColorManipulator.lighten('#888', f1);
  const colorBorderBottom = ColorManipulator.lighten('#444', f1);
  const colorBackground1 = checked
    ? ColorManipulator.lighten('#888', f2)
    : ColorManipulator.lighten('#666', f2);
  const colorBackground2 = checked
    ? ColorManipulator.lighten('#555', f2)
    : ColorManipulator.lighten('#333', f2);

  const buttonRetro = {
    'display': 'flex',
    'flexDirection': text ? 'row' : 'column',
    'alignItems': 'center',
    ':hover .main-hover': {
      background: isInactive
        ? null
        : `radial-gradient(at 75% 75%, ${ColorManipulator.lighten(
            colorBackground1,
            0.2
          )}, ${ColorManipulator.lighten(colorBackground2, 0.2)})`,
    },
  };

  const buttonRetroMain = {
    position: 'relative',
    minWidth: '32px',
    minHeight: '32px',
    maxWidth: '32px',
    maxHeight: '32px',
    margin: `5px ${text ? '15px' : '0px'} 5px 0px`,
    boxSizing: 'border-box',
    borderRadius: '16px',
    borderTop: `3px solid ${colorBorderTop}`,
    borderLeft: `3px solid ${colorBorderTop}`,
    borderBottom: `3px solid ${colorBorderBottom}`,
    borderRight: `3px solid ${colorBorderBottom}`,
    background: `radial-gradient(at 75% 75%, ${colorBackground1}, ${colorBackground2})`,
    boxShadow: isDark
      ? '2px 5px 12px 0px rgba(0,0,0,1)'
      : '2px 5px 12px 0px rgba(0,0,0,0.4)',
    opacity: isInactive ? 0.5 : 1,
    transition: '0.2s ease-out',
  };

  const checkButtonRetroStem = {
    position: 'absolute',
    top: '4px',
    bottom: '4px',
    left: '10px',
    right: '10px',
    boxSizing: 'border-box',
    borderRadius: '8px',
    border: `1px solid ${isDark ? '#aaa' : '#eee'}`,
    backgroundColor: '#333',
  };

  const checkButtonRetroTip = {
    position: 'absolute',
    top: checked ? '-6px' : '16px',
    left: '5px',
    width: '16px',
    height: '16px',
    boxSizing: 'border-box',
    borderRadius: '8px',
    border: '1px solid #111',
    boxShadow: '2px 5px 17px 0px #111',
    background: checked
      ? 'radial-gradient(at 30% 30%, #bbb, #333 40%)'
      : 'radial-gradient(at 30% 30%, #fff, #bbb 40%)',
    transition: '0.2s ease-out',
  };

  const radioButtonRetroBullet = {
    position: 'absolute',
    top: checked ? '5px' : '2px',
    bottom: checked ? '5px' : '2px',
    left: checked ? '5px' : '2px',
    right: checked ? '5px' : '2px',
    boxSizing: 'border-box',
    borderRadius: '16px',
    border: `1px solid ${checked ? '#111' : '#888'}`,
    background: checked
      ? 'radial-gradient(at 30% 30%, #bbb, #333 40%)'
      : 'radial-gradient(at 30% 30%, #fff, #bbb 40%)',
    transition: '0.2s ease-out',
  };

  /******************************************************************************/

  return {
    buttonRetro,
    buttonRetroMain,

    checkButtonRetroStem,
    checkButtonRetroTip,

    radioButtonRetroBullet,
  };
}

/******************************************************************************/
