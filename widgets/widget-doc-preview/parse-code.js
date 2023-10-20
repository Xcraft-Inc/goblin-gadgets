module.exports = function parseCode(code) {
  const matchComponent = code.match(/<(\w+)([^>]*)(?:>(.*?)(?:<\/\1>)|\/>)/);
  if (!matchComponent) {
    return {};
  }
  const [_, name, propsStr, children] = matchComponent;

  // Match propName, opening brace for propValue and propValue
  const propsRegex = /\s+(\w+)=(?:("[^"]*")|{(.*?(?=}))})/g;

  let match;
  const props = {};
  while ((match = propsRegex.exec(propsStr)) !== null) {
    const propName = match[1];
    let propValue = match[2] || match[3];

    try {
      propValue = eval(propValue);
    } catch (ex) {
      propValue = '...';
    }

    props[propName] = propValue;
  }

  if (children) {
    props.children = children;
  }

  return props;
};
