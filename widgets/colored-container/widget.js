import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import props from './props';
import scenarios from './scenarios';
import {registerWidget} from 'goblin-gadgets/widgets/widget-doc/widget-list';
import * as styles from './styles';

/******************************************************************************/

export default class ColorerContainer extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
  }

  render() {
    return (
      <div className={this.styles.classNames.colorerContainer}>
        {this.props.children}
      </div>
    );
  }
}

/******************************************************************************/

registerWidget(ColorerContainer, props, scenarios);
