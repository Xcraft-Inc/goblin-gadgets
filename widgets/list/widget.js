import React from 'react';
import Widget from 'laboratory/widget';
import ReactList from 'react-list';
import throttle from 'lodash/throttle';

class List extends Widget {
  constructor() {
    super(...arguments);

    this._fetchInternal = this._fetchInternal.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.estimateItemSize = this.estimateItemSize.bind(this);
    this.fetch = this.fetch.bind(this);
    this._indices = [];
    this._fetch = throttle(this._fetchInternal, 200);
  }

  static get wiring() {
    return {
      id: 'id',
      count: 'count',
      type: 'type',
      status: 'status',
    };
  }

  _fetchInternal() {
    this.do('fetch', {indices: this._indices});
    this._indices = [];
  }

  fetch(index) {
    this._indices.push(index);
    this._fetch();
  }

  renderItem(index, key) {
    setTimeout(() => this.fetch(index), 0);
    const Item = this.props.renderItem;
    return (
      <Item
        key={key}
        index={index}
        listId={this.props.id}
        itemId={`${index}-item`}
        height={this._height}
        parentId={this.props.parentId}
      />
    );
  }

  estimateItemSize(index, cache) {
    if (cache[0]) {
      this._height = cache[0] > 40 ? cache[0] : 40;
      return this._height;
    }
    return 40;
  }

  render() {
    if (!this.props.id) {
      return null;
    }

    return (
      <ReactList
        length={this.props.count}
        type={this.props.type || 'variable'}
        itemRenderer={this.renderItem}
        itemSizeEstimator={this.estimateItemSize}
      />
    );
  }
}

export default Widget.Wired(List)();
