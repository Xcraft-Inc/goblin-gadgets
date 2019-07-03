//T:2019-02-27
import React from 'react';
import Props from './props';
import Widget from 'goblin-laboratory/widgets/widget';
import T from 't';
import * as Bool from 'goblin-gadgets/widgets/helpers/bool-helpers';
import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';

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
    return !Bool.isTrue(this.props.readonly) && this.props.enableAdd;
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
    return (
      <React.Fragment>
        <TextFieldNC
          shape={this.enableAdd ? 'left-smooth' : 'smooth'}
          autoFocus={this.props.autoFocus}
          required={this.props.required}
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
      </React.Fragment>
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
      <React.Fragment>
        <Label
          kind="markdown"
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
      </React.Fragment>
    );
  }

  /******************************************************************************/

  renderContent() {
    if (this.props.selectedValue !== undefined) {
      return this.renderSelection();
    } else {
      return this.renderSearch();
    }
  }

  render() {
    if (Bool.isFalse(this.props.show)) {
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

HinterFieldNC.propTypes = makePropTypes(Props);
HinterFieldNC.defaultProps = makeDefaultProps(Props);
