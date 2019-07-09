import React from 'react';
import Widget from 'laboratory/widget';
import Button from 'gadgets/button/widget';
import Separator from 'gadgets/separator/widget';

/******************************************************************************/

export default class FlatList extends Widget {
  constructor() {
    super(...arguments);
    this.onClickedItem = this.onClickedItem.bind(this);
    this.renderItem = this.renderItem.bind(this);

    this.onEscKey = this.onEscKey.bind(this);
    this.onUpKey = this.onUpKey.bind(this);
    this.onDownKey = this.onDownKey.bind(this);
    this.onEnterKey = this.onEnterKey.bind(this);

    this.state = {
      activeIndex: -1,
    };

    this.previousProps = {};

    this.containerStyle = {};

    this.itemsRef = [];
  }

  componentWillMount() {
    window.document.combo = 'visible';
    this.props.list.map((item, index) => {
      if (item.id === this.props.selectedId) {
        this.setState({
          activeIndex: index,
        });
      }
    });
  }

  componentWillUnmount() {
    window.document.combo = 'hidden';
  }

  onDownKey() {
    let index = this.state.activeIndex;
    while (index < this.props.list.length - 1) {
      index++;
      if (!this.props.list[index].separator) {
        break;
      }
    }
    this.setState({
      activeIndex: index,
    });
  }

  onUpKey() {
    let index = this.state.activeIndex;
    if (index === -1) {
      index = this.props.list.length;
    }
    while (index > 0) {
      index--;
      if (!this.props.list[index].separator) {
        break;
      }
    }
    this.setState({
      activeIndex: index,
    });
  }

  onEnterKey() {
    const index = this.state.activeIndex;
    if (index !== -1) {
      const item = this.props.list[index];
      this.onClickedItem(item);
    }
  }

  onEscKey() {
    if (this.props.onEscKey) {
      this.props.onEscKey();
    } else {
      throw Error('Prop onEscKey not defined in flat-list !');
    }
  }

  onClickedItem(item) {
    if (item.action) {
      item.action(item);
    }
    if (this.props.onChange) {
      this.props.onChange(item);
    }
  }

  calculateSize() {
    const itemCount = this.props.list.length;
    let itemHeight = this.context.theme.shapes.menuButtonHeight;
    // Props maxHeight and itemWidth come from combo-container
    let maxHeight = this.props.maxHeight - 25; // -20px padding and -5px from top or bottom
    let itemWidth = this.props.itemWidth;
    if (
      this.previousProps.itemCount !== itemCount ||
      this.previousProps.itemHeight !== itemHeight ||
      this.previousProps.maxHeight !== maxHeight
    ) {
      this.previousProps.itemCount = itemCount;
      this.previousProps.itemHeight = itemHeight;
      this.previousProps.maxHeight = maxHeight;
      this.containerStyle = {};
      if (itemCount && itemHeight && maxHeight) {
        // -20 px to remove padding
        itemWidth = itemWidth ? itemWidth - 20 : 240;
        itemHeight = itemHeight
          ? parseInt(itemHeight.substring(0, itemHeight.length - 2))
          : 48;
        let maxRows = Math.floor(maxHeight / itemHeight);
        const columnCount = Math.max(Math.ceil(itemCount / maxRows), 1);
        this.containerStyle.width = itemWidth * columnCount + 'px';
        maxRows = Math.ceil(itemCount / columnCount);
        this.containerStyle.height = maxRows * itemHeight + 'px';
      }
    }
  }

  renderItem(item, index, isActive) {
    if (item.separator) {
      return <Separator key={index} kind="menu-separator" />;
    }
    let kind = 'combo-wrap-item';
    if (this.props.menuType !== 'wrap') {
      item.glyph = isActive ? 'solid/check' : 'solid/none';
      kind = this.props.menuType === 'menu' ? 'menu-item' : 'combo-item';
    }
    return (
      <Button
        key={index}
        kind={kind}
        text={item.text}
        glyph={item.glyph}
        glyphColor={item.color}
        width={this.props.menuItemWidth}
        active={isActive}
        onClick={() => this.onClickedItem(item)}
      />
    );
  }

  // Custom renderItem should implement item, index and isActive to work with flat-list
  renderItems() {
    const renderItem = this.props.renderItem || this.renderItem;
    return this.props.list.map((item, index) => {
      const isActive = index === this.state.activeIndex;
      return renderItem(item, index, isActive);
    });
  }

  render() {
    this.calculateSize();
    return (
      <div
        style={{...this.containerStyle}}
        className={this.styles.classNames.box}
      >
        {this.renderItems()}
      </div>
    );
  }
}

/******************************************************************************/
