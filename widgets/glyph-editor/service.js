'use strict';
const {buildWorkitem} = require ('goblin-rethink');

const config = {
  type: 'glyph',
  kind: 'editor',
};

module.exports = buildWorkitem (config);
