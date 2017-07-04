import React from 'react';
import Widget from 'laboratory/widget';

/******************************************************************************/
class TableRow extends Widget {
  constructor (props) {
    super (props);
    this.state = {
      hover: false,
    };
  }

  get hover () {
    return this.state.hover;
  }

  set hover (value) {
    this.setState ({
      hover: value,
    });
  }

  /******************************************************************************/

  onMouseOver () {
    this.hover = true;
  }

  onMouseOut () {
    this.hover = false;
  }

  onMouseDown () {
    const x = this.props.selectionChanged;
    if (x) {
      const row = this.props.row;
      x (row.id);
    }
  }

  /******************************************************************************/

  renderRowColumn (description, column, last, index) {
    const styleClass = this.styles.classNames.cell;
    const style = Object.assign ({}, this.styles.props.cell);

    if (column.Width) {
      style.minWidth = column.Width;
      style.maxWidth = column.Width;
    } else if (column.Grow) {
      style.flexGrow = column.Grow;
      style.flexShrink = '0';
      style.flexBasis = '0%';
      style.minWidth = '0px';
      style.overflow = 'hidden';
    }
    style.textAlign = column.TextAlign;

    if (!last) {
      style.marginRight = this.context.theme.shapes.tablePadding;
    }

    return (
      <div
        key={index}
        className={styleClass}
        style={style}
        onMouseOver={::this.onMouseOver}
        onMouseOut={::this.onMouseOut}
        onMouseDown={::this.onMouseDown}
      >
        {description}
      </div>
    );
  }

  renderRowColumns (header, row) {
    const result = [];
    let index = 0;
    for (var column of header) {
      const description = row[column.Name];
      const last = index === header.length - 1;
      result.push (this.renderRowColumn (description, column, last, index++));
    }
    return result;
  }

  render () {
    const header = this.props.header;
    const row = this.props.row;
    const index = this.props.index;
    const selected = this.props.selected;

    var styleName = selected === 'true'
      ? 'rowSelected'
      : this.hover ? 'rowHover' : 'row';
    const rowStyleClass = this.styles.classNames[styleName];

    return (
      <div key={index} className={rowStyleClass}>
        {this.renderRowColumns (header, row)}
      </div>
    );
  }
}

/******************************************************************************/
export default TableRow;
