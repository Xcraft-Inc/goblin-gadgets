//T:2019-02-27
const {Unit} = require('goblin-theme');
const px = Unit.toPx;
const n = Unit.toValue;

function getFlyingOffset() {
  const flyingDialogs = window.document.flyingDialogs;
  if (flyingDialogs && flyingDialogs.length > 0) {
    const flyingDialog = flyingDialogs[flyingDialogs.length - 1];
    const node = flyingDialog.ref;
    if (node) {
      const rect = node.getBoundingClientRect();
      return {
        left: px(rect.left),
        top: px(rect.top),
      };
    }
  }
  return {
    left: '0px',
    top: '0px',
  };
}

function getComboRightLocation(
  node,
  triangleSize,
  padding,
  itemCount,
  itemHeight
) {
  const rect = node.getBoundingClientRect();

  const left = Unit.add(px(rect.right), triangleSize);
  const height = itemCount * Unit.parse(itemHeight).value;
  const top = Unit.add(px(rect.top - height / 2), Unit.multiply(padding, 2));

  const offset = getFlyingOffset();

  return {
    left: Unit.sub(left, offset.left),
    top: Unit.sub(top, offset.top),
  };
}

// Compute the location for a combo-menu.
function getComboLocation(
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
  const rect = node.getBoundingClientRect();

  // Compute horizontal position according to component.
  let center;
  if (x) {
    center = px(x);
  } else {
    center = px((rect.left + rect.right) / 2);
  }

  // Puts the menu under the component if it's in the upper half of the window.
  let topValue, bottomValue;
  if (y) {
    topValue = Unit.add(px(window.innerHeight - y), triangleSize);
    bottomValue = Unit.add(px(y), triangleSize);
  } else {
    topValue = Unit.add(px(window.innerHeight - rect.top), triangleSize);
    bottomValue = Unit.add(px(rect.bottom), triangleSize);
  }

  const tv = Unit.parse(triangleSize).value;
  const underMax = px(window.innerHeight - rect.bottom - tv - 20);
  const overMax = px(rect.top - tv - 20);
  const underside = (rect.top + rect.bottom) / 2 < window.innerHeight * 0.67;
  let maxHeight = underside ? underMax : overMax;

  let width = null;
  if (itemCount && itemHeight) {
    if (!itemWidth) {
      // If itemWidth is undefined, take the width of component.
      itemWidth = Unit.sub(px(rect.width), Unit.multiply(padding, 2));
      itemWidth = Unit.sub(itemWidth, '1px');
    }
    let maxRows = Math.floor(
      Unit.parse(maxHeight).value / Unit.parse(itemHeight).value
    );
    const columnCount = Math.max(Math.ceil(itemCount / maxRows), 1);
    width = px(n(itemWidth) * columnCount);
    maxRows = Math.ceil(itemCount / columnCount);
    maxHeight = px(maxRows * n(itemHeight));
  }

  let triangleShift = null;
  if (distanceFromEdge) {
    const d = horizontalDeclipping(width, center, distanceFromEdge);
    center = d.center;
    triangleShift = d.triangleShift;
  }

  const offset = getFlyingOffset();

  return {
    center: Unit.sub(center, offset.left),
    top: underside ? Unit.sub(bottomValue, offset.top) : null,
    bottom: underside ? null : Unit.sub(topValue, offset.top),
    maxHeight: maxHeight,
    width: width,
    menuItemWidth: itemWidth,
    triangleShift: triangleShift,
  };
}

// Compute the location for a menu.
function getMenuLocation(triangleSize, x, y) {
  // Compute horizontal position according to component.
  const center = px(x);

  // Puts the menu under the component if it's in the upper half of the window.
  const topValue = Unit.add(px(window.innerHeight - y), triangleSize);
  const bottomValue = Unit.add(px(y), triangleSize);
  const underside = y < window.innerHeight * 0.67;
  const offset = getFlyingOffset();

  return {
    center: Unit.sub(center, offset.left),
    top: underside ? Unit.sub(bottomValue, offset.top) : null,
    bottom: underside ? null : Unit.sub(topValue, offset.top),
  };
}

// Compute the location for a work-dialog.
function getVerticalDialogLocation(node, triangleSize) {
  const rect = node.getBoundingClientRect();

  const left = Unit.add(px(rect.right), triangleSize);
  const center = px((rect.top + rect.bottom) / 2);

  return {
    left: left,
    center: center,
  };
}

// Declipping dialog-modal when it's out of window.
function horizontalDeclipping(width, center, distanceFromEdge) {
  if (width && center && distanceFromEdge) {
    // Computation is impossible if width is undefined.
    const w = Unit.parse(width).value;
    const c = Unit.parse(center).value;
    const p = Unit.parse(distanceFromEdge).value; // does not touch the edge of the window

    // Compute triangleShift if dialog is out of left window border.
    const leftShift = w / 2 + p - c;
    if (leftShift > 0) {
      const newCenter = c + leftShift;
      return {triangleShift: px(leftShift), center: px(newCenter)};
    }

    // Compute triangleShift if dialog is out of right window border.
    const rightShift = c + w / 2 + p - window.innerWidth;
    if (rightShift > 0) {
      const newCenter = c - rightShift;
      return {triangleShift: px(-rightShift), center: px(newCenter)};
    }
  }

  return {triangleShift: px(0), center: center};
}

// Declipping dialog-modal when it's out of window.
function verticalDeclipping(height, center, distanceFromEdge) {
  if (height && center && distanceFromEdge) {
    // Computation is impossible if height is undefined.
    const h = Unit.parse(height).value;
    const c = Unit.parse(center).value;
    const p = Unit.parse(distanceFromEdge).value; // does not touch the edge of the window

    // Compute triangleShift if dialog is out of top window border.
    const topShift = h / 2 + p - c;
    if (topShift > 0) {
      const newCenter = c + topShift;
      return {triangleShift: px(-topShift), center: px(newCenter)};
    }

    // Compute triangleShift if dialog is out of bottom window border.
    const bottomShift = c + h / 2 + p - window.innerHeight;
    if (bottomShift > 0) {
      const newCenter = c - bottomShift;
      return {
        triangleShift: px(bottomShift),
        center: px(newCenter),
      };
    }
  }

  return {triangleShift: px(0), center: center};
}

//-----------------------------------------------------------------------------

module.exports = {
  getComboRightLocation,
  getComboLocation,
  getMenuLocation,
  getVerticalDialogLocation,
  horizontalDeclipping,
  verticalDeclipping,
};
