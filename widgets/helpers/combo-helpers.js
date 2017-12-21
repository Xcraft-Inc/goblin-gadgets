import ReactDOM from 'react-dom';
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

function getFlyingOffset () {
  if (
    window.document.flyingDialogs &&
    window.document.flyingDialogs.length > 0
  ) {
    const flyingDialog =
      window.document.flyingDialogs[window.document.flyingDialogs.length - 1];
    const node = ReactDOM.findDOMNode (flyingDialog);
    const rect = node.getBoundingClientRect ();
    return {
      left: rect.left + 'px',
      top: rect.top + 'px',
    };
  } else {
    return {
      left: '0px',
      top: '0px',
    };
  }
}

export function getComboRightLocation (
  node,
  triangleSize,
  padding,
  itemCount,
  itemHeight
) {
  const rect = node.getBoundingClientRect ();

  const left = Unit.add (rect.right + 'px', triangleSize);
  const height = itemCount * Unit.parse (itemHeight).value;
  const top = Unit.add (
    rect.top - height / 2 + 'px',
    Unit.multiply (padding, 2)
  );

  const offset = getFlyingOffset ();

  return {
    left: Unit.sub (left, offset.left),
    top: Unit.sub (top, offset.top),
  };
}

// Compute the location for a combo-menu.
export function getComboLocation (
  node,
  triangleSize,
  padding,
  itemCount,
  itemWidth,
  itemHeight,
  x,
  y,
  distanceFromEdge
) {
  const rect = node.getBoundingClientRect ();

  // Compute horizontal position according to component.
  let center;
  if (x) {
    center = x + 'px';
  } else {
    center = (rect.left + rect.right) / 2 + 'px';
  }

  // Puts the menu under the component if it's in the upper half of the window.
  let topValue, bottomValue;
  if (y) {
    topValue = Unit.add (window.innerHeight - y + 'px', triangleSize);
    bottomValue = Unit.add (y + 'px', triangleSize);
  } else {
    topValue = Unit.add (window.innerHeight - rect.top + 'px', triangleSize);
    bottomValue = Unit.add (rect.bottom + 'px', triangleSize);
  }

  const tv = Unit.parse (triangleSize).value;
  const underMax = window.innerHeight - rect.bottom - tv - 20 + 'px';
  const overMax = rect.top - tv - 20 + 'px';
  const underside = (rect.top + rect.bottom) / 2 < window.innerHeight * 0.67;
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

  let triangleShift = null;
  if (distanceFromEdge) {
    const d = horizontalDeclipping (width, center, distanceFromEdge);
    center = d.center;
    triangleShift = d.triangleShift;
  }

  const offset = getFlyingOffset ();

  return {
    center: Unit.sub (center, offset.left),
    top: underside ? Unit.sub (bottomValue, offset.top) : null,
    bottom: underside ? null : Unit.sub (topValue, offset.top),
    maxHeight: maxHeight,
    width: width,
    menuItemWidth: itemWidth,
    triangleShift: triangleShift,
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

  const offset = getFlyingOffset ();

  return {
    left: Unit.sub (rect.left + 'px', offset.left),
    width: width,
    top: underside ? Unit.sub (bottomValue, offset.top) : null,
    bottom: underside ? null : Unit.sub (topValue, offset.top),
    maxHeight: underside ? underMax : overMax,
  };
}

// Compute the location for a work-dialog.
export function getVerticalDialogLocation (node, triangleSize) {
  const rect = node.getBoundingClientRect ();

  const left = Unit.add (rect.right + 'px', triangleSize);
  const center = (rect.top + rect.bottom) / 2 + 'px';

  return {
    left: left,
    center: center,
  };
}

// Declipping dialog-modal when it's out of window.
export function horizontalDeclipping (width, center, distanceFromEdge) {
  if (width && center && distanceFromEdge) {
    // Computation is impossible if width is undefined.
    const w = Unit.parse (width).value;
    const c = Unit.parse (center).value;
    const p = Unit.parse (distanceFromEdge).value; // does not touch the edge of the window

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

// Declipping dialog-modal when it's out of window.
export function verticalDeclipping (height, center, distanceFromEdge) {
  if (height && center && distanceFromEdge) {
    // Computation is impossible if height is undefined.
    const h = Unit.parse (height).value;
    const c = Unit.parse (center).value;
    const p = Unit.parse (distanceFromEdge).value; // does not touch the edge of the window

    // Compute triangleShift if dialog is out of top window border.
    const topShift = h / 2 + p - c;
    if (topShift > 0) {
      const newCenter = c + topShift;
      return {triangleShift: '-' + topShift + 'px', center: newCenter + 'px'};
    }

    // Compute triangleShift if dialog is out of bottom window border.
    const bottomShift = c + h / 2 + p - window.innerHeight;
    if (bottomShift > 0) {
      const newCenter = c - bottomShift;
      return {
        triangleShift: bottomShift + 'px',
        center: newCenter + 'px',
      };
    }
  }

  return {triangleShift: '0px', center: center};
}
