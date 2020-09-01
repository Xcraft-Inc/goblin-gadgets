import React from 'react';
import props from './props';
import {registerWidget} from 'goblin-gadgets/widgets/widget-doc/widget-list';
import Widget from 'goblin-laboratory/widgets/widget';
import * as styles from './styles';

/******************************************************************************/

export default class Separator extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
  }

  render() {
    return (
      <div
        className={this.styles.classNames.box}
        disabled={this.props.disabled}
      />
    );
  }
}

/******************************************************************************/

registerWidget(Separator, props, null, false);
