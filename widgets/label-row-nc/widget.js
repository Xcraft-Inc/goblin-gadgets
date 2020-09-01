import React from 'react';
import props from './props';
import scenarios from './scenarios';
import {registerWidget} from 'goblin-gadgets/widgets/widget-doc/widget-list';
import Widget from 'goblin-laboratory/widgets/widget';
import Container from 'goblin-gadgets/widgets/container/widget';
import Label from 'goblin-gadgets/widgets/label/widget';

/******************************************************************************/

export default class LabelRowNC extends Widget {
  constructor() {
    super(...arguments);
  }

  renderLabel() {
    // La condition pour ne pas afficher le Label est que la propriété labelWidth
    // soit définie à 0px. Il faut afficher le Label même si labelText/labelGlyph
    // ne sont pas définis !
    if (this.props.labelWidth === '0px') {
      return null;
    }

    return (
      <Label
        kind="label-text-field"
        glyph={this.props.labelGlyph}
        text={this.props.labelText}
        width={this.props.labelWidth || '120px'}
        wrap={this.props.labelWrap || 'no'}
        justify="left"
        disabled={this.props.disabled}
        visibility={this.props.visibility}
      />
    );
  }

  renderChildren() {
    if (
      this.props.disabled !== undefined ||
      this.props.visibility !== undefined
    ) {
      const newProps = {
        disabled: this.props.disabled,
        visibility: this.props.visibility,
      };
      return React.Children.map(this.props.children, (child) =>
        React.cloneElement(child, newProps)
      );
    } else {
      return this.props.children;
    }
  }

  render() {
    if (this.props.show === false) {
      return null;
    }

    return (
      <Container
        kind="row-field"
        grow={this.props.grow}
        width={this.props.width}
        height={this.props.height}
        horizontalSpacing={this.props.horizontalSpacing}
        verticalSpacing={this.props.verticalSpacing}
        verticalJustify={this.props.verticalJustify || 'top'}
        disabled={this.props.disabled}
        visibility={this.props.visibility}
      >
        {this.renderLabel()}
        {this.renderChildren()}
      </Container>
    );
  }
}

/******************************************************************************/

registerWidget(LabelRowNC, props, scenarios, false);
