'use strict';
const {buildHinter} = require ('goblin-rethink');
/**
 * Retrieve the list of available commands.
 *
 * @returns {Object} The list and definitions of commands.
 */
exports.xcraftCommands = function () {
  return buildHinter ({
    type: 'glyph',
    table: 'glyphs',
    field: 'name',
    newWorkitem: {
      name: 'glyph-editor',
      description: 'Nouveau pictogramme',
      view: 'admin',
      icon: 'edit-pen',
      mapNewValueTo: 'name',
      isInWorkspace: true,
      isClosable: true,
      navigate: true,
    },
    title: 'Pictogrammes', // FIXME: why does not displayed in hinter ???
    newButtonTitle: 'Nouveau pictogramme',
  });
};
