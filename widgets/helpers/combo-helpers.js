import {Unit} from 'electrum-theme';

// Set the DragCab.hasCombo parent to true or false. It will be informed that a combo is
// opening, so as not to initiate a drag and drop.
export function setDragCabHasCombo (id, value) {
  for (let dragCab of window.document.dragCabs) {
    if (dragCab.props.dragOwnerId === id) {
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
  const tv = Unit.parse (t).value;
  let topValue, bottomValue, underMax, overMax;
  if (y) {
    topValue = Unit.add (window.innerHeight - y + 'px', t);
    bottomValue = Unit.add (y + 'px', t);
    underMax = window.innerHeight - y - tv - 20 + 'px';
    overMax = y - tv - 20 + 'px';
  } else {
    topValue = Unit.add (window.innerHeight - rect.top + 'px', t);
    bottomValue = Unit.add (rect.bottom + 'px', t);
    underMax = window.innerHeight - rect.bottom - tv - 20 + 'px';
    overMax = rect.top - tv - 20 + 'px';
  }
  const my = (rect.top + rect.bottom) / 2;
  const underside = my < window.innerHeight / 2;
  return {
    center: center,
    top: underside ? bottomValue : null,
    bottom: underside ? null : topValue,
    maxHeight: underside ? underMax : overMax,
  };
}

// Compute the location for a select-menu.
export function getSelectLocation (node, theme) {
  const rect = node.getBoundingClientRect ();

  const t = theme.shapes.flyingBalloonTriangleSize;
  const tv = Unit.parse (t).value;

  const topValue = Unit.add (window.innerHeight - rect.top + 'px', t);
  const bottomValue = Unit.add (rect.bottom + 'px', t);
  const underMax = window.innerHeight - rect.bottom - tv - 20 + 'px';
  const overMax = rect.top - tv - 20 + 'px';
  const my = (rect.top + rect.bottom) / 2;
  const underside = my < window.innerHeight / 2;
  const width = Unit.sub (
    rect.width + 'px',
    Unit.multiply (theme.shapes.flyingBalloonPadding, 2)
  );

  return {
    left: rect.left + 'px',
    width: width,
    top: underside ? bottomValue : null,
    bottom: underside ? null : topValue,
    maxHeight: underside ? underMax : overMax,
  };
}

// Declipping dialog-modal when it's out of window.
export function declipping (width, center, padding) {
  if (width && center && padding) {
    // Computation is impossible if width is undefined.
    const w = Unit.parse (width).value;
    const c = Unit.parse (center).value;
    const p = Unit.parse (Unit.add (padding, '10px')).value; // 10px -> Does not touch the edge of the window, FIXME: move to theme

    // Compute triangleShift if dialog is out of left window border.
    const leftShift = w / 2 + p - c;
    if (leftShift > 0) {
      const newCenter = c + leftShift;
      return {triangleShift: leftShift + 'px', center: newCenter + 'px'};
    }

    // Compute triangleShift if dialog is out of right window border.
    const rightShift = c + w / 2 + p - window.innerWidth;
    if (rightShift > 0) {
      const newCenter = c - rightShift;
      return {triangleShift: '-' + rightShift + 'px', center: newCenter + 'px'};
    }
  }

  return {triangleShift: '0px', center: center};
}
