'use strict';
const {buildWorkitem} = require('goblin-rethink');

const config = {
  type: 'glyph',
  kind: 'detail',
};

module.exports = buildWorkitem(config);
