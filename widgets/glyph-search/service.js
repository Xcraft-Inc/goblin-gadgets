'use strict';
const {buildWorkitem} = require ('goblin-rethink');

const config = {
  type: 'glyph',
  kind: 'search',
  hinters: {
    glyph: {
      onValidate: function* (quest, selection) {
        const i = quest.openInventory ();
        const desk = i.use (quest.goblin.getX ('desktopId'));
        const glyph = yield quest.warehouse.get ({path: selection.value});
        desk.addWorkitem ({
          workitem: {
            id: quest.uuidV4 (),
            name: 'glyph-workitem',
            description: glyph.meta.info,
            view: 'default',
            icon: 'edit-pen',
            isInWorkspace: true,
            isClosable: true,
            payload: {
              entityId: selection.value,
              entity: glyph,
            },
          },
          navigate: true,
        });
      },
    },
  },
};

module.exports = buildWorkitem (config);
