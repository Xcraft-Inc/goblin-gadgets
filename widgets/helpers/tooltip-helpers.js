const {T} = require('nabu/helpers/tooltip-helpers');

function prepare(text, state, widget) {
  return text ? T(state, text, widget).replace(/<br\/>/i, '\n') : text;
}

//-----------------------------------------------------------------------------

module.exports = {
  prepare,
};
