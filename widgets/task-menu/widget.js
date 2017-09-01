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

class TaskMenu extends Widget {
  constructor () {
    super (...arguments);
  }

  onClose () {
    const x = this.props.closeDialog;
    if (x) {
      x ();
    }
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
          <Table data={this.props.data} frame="true" enableSelection="true" />
        </div>
      </div>
    );
  }

  render () {
    const footerClass = this.styles.classNames.footer;

    return (
      <DialogModal
        width={this.props.width}
        height="400px"
        center={this.props.center}
        left={this.props.left}
        close={::this.onClose}
      >
        {this.renderMain ()}
        <div className={footerClass}>
          <Label grow="1" />
          <Button
            glyph="check"
            text="Ouvrir"
            kind="action"
            width="150px"
            place="1/1"
            onClick={::this.onClose}
          />
        </div>
      </DialogModal>
    );
  }
}

/******************************************************************************/
export default TaskMenu;
