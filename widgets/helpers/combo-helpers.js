import {Unit} from 'electrum-theme';

// Set the DragCab.hasCombo parent to true or false. It will be informed that a combo is
// opening, so as not to initiate a drag and drop.
export function setDragCabHasCombo (id, value) {
  for (let dragCab of window.document.dragCabs) {
    if (dragCab.props['drag-owner-id'] === id) {
      dragCab.hasCombo = value;
      return;
    }
  }
}

// Compute the location for a combo-menu.
// If x or y are undefined, the location is based on bounding rect of node.
export function getComboLocation (node, theme, name, x, y) {
  const rect = node.getBoundingClientRect ();

  // Compute horizontal position according to mouse or component.
  let center;
  if (x) {
    center = x + 'px';
  } else {
    center = (rect.left + rect.right) / 2 + 'px';
  }

  // Puts the menu under the component if it's in the upper half of the window.
  const t = name === 'flying-balloon'
    ? theme.shapes.flyingBalloonTriangleSize
    : theme.shapes.flyingDialogTriangleSize;
  let topValue, bottomValue;
  if (y) {
    topValue = Unit.add (window.innerHeight - y + 'px', t);
    bottomValue = Unit.add (y + 'px', t);
  } else {
    topValue = Unit.add (window.innerHeight - rect.top + 'px', t);
    bottomValue = Unit.add (rect.bottom + 'px', t);
  }
  const my = (rect.top + rect.bottom) / 2;
  const underside = my < window.innerHeight / 2;
  return {
    center: center,
    top: underside ? bottomValue : null,
    bottom: underside ? null : topValue,
  };
}
