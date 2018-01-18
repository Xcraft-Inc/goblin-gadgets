import React from 'react';
import Widget from 'laboratory/widget';

/******************************************************************************/

class TableCell extends Widget {
  constructor () {
    super (...arguments);

    this.onMouseDown = this.onMouseDown.bind (this);
  }

  onMouseDown () {
    const x = this.props.selectionChanged;
    if (x) {
      x (this.props.rowId);
    }
  }

  render () {
    let text = null;
    if (!this.props.text || typeof this.props.text === 'string') {
      text = this.props.text;
    } else {
      text = this.props.text.get ('text');
    }

    const styleClass = this.styles.classNames.cell;

    return (
      <div
        key={this.props.index}
        className={styleClass}
        onMouseDown={this.onMouseDown}
      >
        {text}
      </div>
    );
  }
}

/******************************************************************************/
export default TableCell;
