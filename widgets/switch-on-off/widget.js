import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import props from './props';
import scenarios from './scenarios';
import {registerWidget} from 'goblin-gadgets/widgets/widget-doc/widget-list';

/******************************************************************************/

export default class SwitchOnOff extends Widget {
  constructor() {
    super(...arguments);
    this.onChange = this.onChange.bind(this);
  }

  /******************************************************************************/

  render() {
    return (
      <div
        className={this.styles.classNames.switchOnOff}
        onClick={this.props.onClick}
      >
        <div className={this.styles.classNames.spike} />
      </div>
    );
  }
}

/******************************************************************************/

registerWidget(SwitchOnOff, props, scenarios);
