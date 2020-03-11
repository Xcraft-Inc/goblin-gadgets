import Widget from 'goblin-laboratory/widgets/widget';
import helpers from './helpers';
import svg from '../helpers/svg-helpers';

/******************************************************************************/

export default class RetroGear extends Widget {
  constructor() {
    super(...arguments);
  }

  render() {
    const elements = helpers.getElements(
      this.props.radius,
      this.props.radius,
      this.props.radius,
      this.props.toothThickness,
      this.props.toothCount,
      this.props.color
    );

    return svg.renderElements(this.styles.classNames.gear, elements);
  }
}

/******************************************************************************/
