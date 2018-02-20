import React from 'react';
import Widget from 'laboratory/widget';

/******************************************************************************/

class Badge extends Widget {
  constructor() {
    super(...arguments);
  }

  render() {
    let truncatedValue = this.props.value ? this.props.value.toString() : '';
    if (truncatedValue.length > 3) {
      truncatedValue = truncatedValue.substring(0, 3) + '...';
    }

    const boxClass = this.styles.classNames.box;
    const labelClass = this.styles.classNames.label;

    return (
      <div key="badge" disabled={this.props.disabled} className={boxClass}>
        <label className={labelClass}>{truncatedValue}</label>
      </div>
    );
  }
}

/******************************************************************************/
export default Badge;
