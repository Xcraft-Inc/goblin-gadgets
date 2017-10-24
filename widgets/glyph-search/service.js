'use strict';
const {buildWorkitem} = require ('goblin-rethink');

const config = {
  type: 'glyph',
  kind: 'search',
  hinters: {
    glyph: {
      onValidate: function (quest, selection) {
        const i = quest.openInventory ();
        const desk = i.use (quest.goblin.getX ('desktopId'));
        desk.addWorkitem ({
          workitem: {
            id: quest.uuidV4 (),
            name: 'glyph-workitem',
            description: selection.text,
            view: 'default',
            icon: 'edit-pen',
            isInWorkspace: true,
            isClosable: true,
            payload: {
              entityId: selection.value,
            },
          },
          navigate: true,
        });
      },
    },
  },
};

module.exports = buildWorkitem (config);
