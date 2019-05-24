import PropTypes from 'prop-types';

function getPropType(prop) {
  let propType;
  switch (prop.type.type) {
    case 'bool':
      propType = PropTypes.bool;
      break;
    case 'string':
      propType = PropTypes.string;
      break;
    case 'enum':
      propType = PropTypes.oneOf(prop.type.values);
      break;
    case 'component':
      propType = PropTypes.node;
      break;
    case 'function':
      propType = PropTypes.func;
      break;
    case 'color':
      propType = PropTypes.string;
      break;
    case 'size':
      propType = PropTypes.string;
      break;
    case 'glyph':
      propType = PropTypes.string;
      break;
    default:
      throw new Error(`Unknown prop type: '${prop.type.type}'`);
  }
  if (prop.required) {
    propType = propType.isRequired;
  }
  return propType;
}

export default function makePropTypes(props) {
  const propTypes = {};
  for (const prop of props) {
    propTypes[prop.name] = getPropType(prop);
  }
  return propTypes;
}
