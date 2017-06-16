/******************************************************************************/

export default function styles (theme, props) {
  let width = props.width;
  let height = props.height;
  let backgroundColor = theme.palette.dialogBackground;
  let boxShadow = theme.shapes.dialogShadow;

  const boxStyle = {
    width: width,
    height: height,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: backgroundColor,
    boxShadow: boxShadow,
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
