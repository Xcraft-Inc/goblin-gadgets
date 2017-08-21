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
export function getComboLocation (
  node,
  triangleSize,
  padding,
  itemCount,
  itemWidth,
  itemHeight
) {
  const rect = node.getBoundingClientRect ();

  // Compute horizontal position according to component.
  const center = (rect.left + rect.right) / 2 + 'px';

  // Puts the menu under the component if it's in the upper half of the window.
  const topValue = Unit.add (
    window.innerHeight - rect.top + 'px',
    triangleSize
  );
  const bottomValue = Unit.add (rect.bottom + 'px', triangleSize);

  const tv = Unit.parse (triangleSize).value;
  const underMax = window.innerHeight - rect.bottom - tv - 20 + 'px';
  const overMax = rect.top - tv - 20 + 'px';
  const underside = (rect.top + rect.bottom) / 2 < window.innerHeight / 2;
  let maxHeight = underside ? underMax : overMax;

  let width = null;
  if (itemCount && itemHeight) {
    if (!itemWidth) {
      // If itemWidth is undefined, take the width of component.
      itemWidth = Unit.sub (rect.width + 'px', Unit.multiply (padding, 2));
      itemWidth = Unit.sub (itemWidth, '1px');
    }
    let maxRows = Math.floor (
      Unit.parse (maxHeight).value / Unit.parse (itemHeight).value
    );
    const columnCount = Math.max (Math.ceil (itemCount / maxRows), 1);
    width = Unit.parse (itemWidth).value * columnCount + 'px';
    maxRows = Math.ceil (itemCount / columnCount);
    maxHeight = maxRows * Unit.parse (itemHeight).value + 'px';
  }

  return {
    center: center,
    top: underside ? bottomValue : null,
    bottom: underside ? null : topValue,
    maxHeight: maxHeight,
    width: width,
    menuItemWidth: itemWidth,
  };
}

// Compute the location for a select-menu.
export function getSelectLocation (node, triangleSize, padding) {
  const rect = node.getBoundingClientRect ();

  const topValue = Unit.add (
    window.innerHeight - rect.top + 'px',
    triangleSize
  );
  const bottomValue = Unit.add (rect.bottom + 'px', triangleSize);

  const tv = Unit.parse (triangleSize).value;
  const underMax = window.innerHeight - rect.bottom - tv - 20 + 'px';
  const overMax = rect.top - tv - 20 + 'px';
  const underside = (rect.top + rect.bottom) / 2 < window.innerHeight / 2;

  const width = Unit.sub (rect.width + 'px', Unit.multiply (padding, 2));

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
