//T:2019-02-27
import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import ReactList from 'react-list';
import throttle from 'lodash/throttle';
import CheckboxNC from '../checkbox-nc/widget.js';

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
    this._count = {};
    this._mount = this._mount.bind(this);

    this._listRef = null;
  }

  _mount(node) {
    if (!node) {
      return;
    }

    this._listRef = node;

    let top = 0;
    let cache = null;
    const state = this.getWidgetCacheState(this.widgetId);
    if (state) {
      top = state.get('top');
      cache = state.get('cache');
    }

    if (cache && cache.size > 0) {
      /* Use our cached cache if possible, then scrollTo can compute
       * something good (not perfect with variable list, but good enough).
       */
      this._listRef.cache = cache.toJS();
    }
    if (top) {
      this._listRef.scrollTo(top);
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();

    if (!this._listRef) {
      return;
    }

    /* Save the current visible range and cache in the session cache */
    const [top, bottom] = this._listRef.getVisibleRange();
    this.dispatchToCache(this.widgetId, {
      top,
      bottom,
      cache: this._listRef.cache,
    });

    this._listRef = null;
  }

  _fetchInternal() {
    if (!this._listRef) {
      return;
    }

    const range = this._listRef ? this._listRef.getVisibleRange() : [0, 0];
    const {count} = this.props;

    if (range[0] === 0 && range[1] === 0) {
      this._listRef.updateFrame();
    }

    /* Ensure to test against the right list id. Because the fetching is
     * executed by a setTimeout, it's possible that an other list will
     * be presented.
     */
    if (!this._range[this.props.id]) {
      this._range[this.props.id] = [];
    }
    if (!this._count[this.props.id]) {
      this._count[this.props.id] = 0;
    }

    if (
      count === this._count[this.props.id] &&
      range[0] >= this._range[this.props.id][0] - this._threshold / 2 &&
      range[1] <= this._range[this.props.id][1] + this._threshold / 2
    ) {
      return;
    }

    this._range[this.props.id] = range.slice();
    this._count[this.props.id] = count;

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

  select = (index) => {
    this.doFor(this.props.id, 'toggle-select', {rowId: index});
  };

  renderItem(index) {
    setTimeout(this._fetch, 0);

    const Item = this.props.renderItem;
    const enableSelection = this.props.enableSelection;
    const select = () => this.select(index);
    return (
      <div style={{display: 'flex'}} key={index}>
        {enableSelection ? (
          <CheckboxNC
            checked={this.props.selected.get(index, false)}
            onChange={select}
          />
        ) : null}
        <Item
          index={index}
          listId={this.props.id}
          itemId={`${index}-item`}
          busyHeight={this._height}
          data={this.props.data}
        />
      </div>
    );
  }

  estimateItemSize(index, cache) {
    let state = null;
    let inputCache = cache['0'] !== undefined;

    if (!inputCache) {
      state = this.getWidgetCacheState(this.widgetId);
      inputCache = state && !state.has('cache');
    }

    if (inputCache) {
      /* Ensure that the first item is never 0, it prevents a strange bug where
       * the list is not beginning by 0 because the first items have a bad
       * height of 0.
       */
      if (cache['0'] === 0) {
        cache['0'] = 40;
      }
    } else if (state) {
      /* Use the cached cache, then it's possible to restore a mostly good
       * list height. It's not 100% accurate, because the content of the list
       * can change at any time.
       */
      cache = state.get('cache');
    }

    let height;
    const isImm = !!cache.get;

    height = isImm ? cache.get(index) : cache[index];
    if (height > 0) {
      this._height = height;
      return this._height;
    }

    height = isImm ? cache.get('0') : cache['0'];
    if (height) {
      this._height = height;
    } else if (this._listRef && this._listRef.items) {
      /* Generate cache even for uniform list, then it's possible to compute
       * a correct scroller height value.
       */
      this._listRef.cacheSizes();
      this._height = this._listRef.cache['0'];
    } else {
      this._height = 40;
    }

    return this._height;
  }

  render() {
    if (!this.props.id) {
      return null;
    }

    return (
      <ReactList
        ref={this._mount}
        length={this.props.count}
        threshold={250}
        type={this.props.type || 'variable'}
        itemRenderer={this.renderItem}
        itemSizeEstimator={this.estimateItemSize}
        useTranslate3d={true}
      />
    );
  }
}

export default Widget.connect((state, props) => {
  return {
    id: props.id,
    type: props.type,
    count: state.get(`backend.${props.id}.count`),
    listIds: state.get(`backend.${props.id}.list`),
    contentIndex: state.get(`backend.${props.id}.options.contentIndex`),
    entityId: state.get(`backend.${props.id}.options.entityId`),
    path: state.get(`backend.${props.id}.options.path`),
    enableSelection: state.get(`backend.${props.id}.enableSelection`),
    selected: state.get(`backend.${props.id}.selected`),
  };
})(List);
