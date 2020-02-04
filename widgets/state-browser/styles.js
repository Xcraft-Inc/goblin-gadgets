/******************************************************************************/

export const propNames = ['width', 'grow'];

export default function styles(theme, props) {
  const {width = '100%', grow = '1'} = props;

  const container = {
    display: 'flex',
    width,
    grow,
  };

  return {
    container,
  };
}

/******************************************************************************/
