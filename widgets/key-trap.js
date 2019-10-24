/******************************************************************************/

function bind(key, action) {
  console.log(`key-trap.bind: key='${key}' size=${record.size}`);
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
  console.log(`key-trap.unbind: key='${key}' size=${record.size}`);
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
    action();
    e.stopPropagation();
  }
}

/******************************************************************************/

const record = new Map();

document.addEventListener('keydown', _handleKeyDown);

/******************************************************************************/

module.exports = {bind, unbind};
