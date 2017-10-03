import React from 'react';
import Widget from 'laboratory/widget';
import Container from 'gadgets/container/widget';
import ReactList from 'react-list';
import _ from 'lodash';

class List extends Widget {
  constructor () {
    super (...arguments);
    this.renderItem = this.renderItem.bind (this);
    const load = index => {
      this.do ('load-index', {index});
    };
    this.loadIndex = _.debounce (load, 500);
  }

  static get wiring () {
    return {
      id: 'id',
      count: 'count',
      pageSize: 'pageSize',
    };
  }

  renderItem (index, key) {
    this.loadIndex (index);

    const loadingWrapper = props => {
      if (props._listItemLoadding) {
        return <div>...</div>;
      } else {
        const LoadedItem = this.props.renderItem;
        return <LoadedItem {...props} />;
      }
    };
    const ListItem = this.getWidgetToFormMapper (loadingWrapper, item => {
      if (!item) {
        return {_listItemLoadding: true};
      } else {
        return this.props.mapItem (item, index);
      }
    }) (`.list.${index}-item`);

    return <ListItem key={key} />;
  }

  render () {
    if (!this.props.id) {
      return null;
    }
    return (
      <ReactList
        pageSize={this.props.pageSize / 2}
        length={this.props.count}
        type={'uniform'}
        itemRenderer={::this.renderItem}
      />
    );
  }
}

export default List;
