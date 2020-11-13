import React from 'react';
import props from './props';
import scenarios from './scenarios';
import {registerWidget} from 'goblin-gadgets/widgets/widget-doc/widget-list';
import Widget from 'goblin-laboratory/widgets/widget';
import * as styles from './styles';

/******************************************************************************/

export default class LauncherBlob extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
  }

  renderWave() {
    return (
      <div className={this.styles.classNames.launcherWave}>
        <svg viewBox="0 -10 297 210">
          <path d="m0 210v-210c11.967 4.6933 17.656-2.6807 26.401-3.4144 17.858-1.4982 15.87 6.3329 26.016 6.8302 5.5989 0.27446 12.175-6.0911 17.735-5.6633 8.4981 0.65378 13.814 6.8138 22.378 6.4341 12.034-0.53358 19.69-9.5641 31.682-8.8311 9.8009 0.59908 8.3159 10.576 17.852 11.859 7.1212 0.95798 9.5798-6.566 16.847-7.191 11.94-1.027 24.46 4.5648 35.956 2.6493 12.783-2.1297 9.6811-8.5442 23.133-8.2003 10.218 0.26123 6.5631 7.7036 16.344 9.2095 12.961 1.9956 24.451-6.793 37.968-7.3172 5.8495-0.22685 8.0543 6.6039 13.814 7.1631 3.9539 0.38389 5.0908-4.6654 10.874-3.5279v210z" />
        </svg>
      </div>
    );
  }

  // See https://css-tricks.com/blobs/
  renderBlob() {
    return (
      <div className={this.styles.classNames.launcherBlob}>
        <svg viewBox="0 0 310 350">
          <path d="m156.4 339.5c31.8-2.5 59.4-26.8 80.2-48.5 28.3-29.5 40.5-47 56.1-85.1 14-34.3 20.7-75.6 2.3-111-18.1-34.8-55.7-58-90.4-72.3-11.7-4.8-24.1-8.8-45.05-13.2s-49.85-4.6-75.65 4.4c-38.8 13.6-64 48.8-66.8 90.3-3 43.9 17.8 88.3 33.7 128.8 5.3 13.5 10.4 27.1 14.9 40.9 11.8 36.1 45.3 69.2 90.7 65.7z" />
        </svg>
      </div>
    );
  }

  render() {
    if (this.props.kind === 'wave') {
      return this.renderWave();
    } else if (this.props.kind === 'blob') {
      return this.renderBlob();
    } else {
      return null;
    }
  }
}

/******************************************************************************/

registerWidget(LauncherBlob, props, scenarios);
