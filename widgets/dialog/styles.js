/******************************************************************************/

export default function styles(theme, props) {
  const boxStyle = {
    width: props.width,
    height: props.height,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: props.backgroundColor,
    boxShadow: props.boxShadow,
    zIndex: '2',
    position: 'absolute',
    left: '0px',
    right: '0px',
    top: '0px',
    bottom: '0px',
    margin: 'auto',
  };

  return {
    box: boxStyle,
  };
}

/******************************************************************************/
