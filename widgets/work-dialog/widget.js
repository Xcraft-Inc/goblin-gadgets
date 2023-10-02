//T:2019-02-27
import T from 't';
import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import ComboHelpers from 'goblin-gadgets/widgets/helpers/combo-helpers';
import {Unit} from 'goblin-theme';
const px = Unit.toPx;

import DialogModal from 'goblin-gadgets/widgets/dialog-modal/widget';
import Container from 'goblin-gadgets/widgets/container/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import Table from 'goblin-gadgets/widgets/table/widget';
import * as styles from './styles';

/******************************************************************************/

class WorkDialog extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.state = {
      hasSelection: false,
    };

    this.selectedIds = null;

    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
  }

  get hasSelection() {
    return this.state.hasSelection;
  }

  set hasSelection(value) {
    this.setState({
      hasSelection: value,
    });
  }

  onClose() {
    const x = this.props.closeDialog;
    if (x) {
      x();
    }
  }

  onOpen() {
    if (this.hasSelection) {
      const x = this.props.action;
      if (x) {
        x(this.selectedIds);
      }
      this.onClose();
    }
  }

  onSelectionChanged(ids) {
    this.selectedIds = ids;
    this.hasSelection = ids.length > 0;
  }

  get tableData() {
    const data = {
      header: [
        {
          name: 'title',
          width: '200px',
          textAlign: 'start',
        },
        {
          name: 'description',
          width: '300px',
          textAlign: 'start',
        },
      ],
      rows: [],
    };

    for (const item of this.props.data) {
      data.rows.push({
        id: item.id,
        title: item.title,
        description: item.description,
      });
    }

    return data;
  }

  renderMain() {
    const mainClass = this.styles.classNames.main;
    const tableClass = this.styles.classNames.table;
    return (
      <div className={mainClass}>
        <Container kind="row">
          <Label text={T('Activités')} grow="1" kind="title" />
        </Container>
        <div className={tableClass}>
          <Table
            widgetId={this.props.id}
            data={this.tableData}
            frame={true}
            selectionMode="multi"
            onSelectionChanged={(ids) => this.onSelectionChanged(ids)}
          />
        </div>
      </div>
    );
  }

  renderFooter() {
    const footerClass = this.styles.classNames.footer;
    return (
      <div className={footerClass}>
        <Label grow="1" />
        <Button
          glyph="solid/check"
          text={T('Ouvrir')}
          kind="action"
          width="150px"
          place="1/1"
          disabled={!this.hasSelection}
          onClick={this.onOpen}
        />
      </div>
    );
  }

  render() {
    const n = this.props.data.length;
    const dialogHeight = Unit.add(
      px(Math.min(n * 38, 800) + 130), // 38 is approximative height per line
      Unit.multiply(this.context.theme.shapes.floatingPadding, 2)
    );
    const result = ComboHelpers.verticalDeclipping(
      dialogHeight,
      this.props.center,
      this.context.theme.shapes.dialogDistanceFromEdge
    );

    return (
      <DialogModal
        width={this.props.width}
        height={dialogHeight}
        center={result.center}
        triangleShift={result.triangleShift}
        left={this.props.left}
        close={this.onClose}
      >
        {this.renderMain()}
        {this.renderFooter()}
      </DialogModal>
    );
  }
}

/******************************************************************************/
export default WorkDialog;
