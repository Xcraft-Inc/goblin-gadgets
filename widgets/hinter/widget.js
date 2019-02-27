//T:2019-02-27
import T from 't';
import React from 'react';
import Widget from 'laboratory/widget';
const Bool = require('gadgets/helpers/bool-helpers');

import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';
import Button from 'gadgets/button/widget';
import Calendar from 'gadgets/calendar/widget';

/******************************************************************************/

class Hinter extends Widget {
  constructor() {
    super(...arguments);

    this.state = {
      hover: -1,
    };

    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDbClick = this.handleDbClick.bind(this);
  }

  get hover() {
    return this.state.hover;
  }

  set hover(value) {
    this.setState({
      hover: value,
    });
  }

  onMouseOver(index) {
    this.hover = index;
  }

  onMouseOut(index) {
    this.hover = -1;
  }

  handleClick(index, row) {
    if (this.props.onRowClick) {
      this.props.onRowClick(index, row);
    }
  }

  handleDbClick(index, row) {
    if (this.props.onRowDbClick) {
      this.props.onRowDbClick(index, row);
    }
  }

  renderRowButtons(row, index, isActive) {
    const infoClass =
      index === this.hover
        ? this.styles.classNames.infoVisible
        : this.styles.classNames.infoHidden;

    // FIXME: set glyph/tooltip according to work context of hinter !
    const clickGlyph = 'solid/eye';
    const clickTooltip = T('Voir les détails');
    let doubleclickGlyph = 'solid/check';
    let doubleclickTooltip = T('Choisir');
    if (Bool.isTrue(this.props.editOnClick)) {
      doubleclickGlyph = 'solid/pencil';
      doubleclickTooltip = T('Editer');
    }

    return (
      <div className={infoClass}>
        {isActive ? null : (
          <Button
            width="32px"
            glyph={clickGlyph}
            tooltip={clickTooltip + '\n(clic)'}
            onClick={() => this.handleClick(index, row)}
            spacing="overlap"
          />
        )}
        <Button
          width="32px"
          glyph={doubleclickGlyph}
          tooltip={doubleclickTooltip + '\n(double-clic)'}
          onClick={() => this.handleDbClick(index, row)}
        />
      </div>
    );
  }

  renderRow(row, glyph, index) {
    const isActive =
      this.props.selectedIndex && this.props.selectedIndex === `${index}`;

    const boxClass = isActive
      ? this.styles.classNames.boxActive
      : this.styles.classNames.box;

    return (
      <div
        key={index}
        className={boxClass}
        onMouseOver={() => this.onMouseOver(index)}
        onMouseOut={() => this.onMouseOut(index)}
        onClick={() => this.handleClick(index, row)}
        onDoubleClick={() => this.handleDbClick(index, row)}
      >
        {glyph ? <Label glyph={glyph} glyphPosition="center" /> : null}
        <Label
          text={row}
          kind="large-single"
          justify="left"
          grow="1"
          wrap="no"
        />
        {this.renderRowButtons(row, index, isActive)}
      </div>
    );
  }

  renderList() {
    const result = [];
    const rows = this.props.rows.toArray();
    const glyphs = this.props.glyphs ? this.props.glyphs.toArray() : [];
    for (let index = 0; index < rows.length; index++) {
      const row = rows[index];
      const glyph = index < glyphs.length ? glyphs[index] : null;
      result.push(this.renderRow(row, glyph, index));
    }
    return result;
  }

  renderDate() {
    return (
      <div>
        <Calendar visibleDate={this.props.date} date={this.props.date} />
      </div>
    );
  }

  renderContent() {
    switch (this.props.kind) {
      case 'list':
        return this.renderList();
      case 'date':
        return this.renderDate();
      default:
        throw new Error(`Unknow kind ${this.props.kind} into Hinter`);
    }
  }

  renderButtonNew() {
    const titleText = this.props.titleText;
    if (this.props.displayNewButton && this.props.onNew) {
      return (
        <Container kind="actions">
          <Button
            kind="action"
            place="1/1"
            glyph="solid/plus"
            text={
              this.props.newButtonTitle
                ? this.props.newButtonTitle
                : T(`Nouveau ${titleText}`, '', {titleText})
            }
            width="0px"
            grow="1"
            onClick={this.props.onNew}
          />
        </Container>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <Container kind="view" grow="1" maxWidth="500px">
        <Container kind="pane-header-light">
          <Label
            kind="title"
            glyph={this.props.titleGlyph}
            text={this.props.titleText}
          />
        </Container>
        <Container kind="panes">
          <Container kind="pane-top">{this.renderContent()}</Container>
        </Container>
        {this.renderButtonNew()}
      </Container>
    );
  }
}

/******************************************************************************/
export default Hinter;
