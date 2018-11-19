import React from 'react';
import Widget from 'laboratory/widget';
import ReactList from 'react-list';
import throttle from 'lodash/throttle';

class List extends Widget {
  constructor() {
    super(...arguments);

    this.renderItem = this.renderItem.bind(this);
    this.estimateItemSize = this.estimateItemSize.bind(this);

    this._height = 40;
    this._threshold = 80;
    this._fetchInternal = this._fetchInternal.bind(this);
    this._fetch = throttle(this._fetchInternal, 200).bind(this);
    this._range = [];

    this.listRef = React.createRef();
  }

  static get wiring() {
    return {
      id: 'id',
      count: 'count',
      type: 'type',
      contentIndex: 'contentIndex',
    };
  }

  _fetchInternal() {
    if (!this.listRef.current) {
      return;
    }

    const range = this.listRef.current.getVisibleRange();
    const {count} = this.props;

    if (
      range[0] >= this._range[0] - this._threshold / 2 &&
      range[1] <= this._range[1] + this._threshold / 2
    ) {
      return;
    }

    this._range = range.slice();

    /* Add a margin of this._threshold entries (if possible) for the range */
    range[0] =
      range[0] >= this._threshold //
        ? range[0] - this._threshold
        : 0;
    range[1] =
      range[1] + this._threshold < count
        ? range[1] + this._threshold
        : count - 1;

    this.do('fetch', {range});
  }

  renderItem(index) {
    if (this.listRef.current) {
      setTimeout(this._fetch, 0);
    }

    const Item = this.props.renderItem;
    return (
      <Item
        key={index}
        index={index}
        listId={this.props.id}
        itemId={`${index}-item`}
        height={this._height}
        parentId={this.props.parentId}
      />
    );
  }

  estimateItemSize(index, cache) {
    if (cache[index]) {
      this._height = cache[index];
      return this._height;
    }
    this._height = cache[0] ? cache[0] : 40;
    return this._height;
  }

  render() {
    if (!this.props.id) {
      return null;
    }

    return (
      <ReactList
        ref={this.listRef}
        length={this.props.count}
        type={this.props.type || 'variable'}
        itemRenderer={this.renderItem}
        itemSizeEstimator={this.estimateItemSize}
      />
    );
  }
}

export default Widget.Wired(List)();
