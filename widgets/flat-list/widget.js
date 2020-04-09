import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import Separator from 'goblin-gadgets/widgets/separator/widget';
import {Unit} from 'electrum-theme';
import * as styles from './styles';

/******************************************************************************/

export default class FlatList extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.onClickedItem = this.onClickedItem.bind(this);
    this.renderItem = this.renderItem.bind(this);

    this.onEscKey = this.onEscKey.bind(this);
    this.onUpKey = this.onUpKey.bind(this);
    this.onDownKey = this.onDownKey.bind(this);
    this.onEnterKey = this.onEnterKey.bind(this);

    const activeIndex = this.props.list.findIndex(
      (item) => item.id === this.props.selectedId
    );

    this.state = {
      activeIndex: activeIndex, // -1 is not selected
      initialized: false,
    };

    this.itemHeight = null;
    this.itemWidth = null;

    this.menuItemWidth =
      Unit.parse(this.props.menuItemWidth || this.props.containerWidth).value -
      Unit.parse(this.context.theme.shapes.menuPadding).value * 2 +
      'px';

    this.previousProps = {};

    this.containerStyle = {};
    this.setItemRef = this.setItemRef.bind(this);
  }

  componentDidMount() {
    window.document.combo = 'visible';
  }

  componentWillUnmount() {
    window.document.combo = 'hidden';
  }

  setItemRef(node) {
    if (node) {
      const menuItemWidth = Unit.parse(this.menuItemWidth).value;
      this.itemWidth = menuItemWidth - (node.offsetWidth - menuItemWidth);
      const menuItemHeight = Unit.parse(
        this.context.theme.shapes.menuButtonHeight
      ).value;
      this.itemHeight = menuItemHeight - (node.offsetHeight - menuItemHeight);
      this.setState({initialized: true});
    }
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
    let itemHeight = Unit.parse(this.context.theme.shapes.menuButtonHeight)
      .value;

    let itemWidth = Unit.parse(this.menuItemWidth).value;
    let maxHeight =
      this.props.maxHeight -
      this.props.triangleSize -
      Unit.parse(this.context.theme.shapes.menuPadding).value * 2;
    if (itemCount && itemWidth && itemHeight && maxHeight) {
      let maxRows = Math.floor(maxHeight / itemHeight);
      const columnCount = Math.max(Math.ceil(itemCount / maxRows), 1);
      this.containerStyle.width = itemWidth * columnCount + 'px';
      maxRows = Math.ceil(itemCount / columnCount);
      this.containerStyle.height = maxRows * itemHeight + 'px';
    }
  }

  renderHiddenItem() {
    const item = {};
    return (
      <div ref={this.setItemRef} className={this.styles.classNames.hidden}>
        <Button
          text={item.text}
          glyph={item.glyph}
          glyphColor={item.color}
          height={this.context.theme.shapes.menuButtonHeight}
          width={this.menuItemWidth}
          border={'none'}
          active={false}
          onClick={() => this.onClickedItem(item)}
        />
      </div>
    );
  }

  renderItem(item, index, isActive) {
    if (item.separator) {
      return <Separator key={index} kind="menu-separator" />;
    }

    const additionnalProps = {};
    if (item.glyph) {
      if (item.glyph.glyph) {
        additionnalProps.glyph = item.glyph.glyph;
        additionnalProps.glyphColor = item.glyph.color;
      } else {
        additionnalProps.glyph = item.glyph;
        additionnalProps.glyphColor = item.color;
      }
    } else {
      additionnalProps.glyph = isActive ? 'solid/check' : 'solid/none';
    }
    additionnalProps.active = isActive;

    return (
      <Button
        {...additionnalProps}
        key={index}
        kind="flat-list-combo-item"
        justify={'flex-start'}
        text={item.text}
        height={this.itemHeight + 'px'}
        width={this.itemWidth + 'px'}
        border={'none'}
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
    if (!this.state.initialized) {
      return this.renderHiddenItem();
    } else {
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
}

/******************************************************************************/
