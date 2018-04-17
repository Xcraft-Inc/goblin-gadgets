import React from 'react';
import Widget from 'laboratory/widget';
import ReactList from 'react-list';
import _ from 'lodash';

class List extends Widget {
  constructor() {
    super(...arguments);
    this.renderItem = this.renderItem.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.renderRow = this.renderRow.bind(this);
    const load = range => {
      let cFrom = this.getFormValue('.from');
      let cTo = this.getFormValue('.to');
      if (range[0] < this.props.pageSize) {
        return;
      }
      if (range[0] - 10 < cFrom || range[1] + 10 >= cTo) {
        this.do('load-range', {from: range[0], to: range[1]});
      }
    };
    this.loadIndex = _.debounce(load, 200);
  }

  static connectTo(instance) {
    return Widget.Wired(List)(`list@${instance.props.id}`);
  }

  static get wiring() {
    return {
      id: 'id',
      count: 'count',
      pageSize: 'pageSize',
      type: 'type',
    };
  }

  renderItem(index, key) {
    return {model: `.list.${index}-item`, index, key};
  }

  renderRow(row) {
    const loadingWrapper = props => {
      if (props._loading) {
        return <div>loading...</div>;
      } else {
        const Item = this.props.renderItem;
        return <Item {...props} />;
      }
    };
    const ListItem = this.getWidgetToFormMapper(loadingWrapper, item => {
      if (!item) {
        return {_loading: true};
      } else {
        return this.props.mapItem(item, row.index);
      }
    })(row.model);

    return <ListItem key={row.key} />;
  }

  renderTable(items, ref) {
    if (!items) {
      return null;
    }
    const range = [items[0].index, items[items.length - 1].index];
    this.loadIndex(range);

    return (
      <div ref={ref}>
        {items.map(row => {
          return this.renderRow(row);
        })}
      </div>
    );
  }

  render() {
    if (!this.props.id || !this.props.count) {
      return null;
    }
    return (
      <ReactList
        pageSize={this.props.pageSize / 2}
        length={this.props.count}
        type={this.props.type || 'variable'}
        itemsRenderer={this.renderTable}
        itemRenderer={this.renderItem}
      />
    );
  }
}

export default List;
