/******************************************************************************/

export const propNames = ['selected'];

export default function styles(theme, props) {
  const {selected} = props;

  const bullet = {
    'width': '10px',
    'height': '10px',
    'margin': '0px 7px',
    'border': `2px solid ${theme.palette.carouselBulletBorder}`,
    'borderRadius': '10px',
    'backgroundColor': selected
      ? theme.palette.carouselBulletBorder
      : theme.palette.carouselBulletBackground,
    'cursor': 'pointer',
    'transition': theme.transitions.hover,
    ':hover': {
      transform: 'scale(1.2)',
    },
  };

  return {
    bullet,
  };
}

/******************************************************************************/
