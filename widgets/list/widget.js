import React from 'react';
import Widget from 'laboratory/widget';
import ReactList from 'react-list';
import _ from 'lodash';

import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';
import CheckButton from 'gadgets/check-button/widget';

class List extends Widget {
  constructor() {
    super(...arguments);
    this.renderItem = this.renderItem.bind(this);
    this.extimateItemSize = this.extimateItemSize.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
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
      status: 'status',
    };
  }

  renderItem(index, key) {
    const ListItem = this.getWidgetToFormMapper(
      props => {
        setTimeout(() => this.do('load', {index}), 0);
        const Item = this.props.renderItem;
        return <Item {...props} height={this._height} />;
      },
      item => this.props.mapItem(item, index)
    )(`.list.${index}-item`);

    return <ListItem key={key} />;
  }

  extimateItemSize(index, cache) {
    if (index > 0) {
      this._height = cache[0];
      return cache[0];
    }
    return null;
  }

  changeStatus(changed, newState) {
    const newStatusList = ['draft', 'published', 'archived'].reduce(
      (state, status) => {
        if (changed === status) {
          if (newState) {
            state.push(status);
          }
        } else {
          const isInList = this.props.status.contains(status);
          if (isInList) {
            state.push(status);
          }
        }
        return state;
      },
      []
    );
    this.do('change-status', {status: newStatusList});
  }

  buildStatusFlag() {
    return ['Draft', 'Published', 'Archived'].reduce((state, status) => {
      state[`show${status}`] = this.props.status.contains(status.toLowerCase());
      return state;
    }, {});
  }

  render() {
    if (!this.props.id || !this.props.status) {
      return null;
    }
    const {showPublished, showDraft, showArchived} = this.buildStatusFlag();
    return (
      <Container kind="pane">
        <Container kind="row-pane">
          <Container kind="column" grow="1">
            <Container kind="row">
              <Label width="30px" />
              <CheckButton
                justify="left"
                heightStrategy="compact"
                text="Brouillons"
                tooltip="Montre les brouillons"
                checked={showDraft}
                onClick={() => this.changeStatus('draft', !showDraft)}
              />
            </Container>
            <Container kind="row">
              <Label width="30px" />
              <CheckButton
                justify="left"
                heightStrategy="compact"
                text="Publiés"
                tooltip="Montre les éléments publiés"
                checked={showPublished}
                onClick={() => this.changeStatus('published', !showPublished)}
              />
            </Container>
            <Container kind="row">
              <Label width="30px" />
              <CheckButton
                justify="left"
                heightStrategy="compact"
                text="Archivés"
                tooltip="Montre les éléments archivés"
                checked={showArchived}
                onClick={() => this.changeStatus('archived', !showArchived)}
              />
            </Container>
          </Container>
        </Container>

        <ReactList
          length={this.props.count}
          type={this.props.type || 'variable'}
          itemRenderer={this.renderItem}
          itemSizeEstimator={this.extimateItemSize}
          pageSize={this.props.pageSize}
        />
      </Container>
    );
  }
}

export default List;
