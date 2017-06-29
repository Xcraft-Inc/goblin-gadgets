import {StyleSheet, css} from 'aphrodite/no-important';
import traverse from 'traverse';

export default function injectCSS (classes) {
  traverse (classes).forEach (function (style) {
    if (style === undefined || style === null) {
      this.delete ();
    }
  });

  const sheet = StyleSheet.create (classes);
  Object.keys (sheet).forEach (key => (sheet[key] = css (sheet[key])));
  return sheet;
}
