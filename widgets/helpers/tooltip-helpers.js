function prepare(text) {
  if (text) {
    return text.replace(/\n/i, '<br/>');
  } else {
    return text;
  }
}

//-----------------------------------------------------------------------------

module.exports = {
  prepare,
};
