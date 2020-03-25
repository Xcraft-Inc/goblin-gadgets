//T:2019-02-27
import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import * as Bool from 'goblin-gadgets/widgets/helpers/bool-helpers';

import Button from 'goblin-gadgets/widgets/button/widget';
import * as styles from './styles';

/******************************************************************************/

export default class FlatCombo extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.onButtonClicked = this.onButtonClicked.bind(this);
  }

  onButtonClicked(name) {
    const x = this.props.selectionChanged;
    if (x) {
      x(name);
    }
  }

  isChecked(name) {
    return name === this.props.value;
  }

  renderItem(item, index) {
    return (
      <Button
        key={index}
        kind="flat-combo"
        readonly={this.props.readonly}
        text={item.description}
        tooltip={item.tooltip}
        horizontalSpacing="overlap"
        focusable={true}
        active={this.isChecked(item.name)}
        onClick={() => this.onButtonClicked(item.name)}
      />
    );
  }

  renderItems() {
    const result = [];
    let index = 0;
    for (const item of this.props.list) {
      result.push(this.renderItem(item, index++));
    }
    return result;
  }

  render() {
    return (
      <div className={this.styles.classNames.box}>{this.renderItems()}</div>
    );
  }
}

/******************************************************************************/
