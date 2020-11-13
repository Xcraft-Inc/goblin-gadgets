/******************************************************************************/

export default function styles(theme) {
  const inputfile = {
    'width': '0.1px',
    'height': '0.1px',
    'opacity': 0,
    'overflow': 'hidden',
    'position': 'absolute',
    'zIndex': -1,
    '& + label': {
      fontSize: '1.25em',
      color: theme.palette.textColor || 'black',
      backgroundColor: theme.palette.inputFileBackground,
      display: 'inline-block',
      border: '1px solid ' + theme.palette.inputFileBorderColor,
      padding: '10px',
    },
    '& + label:hover': {
      backgroundColor: theme.palette.inputFileBackgroundHover || 'grey',
    },
    ':focus + label': {
      backgroundColor: theme.palette.inputFileBackgroundHover || 'grey',
    },
  };

  const label = {
    display: 'inline-block',
    cursor: 'pointer',
  };

  return {
    inputfile,
    label,
  };
}

/******************************************************************************/
