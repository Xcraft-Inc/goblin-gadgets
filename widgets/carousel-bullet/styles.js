/******************************************************************************/

export const propNames = ['selected'];

export default function styles(theme, props) {
  const {selected} = props;

  const carouselBullet = {
    'width': '10px',
    'height': '10px',
    'margin': '0px 7px',
    'border': `2px solid ${theme.palette.carouselBulletBorder}`,
    'borderRadius': '10px',
    'backgroundColor': selected
      ? theme.palette.carouselBulletBorder
      : theme.palette.carouselBulletBackground,
    'cursor': 'pointer',
    'transition': '0.1s ease-out',
    ':hover': {
      transform: 'scale(1.2)',
    },
  };

  return {
    carouselBullet,
  };
}

/******************************************************************************/
