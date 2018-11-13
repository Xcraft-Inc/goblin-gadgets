function prepare(text) {
  return text ? text.replace(/<br\/>/gi, '\n') : null;
}

//-----------------------------------------------------------------------------

module.exports = {
  prepare,
};
