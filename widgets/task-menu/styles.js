/******************************************************************************/

export default function styles (_theme, _props) {
  const mainStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const tableStyle = {
    marginTop: '20px',
    display: 'flex',
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
    table: tableStyle,
    footer: footerStyle,
  };
}

/******************************************************************************/
