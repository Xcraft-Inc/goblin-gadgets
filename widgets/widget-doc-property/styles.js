/******************************************************************************/

export default function styles() {
  const propertyContainer = {
    borderBottom: '1px solid grey',
    padding: '5px',
  };

  const propertyRowContainer = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: '5px 0px',
  };

  const name = {
    fontWeight: 'bold',
  };

  const type = {
    fontSize: '80%',
    fontWeight: 'lighter',
    opacity: '0.75',
  };

  const required = {
    fontSize: '80%',
    color: 'red',
  };

  const optional = {
    fontSize: '80%',
    fontStyle: 'italic',
  };

  const defaultValue = {
    fontSize: '80%',
    color: 'green',
  };

  const description = {
    fontSize: '80%',
  };

  return {
    propertyContainer,
    propertyRowContainer,
    name,
    type,
    required,
    optional,
    defaultValue,
    description,
  };
}

/******************************************************************************/
