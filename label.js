'use strict';

/**
 * Retrieve the list of available commands.
 *
 * @returns {Object} The list and definitions of commands.
 */
exports.xcraftCommands = function () {
  return {
    handlers: require ('./lib/label.js').handlers,
    context: require ('./lib/label.js').context,
    rc: {
      create: {
        parallel: true,
        desc: 'xxx',
        options: {
          params: {
            required: 'id',
            optional: 'params',
          },
        },
      },
      text: {
        parallel: true,
        desc: 'xxx',
        options: {
          params: {
            required: 'id',
          },
        },
      },
      kind: {
        parallel: true,
        desc: 'xxx',
        options: {
          params: {
            required: 'id',
          },
        },
      },
      delete: {
        parallel: true,
        desc: 'xxx',
        options: {
          params: {
            required: 'id',
          },
        },
      },
    },
  };
};
