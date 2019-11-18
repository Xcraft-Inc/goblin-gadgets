/******************************************************************************/

export default function styles(theme) {
  const markdown = {
    'userSelect': 'text',
    '& pre': {
      display: 'block',
      margin: 0,
    },

    '& xmp': {
      display: 'block',
      margin: 0,
    },

    '& plaintext': {
      display: 'block',
      margin: 0,
    },

    '& listing': {
      display: 'block',
      margin: 0,
    },

    '& code': {
      font: 'inherit',
      color: theme.palette.markdownHiliteText,
      backgroundColor: theme.palette.markdownHiliteBackground,
      padding: '1px',
      margin: 0,
    },

    '& h1': {
      fontSize: theme.shapes.markdownH1FontSize,
      fontWeight: 300,
      margin: '0px',
      marginTop: '8px',
    },

    '& h1:firstOfType': {
      marginTop: '0px',
    },

    '& h2': {
      fontSize: theme.shapes.markdownH2FontSize,
      fontWeight: 300,
      margin: '0px',
      marginTop: '8px',
    },

    '& h2:firstOfType': {
      marginTop: 0,
    },

    '& p': {
      margin: 0,
    },

    '& ul': {
      fontSize: theme.shapes.markdownListFontSize,
      margin: 0,
      paddingLeft: theme.shapes.markdownListPadding,
      listStyleType: 'disc',
    },

    '& ol': {
      fontSize: theme.shapes.markdownListFontSize,
      margin: 0,
      paddingLeft: theme.shapes.markdownListPadding,
    },
  };

  return {
    markdown,
  };
}

/******************************************************************************/
