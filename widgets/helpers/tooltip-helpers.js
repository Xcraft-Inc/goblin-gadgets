//T:2019-02-27
function prepare(text) {
  return text ? text.replace(/<br\/>/gi, '\n') : text;
}

//-----------------------------------------------------------------------------

module.exports = {
  prepare,
};
