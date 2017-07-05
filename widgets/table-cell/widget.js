import React from 'react';
import Widget from 'laboratory/widget';

/******************************************************************************/

class TableCell extends Widget {
  constructor (props) {
    super (props);
  }

  onMouseDown () {
    const x = this.props.selectionChanged;
    if (x) {
      x (this.props.rowId);
    }
  }

  render () {
    const styleClass = this.styles.classNames.cell;

    return (
      <div
        key={this.props.index}
        className={styleClass}
        onMouseDown={::this.onMouseDown}
      >
        {this.props.text}
      </div>
    );
  }
}

/******************************************************************************/
export default TableCell;
