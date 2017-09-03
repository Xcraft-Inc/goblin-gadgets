import React from 'react';
import Widget from 'laboratory/widget';
import * as GlyphHelpers from '../helpers/glyph-helpers.js';
import * as ComboHelpers from '../helpers/combo-helpers.js';
import * as Bool from '../helpers/boolean-helpers.js';
import {ColorHelpers} from 'electrum-theme';
import {Unit} from 'electrum-theme';

import DialogModal from 'gadgets/dialog-modal/widget';
import Container from 'gadgets/container/widget';
import Button from 'gadgets/button/widget';
import Label from 'gadgets/label/widget';
import Table from 'gadgets/table/widget';
import LabelTextField from 'gadgets/label-text-field/widget';

/******************************************************************************/

class WorkMenu extends Widget {
  constructor () {
    super (...arguments);

    this.state = {
      hasSelection: false,
    };
  }

  get hasSelection () {
    return this.state.hasSelection;
  }

  set hasSelection (value) {
    this.setState ({
      hasSelection: value,
    });
  }

  onClose () {
    const x = this.props.closeDialog;
    if (x) {
      x ();
    }
  }

  onSelectionChanged (ids) {
    this.hasSelection = ids.length > 0;
  }

  renderMain () {
    const mainClass = this.styles.classNames.main;
    const tableClass = this.styles.classNames.table;
    return (
      <div className={mainClass}>
        <Container kind="row">
          <Label text="Activités" grow="1" kind="title" />
        </Container>
        <div className={tableClass}>
          <Table
            data={this.props.data}
            frame="true"
            selectionMode="multi"
            onSelectionChanged={ids => ::this.onSelectionChanged (ids)}
          />
        </div>
      </div>
    );
  }

  renderFooter () {
    const footerClass = this.styles.classNames.footer;
    return (
      <div className={footerClass}>
        <Label grow="1" />
        <Button
          glyph="check"
          text="Ouvrir"
          kind="action"
          width="150px"
          place="1/1"
          disabled={!this.hasSelection}
          onClick={::this.onClose}
        />
      </div>
    );
  }

  render () {
    const n = Object.keys (this.props.data.rows).length;
    const h = Math.min (n * 38, 800) + 210; // 38 is approximative height per line
    const menuHeight = h + 'px';
    const result = ComboHelpers.verticalDeclipping (
      menuHeight,
      this.props.center,
      this.context.theme.shapes.floatingPadding,
      this.context.theme.shapes.dialogDistanceFromEdge
    );

    return (
      <DialogModal
        width={this.props.width}
        height={menuHeight}
        center={result.center}
        triangleShift={result.triangleShift}
        left={this.props.left}
        close={::this.onClose}
      >
        {this.renderMain ()}
        {this.renderFooter ()}
      </DialogModal>
    );
  }
}

/******************************************************************************/
export default WorkMenu;
