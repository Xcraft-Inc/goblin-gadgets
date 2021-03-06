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
    if (
      !this.props.force &&
      !this.context.theme.look.accessories.includes('gears')
    ) {
      return null;
    }

    let type = this.props.type;
    if (!type && this.context.theme.look.homeGadget === 'clock-gears') {
      type = 'watch-gear';
    }

    const elements = helpers.getElements(
      this.props.radius,
      this.props.radius,
      this.props.radius,
      type,
      this.props.toothThickness,
      this.props.toothCount,
      this.props.color
    );

    if (this.props.shadow === 'no') {
      return svg.renderElements(this.styles.classNames.gear, elements);
    } else {
      return (
        <>
          <div className={this.styles.classNames.shadow1} />
          <div className={this.styles.classNames.shadow2} />
          {svg.renderElements(this.styles.classNames.gear, elements)}
          <div className={this.styles.classNames.shadow3} />
        </>
      );
    }
  }
}

/******************************************************************************/
