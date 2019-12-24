/******************************************************************************/

export const propNames = ['disabled', 'kind'];

export default function styles(theme, props) {
  const {disabled, kind} = props;

  const left = kind === 'left';

  const carouselButton = {
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    'width': '30px',
    'height': '80px',
    'padding': left ? '0px 10px 0px 0px' : '0px 0px 0px 10px',
    'borderRadius': left ? '0px 40px 40px 0px' : '40px 0px 0px 40px',
    'backgroundColor': theme.palette.carouselButtonBackground,
    'color': theme.palette.carouselButtonGlyph,
    'fontSize': '20px',
    'opacity': disabled ? 0.2 : 1,
    'cursor': disabled ? null : 'pointer',
    'transition': theme.transitions.hover,
    ':hover': {
      transform: disabled ? null : 'scale(1.1)',
      fontSize: disabled ? null : '25px',
    },
  };

  return {
    carouselButton,
  };
}

/******************************************************************************/
