function prepare(text) {
  if (text) {
    // npm react-tooltip require <br/> for line separator.
    return text.replace(/\n/i, '<br/>');
  } else {
    return text;
  }
}

//-----------------------------------------------------------------------------

module.exports = {
  prepare,
};
