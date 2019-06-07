/******************************************************************************/

export default function styles() {
  const propertyContainer = {
    display: 'flex',
    flexDirection: 'column',
  };

  const propertyRowContainer = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: '5px 0px',
  };

  const name = {
    marginTop: '6px',
    width: '180px',
  };

  const control = {
    flexGrow: '1',
    flexBasis: '0',
    marginRight: '10px',
  };

  const type = {
    marginTop: '8px',
    width: '80px',
    fontSize: '80%',
    fontWeight: 'lighter',
    opacity: '0.75',
  };

  const defaultValue = {
    marginTop: '8px',
    width: '60px',
    fontSize: '80%',
    color: 'green',
  };

  const required = {
    marginTop: '8px',
    width: '60px',
    fontSize: '80%',
    color: 'red',
  };

  const optional = {
    marginTop: '8px',
    width: '60px',
    fontSize: '80%',
    fontStyle: 'italic',
  };

  const description = {
    margin: '0px 0px 10px 180px',
    fontSize: '80%',
    opacity: '0.5',
  };

  return {
    propertyContainer,
    propertyRowContainer,
    name,
    control,
    type,
    defaultValue,
    required,
    optional,
    description,
  };
}

/******************************************************************************/
