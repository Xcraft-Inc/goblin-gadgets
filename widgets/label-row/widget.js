//T:2019-02-27

import React from 'react';
import Props from './props';
import Widget from 'laboratory/widget';
import * as Bool from 'gadgets/helpers/bool-helpers';

import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';

import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';

/******************************************************************************/

export default class LabelRow extends Widget {
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
      return React.Children.map(this.props.children, child =>
        React.cloneElement(child, newProps)
      );
    } else {
      return this.props.children;
    }
  }

  render() {
    if (Bool.isFalse(this.props.show)) {
      return null;
    }

    return (
      <Container
        kind="row-field"
        grow={this.props.grow}
        width={this.props.width}
        height={this.props.height}
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

LabelRow.propTypes = makePropTypes(Props);
LabelRow.defaultProps = makeDefaultProps(Props);
