import {Unit} from 'electrum-theme';

/******************************************************************************/

export const propNames = ['disabled', 'kind', 'shape', 'size'];

export default function styles(theme, props) {
  const {disabled, kind, shape = 'circle', size = '40px'} = props;

  const left = kind === 'left';

  let carouselButton;

  if (shape === 'semiCircle') {
    const d = Unit.multiply(size, 1 / 2);
    const p = Unit.multiply(size, 1 / 8);

    carouselButton = {
      'display': 'flex',
      'justifyContent': 'center',
      'alignItems': 'center',
      'width': Unit.sub(d, p),
      'height': size,
      'padding': left ? `0px ${p} 0px 0px` : `0px 0px 0px ${p}`,
      'borderRadius': left ? `0px ${d} ${d} 0px` : `${d} 0px 0px ${d}`,
      'backgroundColor': theme.palette.carouselButtonBackground,
      'color': theme.palette.carouselButtonGlyph,
      'fontSize': Unit.multiply(size, 1 / 4),
      'opacity': disabled ? 0.2 : 1,
      'cursor': disabled ? null : 'pointer',
      'transition': '0.1s ease-out',
      ':hover': {
        transform: disabled ? null : 'scale(1.1)',
        fontSize: disabled ? null : Unit.multiply(size, 1 / 3),
      },
    };
  } else {
    const d = Unit.multiply(size, 1 / 2);

    carouselButton = {
      'display': 'flex',
      'justifyContent': 'center',
      'alignItems': 'center',
      'width': size,
      'height': size,
      'borderRadius': d,
      'backgroundColor': theme.palette.carouselButtonBackground,
      'color': theme.palette.carouselButtonGlyph,
      'fontSize': Unit.multiply(size, 1 / 2),
      'opacity': disabled ? 0.2 : 1,
      'cursor': disabled ? null : 'pointer',
      'transition': '0.1s ease-out',
      ':hover': {
        transform: disabled ? null : 'scale(1.1)',
        fontSize: disabled ? null : Unit.multiply(size, 1 / 1.5),
      },
    };
  }

  return {
    carouselButton,
  };
}

/******************************************************************************/
