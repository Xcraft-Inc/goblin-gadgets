//****************************************************************************//
//            _                          _                                    //
//           | |                        | |                                   //
//           | | __  ___  _   _  ______ | |_  _ __   __ _  _ __               //
//           | |/ / / _ \| | | ||______|| __|| '__| / _` || '_ \              //
//           |   < |  __/| |_| |        | |_ | |   | (_| || |_) |             //
//           |_|\_\ \___| \__, |         \__||_|    \__,_|| .__/              //
//                         __/ |                          | |                 //
//                        |___/                           |_|                 //
//                                                                            //
//  This helpers replaces MouseTrap for nested keys.                          //
//  When multiple actors subscribe to an action for the same key, the action  //
//  must be performed only for the last registered.                           //
//****************************************************************************//

// Powered by https://www.messletters.com/en/big-text/

// For example, a popup contains a sub-popup in which a combo-menu has been opened.
// The Esc key must close the items in the following order:
// 1) combo-menu
// 2) sub-popup
// 3) popup
// For this, it is necessary that all actors use key-trap.

/******************************************************************************/

function bind(key, action) {
  //- console.log(`key-trap.bind: key='${key}' size=${record.size}`);
  if (!action) {
    console.warn(`key-trap.bind: no action for key='${key}'`);
    return;
  }

  if (!record.has(key)) {
    record.set(key, []);
  }

  const actions = record.get(key);
  const i = actions.indexOf(action);
  if (i === -1) {
    actions.push(action);
  } else {
    console.warn(`key-trap.bind: action for key='${key}' are already binded`);
  }
}

function unbind(key, action) {
  //- console.log(`key-trap.unbind: key='${key}' size=${record.size}`);
  if (!action) {
    console.warn(`key-trap.unbind: no action for key='${key}'`);
    return;
  }

  const actions = record.get(key);
  if (!actions) {
    console.warn(`key-trap.unbind: key='${key}' are not binded`);
    return;
  }

  const i = actions.indexOf(action);
  if (i !== -1) {
    actions.splice(i, 1);

    if (actions.length === 0) {
      record.delete(key);
    }
  } else {
    console.warn(`key-trap.unbind: no action are binded for key='${key}'`);
  }
}

/******************************************************************************/

function _handleKeyDown(e) {
  const actions = record.get(e.key);
  if (actions) {
    if (actions.length === 0) {
      console.warn(
        `key-trap._handleKeyDown: no action are binded for key='${e.key}'`
      );
      return;
    }
    const action = actions[actions.length - 1];
    action(e);
  }
}

/******************************************************************************/

const record = new Map();

document.addEventListener('keydown', _handleKeyDown);

/******************************************************************************/

module.exports = {bind, unbind};
