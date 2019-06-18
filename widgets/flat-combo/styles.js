/******************************************************************************/

export const propNames = ['grow', 'width', 'height'];

export default function styles(theme, props) {
  const {grow, width, height} = props;

  const box = {
    flexGrow: grow,
    width: width,
    height: height,
    display: 'flex',
    flexDirection: 'row',
  };

  return {
    box,
  };
}

/******************************************************************************/
