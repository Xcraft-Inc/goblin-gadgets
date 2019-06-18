/******************************************************************************/

export default function styles(theme) {
  const mainStyle = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
  };

  const tableStyle = {
    marginTop: '20px',
    display: 'flex',
  };

  const footerStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    minHeight: theme.shapes.actionHeight,
    overflowX: 'hidden',
    overflowY: 'hidden',
  };

  return {
    main: mainStyle,
    table: tableStyle,
    footer: footerStyle,
  };
}

/******************************************************************************/
