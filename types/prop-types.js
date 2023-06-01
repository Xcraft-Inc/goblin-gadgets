'use strict';

import PropTypes from 'prop-types';
import {Check, isAnyType} from 'xcraft-core-stones';
import fullTypeName from 'xcraft-core-stones/full-type-name.js';
import errorMessage from 'xcraft-core-stones/error-message.js';

/******************************************************************************/

function getType(type) {
  const baseName = type.name;
  switch (baseName) {
    case 'any':
      return PropTypes.any;
    case 'string':
      return PropTypes.string;
    case 'number':
      return PropTypes.number;
    case 'nabu':
      return (props, propName, componentName) => {
        const prop = props[propName];
        if (prop !== null && prop !== undefined) {
          if (typeof prop === 'object') {
            let isNabu =
              'nabuId' in prop ||
              ('_type' in prop &&
                (prop['_type'] === 'translatableString' ||
                  prop['_type'] === 'translatableMarkdown'));
            // Handle Map or OrderedMap
            if (prop.get) {
              isNabu = prop.get('nabuId') ? true : false;
              if (!isNabu) {
                isNabu =
                  prop.get('_type') === 'translatableString' ||
                  prop.get('_type') === 'translatableMarkdown';
              }
            }
            if (!isNabu) {
              return new Error(
                'Invalid prop `' +
                  propName +
                  ' of value "' +
                  prop +
                  '" supplied to' +
                  ' `' +
                  componentName +
                  '`. Validation failed. Missing nabuId !'
              );
            }
          } else if (typeof prop !== 'string' && typeof prop !== 'number') {
            return new Error(
              'Invalid prop `' +
                propName +
                ' of value "' +
                prop +
                '" supplied to' +
                ' `' +
                componentName +
                '`. Validation failed.'
            );
          }
        }
      };
    case 'union': {
      const types = type.types.map((t) => getType(t));
      return PropTypes.oneOfType(types);
    }
    case 'boolean':
      return PropTypes.oneOf([false, true]);
    case 'enumeration':
      return PropTypes.oneOf(type.values);
    case 'object': {
      if (!type.properties) {
        return PropTypes.object;
      }
      const shape = Object.fromEntries(
        Object.entries(type.properties).map(([name, t]) => [name, getType(t)])
      );
      return PropTypes.exact(shape);
    }
    case 'array': {
      const valuesType = getType(type.valuesType);
      return PropTypes.arrayOf(valuesType);
    }
    case 'component':
      return PropTypes.node;
    case 'function':
      return PropTypes.func;
    case 'percentage':
      return PropTypes.string;
    default:
      if (isAnyType(type)) {
        return (props, propName, componentName) => {
          const prop = props[propName];
          if (prop === undefined) {
            return;
          }
          const check = new Check();
          if (!check.type(prop, type)) {
            return new Error(
              `Invalid prop \`${propName}\` of value "${prop}" supplied to\`${componentName}\`.\n` +
                `Error with type \`${fullTypeName(type)}\`.\n'` +
                check.errors.map((err) => errorMessage(err)).join('\n')
            );
          }
        };
      }
      throw new Error(`Unknown prop type for '${type.name}'`);
  }
}

function getPropType(prop) {
  let propType = prop.type.propType || getType(prop.type.type);
  if (prop.required && propType !== undefined) {
    propType = propType.isRequired;
  }
  return propType;
}

function getDefaultProp(prop) {
  if (prop.defaultValue !== undefined) {
    return prop.defaultValue;
  } else {
    return null;
  }
}

/******************************************************************************/

export function makePropTypes(props) {
  const propTypes = {};
  for (const prop of props) {
    propTypes[prop.name] = getPropType(prop);
  }
  return propTypes;
}

export function makeDefaultProps(props) {
  const defaultProps = {};
  for (const prop of props) {
    const d = getDefaultProp(prop);
    if (d !== null) {
      defaultProps[prop.name] = d;
    }
  }
  return defaultProps;
}
