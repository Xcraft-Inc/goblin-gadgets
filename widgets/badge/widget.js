import React from 'react';
import Widget from 'laboratory/widget';

/******************************************************************************/

class Badge extends Widget {
  constructor (props) {
    super (props);
  }

  render () {
    const {state} = this.props;
    const disabled = this.props.disabled;
    const inputValue = this.props.value;

    let truncatedValue = inputValue ? inputValue.toString () : '';
    if (truncatedValue.length > 3) {
      truncatedValue = truncatedValue.substring (0, 3) + '...';
    }

    const boxStyle = this.styles.box;
    const labelStyle = this.styles.label;

    return (
      <div key="badge" disabled={disabled} style={boxStyle}>
        <label style={labelStyle}>
          {truncatedValue}
        </label>
      </div>
    );
  }
}

/******************************************************************************/
export default Badge;
