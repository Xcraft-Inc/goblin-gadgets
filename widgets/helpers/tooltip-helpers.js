const {T} = require('nabu/helpers/tooltip-helpers');

function prepare(text, state, widget) {
  return text ? T(state, text, widget).replace(/<br\/>/gi, '\n') : text;
}

//-----------------------------------------------------------------------------

module.exports = {
  prepare,
};
