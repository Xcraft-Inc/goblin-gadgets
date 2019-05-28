/******************************************************************************/

export default function styles() {
  const propertyContainer = {
    display: 'flex',
    flexDirection: 'column',
  };

  const propertyRowContainer = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '5px 0px',
  };

  const name = {
    width: '180px',
  };

  const control = {
    flexGrow: '1',
    marginRight: '10px',
  };

  const type = {
    width: '80px',
    fontSize: '80%',
    fontWeight: 'lighter',
    opacity: '0.75',
  };

  const defaultValue = {
    width: '60px',
    fontSize: '80%',
    color: 'green',
  };

  const required = {
    width: '60px',
    fontSize: '80%',
    color: 'red',
  };

  const optional = {
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
