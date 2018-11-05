const {T} = require('nabu/helpers/tooltip-helpers');

function prepare(text, state, widget) {
  if (!text) {
    return null;
  }
  const t = T(state, text, widget);
  if (t) {
    return t.replace(/<br\/>/gi, '\n');
  }
}

//-----------------------------------------------------------------------------

module.exports = {
  prepare,
};
