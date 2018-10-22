function prepare(text) {
  return text ? text.replace(/<br\/>/gi, '\n') : text;
}

//-----------------------------------------------------------------------------

module.exports = {
  prepare,
};
