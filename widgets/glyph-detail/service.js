'use strict';
const {buildWorkitem} = require('goblin-workshop');

const config = {
  type: 'glyph',
  kind: 'detail',
};

module.exports = buildWorkitem(config);
