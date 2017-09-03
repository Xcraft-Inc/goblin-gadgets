/******************************************************************************/

export default function styles (_theme, _props) {
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
    minHeight: '50px',
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
