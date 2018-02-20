/******************************************************************************/

export default function styles(_theme, _props) {
  const mainStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const glyphsStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    maxHeight: '300px',
    marginTop: '20px',
    overflowX: 'hidden',
    overflowY: 'auto',
  };

  const footerStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: '80px',
    overflowX: 'hidden',
    overflowY: 'hidden',
    marginTop: '10px',
  };

  return {
    main: mainStyle,
    glyphs: glyphsStyle,
    footer: footerStyle,
  };
}

/******************************************************************************/
