//T:2019-02-27
import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import * as styles from './styles';

/******************************************************************************/

class Badge extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
  }

  render() {
    let truncatedValue = this.props.value ? this.props.value.toString() : '';
    if (truncatedValue.length > 3) {
      truncatedValue = truncatedValue.substring(0, 3) + '…';
    }

    return (
      <div
        className={this.styles.classNames.box}
        key="badge"
        disabled={this.props.disabled}
      >
        <label className={this.styles.classNames.label}>{truncatedValue}</label>
      </div>
    );
  }
}

/******************************************************************************/
export default Badge;
