//T:2019-02-27
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
    this._range = {};

    this.listRef = React.createRef();
  }

  _fetchInternal() {
    if (!this.listRef.current) {
      return;
    }

    const range = this.listRef.current
      ? this.listRef.current.getVisibleRange()
      : [0, 0];
    const {count} = this.props;

    /* Ensure to test against the right list id. Because the fetching is
     * executed by a setTimeout, it's possible that an other list will
     * be presented.
     */
    if (!this._range[this.props.id]) {
      this._range[this.props.id] = [];
    }

    if (
      range[0] >= this._range[this.props.id][0] - this._threshold / 2 &&
      range[1] <= this._range[this.props.id][1] + this._threshold / 2
    ) {
      return;
    }

    this._range[this.props.id] = range.slice();

    /* Add a margin of this._threshold entries (if possible) for the range */
    range[0] =
      range[0] >= this._threshold //
        ? range[0] - this._threshold
        : 0;
    range[1] =
      range[1] + this._threshold < count
        ? range[1] + this._threshold
        : count - 1;

    this.doAs('list', 'fetch', {range});
  }

  renderItem(index) {
    setTimeout(this._fetch, 0);

    const Item = this.props.renderItem;
    return (
      <Item
        key={index}
        index={index}
        listId={this.props.id}
        itemId={`${index}-item`}
        height={this._height}
        parentId={this.props.parentId}
        //id={this.props.listIds ? this.props.listIds.get (index) : this.props.id}
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

export default Widget.connect((state, props) => {
  return {
    count: state.get(`backend.${props.id}.count`),
    listIds: state.get(`backend.${props.id}.list`),
    contentIndex: state.get(`backend.${props.id}.contentIndex`),
  };
})(List);
