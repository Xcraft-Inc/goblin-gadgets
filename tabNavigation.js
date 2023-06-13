const {Elf} = require('xcraft-core-goblin');
const {
  TabNavigation,
  TabNavigationLogic,
} = require('./widgets/tab-navigation/service.js');

exports.xcraftCommands = Elf.birth(TabNavigation, TabNavigationLogic);
