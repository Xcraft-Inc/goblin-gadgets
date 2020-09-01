module.exports = function parseCode(code) {
  // Match propName, opening brace for propValue and propValue
  const regex = /\s+(\w+)=(?:("[^"]*")|{([^}]*)})/g;

  let match;
  const props = {};
  while ((match = regex.exec(code)) !== null) {
    const propName = match[1];
    let propValue = match[2] || match[3];

    try {
      propValue = eval(propValue);
    } catch (ex) {
      propValue = '...';
    }

    props[propName] = propValue;
  }
  return props;
};
