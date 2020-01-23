import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import TextField from 'goblin-gadgets/widgets/text-field/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import DialogModal from 'goblin-gadgets/widgets/dialog-modal/widget';
import * as styles from './styles';
import Shredder from 'xcraft-core-shredder';

let EntityBrowser = class EntityBrowser extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
    this.onClickItem = this.onClickItem.bind(this);
    this.onClickValue = this.onClickValue.bind(this);
    this.handleOnShowDialog = this.handleOnShowDialog.bind(this);
    this.handleOnCloseDialog = this.handleOnCloseDialog.bind(this);
    this.onChangeTextField = this.onChangeTextField.bind(this);
    this.containerRef = null;
    this.buildedPath = '';
    this.TextFieldValue = '';
    this.state = {showDialog: false};
  }

  onClickValue(value) {
    this.TextFieldValue = value;
    if (this.props.onChangePath) {
      this.props.onChangePath(value);
    }
  }

  // Handle browsing into entity
  onClickItem(value) {
    if (value === '<=') {
      // Remove last part of a path
      // ex: "test.hello.a" => "test.hello"
      let position = this.buildedPath.lastIndexOf('.');
      this.buildedPath = this.buildedPath.substr(0, position);
    } else {
      if (this.buildedPath !== '') {
        value = '.' + value;
      }
      const newPath = this.buildedPath + value;
      // Add last part of path, move in if it's not a value (end of a branch)
      if (Shredder.isShredder(this.props.entity.get(newPath))) {
        this.buildedPath = newPath;
        this.TextFieldValue = newPath;
      } else {
        this.onClickValue(newPath);
        this.handleOnCloseDialog();
      }
    }
    this.forceUpdate();
  }

  handleOnShowDialog() {
    this.setState({showDialog: true});
  }

  handleOnCloseDialog() {
    this.setState({showDialog: false});
  }

  onChangeTextField(e) {
    this.buildedPath = e;
  }

  renderTextField() {
    return (
      <TextField
        selectAllOnFocus={false}
        width={'300px'}
        onChange={this.onChangeTextField}
        value={this.TextFieldValue}
        tooltip={this.props.tooltip}
        readonly={true}
      />
    );
  }

  renderButton() {
    // Put folder glyph
    return (
      <Button
        onClick={this.handleOnShowDialog}
        height={'32px'}
        width={'32px'}
      />
    );
  }

  renderDialog() {
    if (!this.state.showDialog || !this.containerRef) {
      return null;
    }
    let size = this.props.entity.get(this.buildedPath).size;
    // Add one for return button
    if (!this.empty) {
      size += 1;
    }
    let itemHeight = this.props.itemHeight || '32px';
    if (itemHeight.endsWith('px')) {
      itemHeight = parseInt(itemHeight.split('px')[0]);
    }

    const windowHeight = window.innerHeight;
    const containerHeight =
      Math.min(size * itemHeight + 80, windowHeight - 20) + 'px';
    const containerWidth = this.props.itemWidth || '300px';
    //TODO : Show Dialog in other direction than right
    let {left, top, width, height} = this.containerRef.getBoundingClientRect();
    const triangleSize = 33;
    // Calculate position X of the element
    left = left + width + triangleSize + 'px';
    // Calculate position Y of the element
    let center = top + height / 2;
    let shiftY = 0;
    // Handle case when container get out of the screen
    if (center - containerHeight / 2 < 10) {
      const offset = containerHeight / 2 - center + 10;
      center += offset;
      shiftY = -offset;
    }
    if (center + containerHeight / 2 > windowHeight - 10) {
      const offset = center + containerHeight / 2 - (windowHeight - 10);
      center -= offset;
      shiftY = offset;
    }
    return (
      <DialogModal
        left={left}
        center={center + 'px'}
        triangleShift={shiftY + 'px'}
        width={containerWidth}
        height={containerHeight}
        close={this.handleOnCloseDialog}
      >
        <div className={this.styles.classNames.overflow}>
          {this.renderItems()}
        </div>
      </DialogModal>
    );
  }

  renderItem(key, value) {
    // TODO : Better display of values...
    if (value) {
      value = value.toString().substr(0, 10);
    }
    return (
      <Button
        key={key}
        onClick={() => {
          this.onClickItem(key);
        }}
        height={this.props.itemHeight || '33px'}
        width={this.props.itemWidth || '300px'}
        glyph="solid/folder"
        text={key + ' => ' + value}
      />
    );
  }

  renderItems() {
    // Boucle foreach key of an element
    const items = [];

    // Add back button if already browsing
    if (!this.empty) {
      items.push(this.renderItem('<=', 'Retour'));
    }

    for (const [key, value] of this.props.entity.get(this.buildedPath)) {
      items.push(this.renderItem(key, value));
    }

    return items;
  }

  render() {
    this.empty = this.buildedPath === '';
    if (!Shredder.isShredder(this.props.entity)) {
      console.error('EntityBrowser require immutable in entry !');
      return null;
    }

    if (!this.props.entityId) {
      console.error('EntityBrowser require an entity Id !');
      return null;
    }
    return (
      <React.Fragment>
        <div
          className={this.styles.classNames.container}
          ref={node => (this.containerRef = node)}
        >
          {this.renderTextField()}
          {this.renderButton()}
        </div>
        {this.renderDialog()}
      </React.Fragment>
    );
  }
};

export default Widget.connect((state, props) => {
  return {
    entity: state.get('backend').get(props.entityId),
  };
})(EntityBrowser);
