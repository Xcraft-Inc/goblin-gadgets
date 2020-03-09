import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import helpers from './helpers';

/******************************************************************************/

export default class RetroGear extends Widget {
  constructor() {
    super(...arguments);
  }

  renderElements() {
    const elements = helpers.getElements(
      this.props.radius,
      this.props.radius,
      this.props.radius,
      this.props.toothThickness,
      this.props.toothCount,
      this.props.color
    );

    const result = [];
    for (const item of elements) {
      result.push(React.createElement(item.element, item.props));
    }

    return result;
  }

  render() {
    return (
      <svg className={this.styles.classNames.gear}>{this.renderElements()}</svg>
    );
  }
}

/******************************************************************************/
