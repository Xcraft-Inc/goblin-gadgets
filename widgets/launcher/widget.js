import React from 'react';
import props from './props';
import scenarios from './scenarios';
import {registerWidget} from 'goblin-gadgets/widgets/widget-doc/widget-list';
import Widget from 'goblin-laboratory/widgets/widget';
import LauncherBlob from 'goblin-gadgets/widgets/launcher-blob/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import Rocket from 'goblin-gadgets/widgets/rocket/widget';
import * as styles from './styles';

/******************************************************************************/

export default class Launcher extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
  }

  /******************************************************************************/

  renderTitle() {
    return (
      <div className={this.styles.classNames.title}>
        <Label
          text={this.props.title}
          grow="1"
          justify="center"
          fontSize="400%"
          fontWeight="bold"
        />
      </div>
    );
  }

  renderRocket(rocket, index) {
    return (
      <Rocket
        key={index}
        size={this.props.rocketSize || '200px'}
        textColor={this.props.rocketTextColor || '#fff'}
        shadow={this.props.rocketShadow || 'none'}
        iconShadow={this.props.rocketIconShadow || 'none'}
        onClick={() => this.props.onLaunchRocket(rocket.id)}
        {...rocket}
      />
    );
  }

  renderRockets() {
    if (!this.props.rockets) {
      return null;
    }

    let index = 0;
    return (
      <div className={this.styles.classNames.rockets}>
        {this.props.rockets.map((rocket) => this.renderRocket(rocket, index++))}
      </div>
    );
  }

  render() {
    return (
      <div className={this.styles.classNames.launcher}>
        <LauncherBlob
          kind={this.props.blobKind}
          color={this.props.blobColor}
          duration="30s"
        />
        {this.renderTitle()}
        {this.renderRockets()}
      </div>
    );
  }
}

/******************************************************************************/

registerWidget(Launcher, props, scenarios);
