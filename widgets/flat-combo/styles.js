/******************************************************************************/

export default function styles(theme, props) {
  const box = {
    flexGrow: props.grow,
    width: props.width,
    height: props.height,
    display: 'flex',
    flexDirection: 'row',
  };

  return {
    box,
  };
}

/******************************************************************************/
