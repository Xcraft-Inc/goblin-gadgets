import React from 'react';
import Widget from 'laboratory/widget';

/******************************************************************************/

class Badge extends Widget {
  constructor () {
    super (...arguments);
  }

  render () {
    const disabled = this.props.disabled;
    const inputValue = this.props.value;

    let truncatedValue = inputValue ? inputValue.toString () : '';
    if (truncatedValue.length > 3) {
      truncatedValue = truncatedValue.substring (0, 3) + '...';
    }

    const boxClass = this.styles.classNames.box;
    const labelClass = this.styles.classNames.label;

    return (
      <div key="badge" disabled={disabled} className={boxClass}>
        <label className={labelClass}>
          {truncatedValue}
        </label>
      </div>
    );
  }
}

/******************************************************************************/
export default Badge;
