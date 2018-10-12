function prepare(text) {
  return text ? text.replace(/<br\/>/i, '\n') : text;
}

//-----------------------------------------------------------------------------

module.exports = {
  prepare,
};
