//T:2019-02-27
import React from 'react';
import Widget from 'laboratory/widget';
import T from 't';
import * as Bool from 'gadgets/helpers/bool-helpers';

import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';
import TextInputNC from 'gadgets/text-input-nc/widget';
import Button from 'gadgets/button/widget';

/******************************************************************************/

export default class HinterFieldNC extends Widget {
  constructor() {
    super(...arguments);
  }

  /******************************************************************************/

  get hasButtonAdd() {
    return !Bool.isTrue(this.props.readonly) && this.props.onAdd;
  }

  renderSearchButtonAdd() {
    if (this.hasButtonAdd) {
      return (
        <Button
          kind="combo"
          shape="right-smooth"
          leftSpacing="overlap"
          glyph="solid/plus"
          tooltip={T('Créer')}
          visibility={this.props.visibility}
          disabled={this.props.disabled}
          onClick={this.props.onAdd}
        />
      );
    } else {
      return null;
    }
  }

  renderSearch() {
    return (
      <Container
        kind="row"
        visibility={this.props.visibility}
        width={this.props.width}
        grow={this.props.grow}
      >
        <TextInputNC
          shape={this.hasButtonAdd ? 'left-smooth' : 'smooth'}
          required="true"
          visibility={this.props.visibility}
          disabled={this.props.disabled}
          readonly={this.props.readonly}
          value={this.props.searchValue}
          hintText={this.props.hintText}
          tooltip={this.props.tooltip}
          grow="1"
          onChange={this.props.onSearchChange}
        />
        {this.renderSearchButtonAdd()}
      </Container>
    );
  }

  /******************************************************************************/

  get hasButtonClear() {
    return !Bool.isTrue(this.props.readonly) && this.props.onClear;
  }

  get hasButtonShow() {
    return !Bool.isTrue(this.props.readonly) && this.props.onShow;
  }

  renderSelectionButtonClear() {
    if (this.hasButtonClear) {
      return (
        <Button
          kind="combo"
          shape={this.hasButtonShow ? null : 'right-smooth'}
          leftSpacing="overlap"
          glyph="solid/eraser"
          tooltip={T('Entrer une nouvelle référence')}
          visibility={this.props.visibility}
          disabled={this.props.disabled}
          onClick={this.props.onClear}
        />
      );
    } else {
      return null;
    }
  }

  renderSelectionButtonShow() {
    if (this.hasButtonShow) {
      return (
        <Button
          kind="combo"
          shape="right-smooth"
          leftSpacing="overlap"
          glyph="solid/eye"
          tooltip={T('Voir les détails')}
          visibility={this.props.visibility}
          disabled={this.props.disabled}
          onClick={this.props.onShow}
        />
      );
    } else {
      return null;
    }
  }

  renderSelection() {
    return (
      <Container
        kind="row"
        visibility={this.props.visibility}
        width={this.props.width}
        grow={this.props.grow}
      >
        <Label
          kind="markdown"
          shape={
            this.hasButtonClear || this.hasButtonShow ? 'left-smooth' : 'smooth'
          }
          visibility={this.props.visibility}
          glyph={this.props.glyph}
          glyphColor={this.props.glyphColor}
          text={this.props.selectedValue}
          tooltip={this.props.tooltip}
          wrap={this.props.wrap}
          grow="1"
        />
        {this.renderSelectionButtonClear()}
        {this.renderSelectionButtonShow()}
      </Container>
    );
  }

  /******************************************************************************/

  render() {
    if (Bool.isFalse(this.props.show)) {
      return null;
    }

    if (this.props.searchValue !== undefined) {
      return this.renderSearch();
    } else if (this.props.selectedValue !== undefined) {
      return this.renderSelection();
    } else {
      return null;
    }
  }
}

/******************************************************************************/
