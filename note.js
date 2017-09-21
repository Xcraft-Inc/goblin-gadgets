'use strict';

/**
 * Retrieve the list of available commands.
 *
 * @returns {Object} The list and definitions of commands.
 */

const {buildEntity} = require ('goblin-rethink');
exports.xcraftCommands = function () {
  return buildEntity ({
    type: 'note',
    table: 'notes',
    references: {
      glyphIds: 'glyph[]',
    },
    onNew: function (quest, id, content, forEntity) {
      return {
        id,
        content: content || '',
        glyphIds: [],
        forEntity: forEntity || null,
      };
    },
  });
};
