//T:2019-02-27
// See http://www.javascripter.net/faq/operatin.htm
function getOSName() {
  const v = navigator.appVersion;
  if (v.indexOf('Win') !== -1) {
    return 'Windows';
  } else if (v.indexOf('Mac') !== -1) {
    return 'MacOS';
  } else if (v.indexOf('X11') !== -1) {
    return 'UNIX';
  } else if (v.indexOf('Linux') !== -1) {
    return 'Linux';
  } else {
    return 'x';
  }
}

function replace(text, search, futur) {
  return text.replace(new RegExp(search, 'g'), futur);
}

// Return the final text for a shortcut. Replace the meta keys
// (noted with _key_) by the key according to OS.
export function getShortcut(text) {
  if (text) {
    const os = getOSName();
    const ctrl = {
      Windows: 'Ctrl',
      MacOS: 'cmd',
      UNIX: 'ctrl',
      Linux: 'ctrl',
      x: 'ctrl',
    }[os];
    const shift = {
      Windows: 'Maj',
      MacOS: 'maj',
      UNIX: 'maj',
      Linux: 'maj',
      x: 'maj',
    }[os];
    const alt = {
      Windows: 'Alt',
      MacOS: 'alt',
      UNIX: 'alt',
      Linux: 'alt',
      x: 'alt',
    }[os];
    text = replace(text, '_ctrl_', ctrl);
    text = replace(text, '_shift_', shift);
    text = replace(text, '_alt_', alt);
    // return '[' + text + ']';
    return text; // more simple without [] !
  } else {
    return null;
  }
}
