/******************************************************************************/

export default function styles() {
  const propertyContainer = {
    borderBottom: '1px solid grey',
    padding: '5px',
  };

  const propertyRowContainer = {
    display: 'flex',
    padding: '5px 0px',
  };

  const name = {
    fontWeight: 'bold',
  };

  const type = {
    fontWeight: 'lighter',
    opacity: '0.75',
  };

  const required = {
    color: 'red',
  };

  const optional = {
    fontStyle: 'italic',
  };

  const defaultValue = {
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
