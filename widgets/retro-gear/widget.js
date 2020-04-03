import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import helpers from './helpers';
import svg from '../helpers/svg-helpers';

/******************************************************************************/

export default class RetroGear extends Widget {
  constructor() {
    super(...arguments);
  }

  render() {
    if (!this.context.theme.look.accessories.includes('gears')) {
      return null;
    }

    const elements = helpers.getElements(
      this.props.radius,
      this.props.radius,
      this.props.radius,
      this.props.toothThickness,
      this.props.toothCount,
      this.props.color
    );

    if (this.props.shadow === 'no') {
      return svg.renderElements(this.styles.classNames.gear, elements);
    } else {
      return (
        <React.Fragment>
          <div className={this.styles.classNames.shadow1} />
          <div className={this.styles.classNames.shadow2} />
          {svg.renderElements(this.styles.classNames.gear, elements)}
          <div className={this.styles.classNames.shadow3} />
        </React.Fragment>
      );
    }
  }
}

/******************************************************************************/
