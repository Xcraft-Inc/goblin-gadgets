import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import helpers from './helpers';

/******************************************************************************/

export default class RetroGear extends Widget {
  constructor() {
    super(...arguments);
  }

  renderPath(path, style) {
    return (
      <svg className={this.styles.classNames[style]}>
        <path
          d={path(
            this.props.radius,
            this.props.radius,
            this.props.radius,
            this.props.toothCount,
            this.props.toothThickness
          )}
        />
      </svg>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.renderPath(helpers.getGearDarkPath, 'gearDark')}
        {this.renderPath(helpers.getGearLightPath, 'gearLight')}
      </React.Fragment>
    );
  }
}

/******************************************************************************/
