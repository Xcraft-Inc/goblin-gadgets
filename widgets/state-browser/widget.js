import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import TextField from 'goblin-gadgets/widgets/text-field/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import DialogModal from 'goblin-gadgets/widgets/dialog-modal/widget';
import * as styles from './styles';
import Shredder from 'xcraft-core-shredder';
import withC from 'goblin-laboratory/widgets/connect-helpers/with-c';

// Remove last part of a path
// ex: "test.hello.a" => "test.hello"
function removeLastKey(path) {
  let position = path.lastIndexOf('.');
  if (position === -1) {
    return '';
  }
  path = path.substr(0, position);
  return path;
}

let StateBrowser = class StateBrowser extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
    this.onClickItem = this.onClickItem.bind(this);
    this.onClickValue = this.onClickValue.bind(this);
    this.handleOnShowDialog = this.handleOnShowDialog.bind(this);
    this.handleOnCloseDialog = this.handleOnCloseDialog.bind(this);
    this.containerRef = null;
    this.state = {
      showDialog: false,
      buildedPath: removeLastKey(this.props.value),
    };
    let {itemHeight, itemWidth} = this.props;
    if (itemWidth) {
      itemWidth = parseInt(itemWidth.split('px')[0]);
    }
    if (itemHeight) {
      itemHeight = parseInt(itemHeight.split('px')[0]);
    }
    // initialize with props or default value
    this.item = {width: itemWidth || 300, height: itemHeight || 35};
  }

  onClickValue(value) {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  // Handle browsing into entity
  onClickItem(value) {
    if (value === '<=') {
      this.setState({buildedPath: removeLastKey(this.state.buildedPath)});
    } else {
      if (this.state.buildedPath !== '') {
        value = '.' + value;
      }
      const newPath = this.state.buildedPath + value;
      // Add last part of path, move in if it's not a value (end of a branch)
      if (Shredder.isShredder(this.props.state.get(newPath))) {
        this.setState({buildedPath: newPath});
      } else {
        this.onClickValue(newPath);
        this.handleOnCloseDialog();
      }
    }
  }

  handleOnShowDialog() {
    this.setState({
      showDialog: true,
      buildedPath: removeLastKey(this.props.value),
    });
  }

  handleOnCloseDialog() {
    this.setState({showDialog: false});
  }

  renderTextField() {
    return (
      <TextField
        selectAllOnFocus={false}
        grow="1"
        value={this.props.value}
        tooltip={this.props.tooltip}
        readonly={true}
      />
    );
  }

  renderButton() {
    if (this.props.readonly) {
      return null;
    }
    return (
      <Button
        onClick={this.handleOnShowDialog}
        height={'33px'}
        width={'33px'}
        glyph="solid/folder"
      />
    );
  }

  renderDialog() {
    this.empty = this.state.buildedPath === '';
    if (!this.state.showDialog || !this.containerRef) {
      return null;
    }
    let size = this.props.state.get(this.state.buildedPath).size;
    // Add one for return button
    if (!this.empty) {
      size += 1;
    }

    const windowHeight = window.innerHeight;
    const containerHeight = Math.min(
      size * this.item.height + 80,
      windowHeight - 20
    );
    const containerWidth = this.item.width;
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
        width={containerWidth + 'px'}
        height={containerHeight + 'px'}
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
    // TODO : Implement mode to edit values
    return (
      <Button
        key={key}
        onClick={() => {
          this.onClickItem(key);
        }}
        height={this.item.height - 2 + 'px'}
        width={this.item.width + 'px'}
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

    // TODO : Implement blacklist to hide keys we don't want to show
    for (const [key, value] of this.props.state.get(this.state.buildedPath)) {
      items.push(this.renderItem(key, value));
    }

    return items;
  }

  render() {
    if (!Shredder.isShredder(this.props.state)) {
      console.error('StateBrowser require immutable in entry !');
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

export default withC(StateBrowser, {value: 'onChange'});

// export default Widget.connect((state, props) => {
//   return {
//     state: state.get(props.path),
//   };
// })(StateBrowser);
