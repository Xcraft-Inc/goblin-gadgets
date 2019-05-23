export default function styles() {
  const container = {
    margin: '0px',
    padding: '0px',
    display: 'flex',
    flexDirection: 'row',
    flexGrow: '1',
  };

  const column = {
    display: 'flex',
    flexDirection: 'column',
    margin: '0px 5px 0px 0px',
    padding: '10px',
    overflowY: 'auto',
    backgroundColor: '#F2F2F2',
  };

  const widget = {
    ...column,
    backgroundColor: '#222',
  };

  const properties = {
    ...column,
    maxWidth: '40%',
  };

  const preview = {
    ...column,
    flexGrow: '1',
    flexBasis: '0',
    display: 'block',
  };

  return {
    container,
    widget,
    properties,
    preview,
  };
}

/******************************************************************************/
