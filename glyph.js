'use strict';

/**
 * Retrieve the list of available commands.
 *
 * @returns {Object} The list and definitions of commands.
 */

const {buildEntity} = require ('goblin-rethink');
exports.xcraftCommands = function () {
  return buildEntity ({
    type: 'glyph',
    table: 'glyphs',
    onNew: function (quest, id, order, name, glyph, color, description) {
      return {
        id,
        name: name || 'new',
        glyph: glyph || 'bookmark',
        color: color || null,
        description: description || 'new',
      };
    },
  });
};
