import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import TextField from 'goblin-gadgets/widgets/text-field/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import StateBrowserDialog from 'goblin-gadgets/widgets/state-browser-dialog/widget';
import * as styles from './styles';
import Shredder from 'xcraft-core-shredder';
import withC from 'goblin-laboratory/widgets/connect-helpers/with-c';
import T from 't';
import {Unit} from 'goblin-theme';
const n = Unit.toValue;

/******************************************************************************/

let StateBrowser = class StateBrowser extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.handleShowDialog = this.handleShowDialog.bind(this);
    this.handleAcceptDialog = this.handleAcceptDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);

    this.containerRef = null;

    this.state = {
      showDialog: false,
    };

    // Initialize with props or default value.
    let {itemHeight, itemWidth} = this.props;
    if (itemWidth) {
      itemWidth = n(itemWidth);
    }
    if (itemHeight) {
      itemHeight = n(itemHeight);
    }
    this.item = {width: itemWidth || 300, height: itemHeight || 32};
  }

  handleShowDialog() {
    this.setState({
      showDialog: true,
    });
  }

  handleAcceptDialog(value) {
    this.setState({showDialog: false});

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  handleCloseDialog() {
    this.setState({showDialog: false});
  }

  /******************************************************************************/

  renderDialog() {
    if (!this.state.showDialog || !this.containerRef) {
      return null;
    }

    const rect = this.containerRef.getBoundingClientRect();

    return (
      <StateBrowserDialog
        parentButtonRect={rect}
        title={T('Choix du champ à afficher dans la colonne')}
        value={this.props.value}
        // filter={['markdown']}
        state={this.props.state}
        acceptGlyph="solid/check"
        acceptText={T('Choisir')}
        onAccept={this.handleAcceptDialog}
        onClose={this.handleCloseDialog}
      />
    );
  }

  renderTextField() {
    return (
      <TextField
        grow="1"
        selectAllOnFocus={false}
        readonly={true}
        value={this.props.value}
        tooltip={this.props.tooltip}
        horizontalSpacing="overlap"
      />
    );
  }

  renderButton() {
    if (this.props.readonly) {
      return null;
    }

    return (
      <Button
        kind="combo"
        vpos="top"
        shape="right-smooth"
        glyph="solid/chevron-right"
        onClick={this.handleShowDialog}
      />
    );
  }

  render() {
    if (!Shredder.isShredder(this.props.state)) {
      console.error('StateBrowser: Require immutable in entry!');
      return null;
    }

    return (
      <>
        <div
          className={this.styles.classNames.container}
          ref={(node) => (this.containerRef = node)}
        >
          {this.renderTextField()}
          {this.renderButton()}
        </div>
        {this.renderDialog()}
      </>
    );
  }
};

/******************************************************************************/

export default withC(StateBrowser, {value: 'onChange'});
