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
    buildInfo: note => {
      //FIXME: build info from note
      return 'note';
    },
    onNew: function (quest, id, content, glyphIds, forEntity) {
      return {
        id,
        content: content || '',
        glyphIds: glyphIds || [],
        forEntity: forEntity || null,
      };
    },
  });
};
