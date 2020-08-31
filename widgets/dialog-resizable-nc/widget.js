import React from 'react';
import props from './props';
import scenarios from './scenarios';
import {registerWidget} from 'goblin-gadgets/widgets/widget-doc/widget-list';
import Widget from 'goblin-laboratory/widgets/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import T from 't';
import * as styles from './styles';

/******************************************************************************/

export default class DialogResizableNC extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.onMinimize = this.onMinimize.bind(this);
    this.onRestore = this.onRestore.bind(this);
    this.onMaximize = this.onMaximize.bind(this);
    this.onCloseDialog = this.onCloseDialog.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  onCloseDialog() {
    if (this.props.onCloseDialog) {
      this.props.onCloseDialog();
    }
  }

  onMinimize() {
    if (this.props.onMinimize) {
      this.props.onMinimize();
    }
  }

  onRestore() {
    if (this.props.onRestore) {
      this.props.onRestore();
    }
  }

  onMaximize() {
    if (this.props.onMaximize) {
      this.props.onMaximize();
    }
  }

  onMouseDown(e, element) {
    if (this.props.onMouseDown) {
      this.props.onMouseDown(e, element);
    }
  }

  onMouseMove(e) {
    if (this.props.onMouseMove) {
      this.props.onMouseMove(e);
    }
  }

  onMouseUp(e) {
    if (this.props.onMouseUp) {
      this.props.onMouseUp(e);
    }
  }

  /******************************************************************************/

  renderTitleBar() {
    if (!this.props.titleBarText) {
      return null;
    }

    return (
      <div className={this.styles.classNames.titleBar}>
        <div
          className={this.styles.classNames.titleBarLabel}
          onMouseDown={(e) => this.onMouseDown(e, 'title')}
        >
          <Label
            height={this.props.titleBarHeight}
            grow="1"
            text={this.props.titleBarText}
            justify="center"
            cursor="move"
          />
        </div>
        {this.props.onMinimize ? (
          <Button
            glyph="regular/window-minimize"
            border="none"
            tooltip={T('Réduire')}
            onClick={this.onMinimize}
          />
        ) : null}
        {this.props.onRestore ? (
          <Button
            glyph="regular/square"
            border="none"
            tooltip={T('Restaurer')}
            onClick={this.onRestore}
          />
        ) : null}
        {this.props.onMaximize ? (
          <Button
            glyph="regular/window-maximize"
            border="none"
            tooltip={T('Agrandir')}
            onClick={this.onMaximize}
          />
        ) : null}
        {this.props.onCloseDialog ? (
          <Button
            glyph="solid/times"
            border="none"
            tooltip={T('Fermer')}
            onClick={this.onCloseDialog}
          />
        ) : null}
      </div>
    );
  }

  renderBorders() {
    return (
      <React.Fragment>
        <div
          className={this.styles.classNames.borderTopLeft}
          onMouseDown={(e) => this.onMouseDown(e, 'top+left')}
        />
        <div
          className={this.styles.classNames.borderTopRight}
          onMouseDown={(e) => this.onMouseDown(e, 'top+right')}
        />
        <div
          className={this.styles.classNames.borderBottomLeft}
          onMouseDown={(e) => this.onMouseDown(e, 'bottom+left')}
        />
        <div
          className={this.styles.classNames.borderBottomRight}
          onMouseDown={(e) => this.onMouseDown(e, 'bottom+right')}
        />
        <div
          className={`left-hover ${this.styles.classNames.borderLeft}`}
          onMouseDown={(e) => this.onMouseDown(e, 'left')}
        />
        <div
          className={`right-hover ${this.styles.classNames.borderRight}`}
          onMouseDown={(e) => this.onMouseDown(e, 'right')}
        />
        <div
          className={`top-hover ${this.styles.classNames.borderTop}`}
          onMouseDown={(e) => this.onMouseDown(e, 'top')}
        />
        <div
          className={`bottom-hover ${this.styles.classNames.borderBottom}`}
          onMouseDown={(e) => this.onMouseDown(e, 'bottom')}
        />
      </React.Fragment>
    );
  }

  renderDialog() {
    return (
      <div className={this.styles.classNames.dialogResizable}>
        {this.renderTitleBar()}
        {this.renderBorders()}
        <div className={this.styles.classNames.inside}>
          {this.props.children}
        </div>
      </div>
    );
  }

  render() {
    if (this.props.resizing) {
      return (
        <React.Fragment>
          {this.renderDialog()}
          <div
            className={this.styles.classNames.fullscreen}
            onMouseMove={this.onMouseMove}
            onMouseUp={this.onMouseUp}
          />
        </React.Fragment>
      );
    } else {
      return this.renderDialog();
    }
  }
}

/******************************************************************************/

registerWidget(DialogResizableNC, props, scenarios);
