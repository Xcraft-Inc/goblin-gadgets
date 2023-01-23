import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import props from './props';
import scenarios from './scenarios';
import * as styles from './styles';
import {registerWidget} from 'goblin-gadgets/widgets/widget-doc/widget-list';

/******************************************************************************/

export default class SwitchOnOff extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
  }

  /******************************************************************************/

  renderText() {
    return (
      <div className={this.styles.classNames.text}>
        {this.props.checked ? 'ON' : 'OFF'}
      </div>
    );
  }

  render() {
    return (
      <div
        className={this.styles.classNames.switchOnOff}
        onClick={this.props.onClick}
      >
        {this.renderText()}
        <div className={this.styles.classNames.spike} />
      </div>
    );
  }
}

/******************************************************************************/

registerWidget(SwitchOnOff, props, scenarios);
