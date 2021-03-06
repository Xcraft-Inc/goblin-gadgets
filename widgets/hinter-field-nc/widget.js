//T:2019-02-27
import React from 'react';
import props from './props';
import scenarios from './scenarios';
import {registerWidget} from 'goblin-gadgets/widgets/widget-doc/widget-list';
import Widget from 'goblin-laboratory/widgets/widget';
import T from 't';

import Container from 'goblin-gadgets/widgets/container/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import TextFieldNC from 'goblin-gadgets/widgets/text-field-nc/widget';
import Button from 'goblin-gadgets/widgets/button/widget';

/******************************************************************************/

export default class HinterFieldNC extends Widget {
  constructor() {
    super(...arguments);
    this.add = this.add.bind(this);
  }

  get hasButtonAdd() {
    return !this.props.readonly && this.props.enableAdd;
  }

  add() {
    this.props.onAdd(this.props.searchValue);
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
          onClick={this.add}
        />
      );
    } else {
      return null;
    }
  }

  renderSearch() {
    const required =
      this.props.required !== undefined ? this.props.required : true;
    return (
      <>
        <TextFieldNC
          shape={this.enableAdd ? 'left-smooth' : 'smooth'}
          autoFocus={this.props.autoFocus}
          required={required}
          visibility={this.props.visibility}
          disabled={this.props.disabled}
          readonly={this.props.readonly}
          value={
            this.props.searchValue === undefined ? '' : this.props.searchValue
          }
          hintText={this.props.hintText}
          tooltip={this.props.tooltip}
          grow="1"
          onChange={this.props.onSearchChange}
          onFocus={this.props.onSearchFocus}
          onBlur={this.props.onSearchBlur}
          changeMode="immediate"
        />
        {this.renderSearchButtonAdd()}
      </>
    );
  }

  /******************************************************************************/

  get hasButtonClear() {
    return !this.props.readonly && this.props.onClear;
  }

  get hasButtonShow() {
    return !this.props.readonly && this.props.onShow;
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
      <>
        <Label
          kind="combo-text-markdown"
          shape={
            this.hasButtonClear || this.hasButtonShow ? 'left-smooth' : 'smooth'
          }
          visibility={this.props.visibility}
          glyph={this.props.selectedGlyph}
          glyphColor={this.props.selectedGlyphColor}
          text={this.props.selectedValue}
          tooltip={this.props.tooltip}
          wrap={this.props.wrap}
          grow="1"
        />
        {this.renderSelectionButtonClear()}
        {this.renderSelectionButtonShow()}
      </>
    );
  }

  /******************************************************************************/

  renderContent() {
    if (
      this.props.selectedValue === undefined ||
      this.props.selectedValue === null
    ) {
      return this.renderSearch();
    } else {
      return this.renderSelection();
    }
  }

  render() {
    if (this.props.show === false) {
      return null;
    }

    const width = this.props.width;
    let grow = this.props.grow;
    if (width && grow) {
      console.warn(
        `HinterField: Conflicting definitions for width=${width} and grow=${grow} (only one is useful).`
      );
    } else if (!width && !grow) {
      grow = '1';
    }

    return (
      <Container
        kind="row"
        visibility={this.props.visibility}
        width={width}
        grow={grow}
        addClassName="hinter-container"
      >
        {this.renderContent()}
      </Container>
    );
  }
}

/******************************************************************************/

registerWidget(HinterFieldNC, props, scenarios);
