import React from 'react';
import Widget from 'laboratory/widget';
import ReactList from 'react-list';

import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';
import CheckButton from 'gadgets/check-button/widget';

import throttle from 'lodash/throttle';

class List extends Widget {
  constructor() {
    super(...arguments);

    this._fetchInternal = this._fetchInternal.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.estimateItemSize = this.estimateItemSize.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.fetch = this.fetch.bind(this);

    this._indices = [];
    this._fetch = throttle(this._fetchInternal, 200);
  }

  static connectTo(instance) {
    return Widget.Wired(List)(`list@${instance.props.id}`);
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
    return null;
  }

  _changeStatus(changed, newState) {
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
    return ['draft', 'published', 'archived'].reduce((state, status) => {
      state[status] = this.props.status.contains(status);
      return state;
    }, {});
  }

  changeStatus(status) {
    return () => this._changeStatus(status, !this.buildStatusFlag()[status]);
  }

  render() {
    if (!this.props.id || !this.props.status) {
      return null;
    }
    const {published, draft, archived} = this.buildStatusFlag();
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
                checked={draft}
                onClick={this.changeStatus('draft')}
              />
            </Container>
            <Container kind="row">
              <Label width="30px" />
              <CheckButton
                justify="left"
                heightStrategy="compact"
                text="Publiés"
                tooltip="Montre les éléments publiés"
                checked={published}
                onClick={this.changeStatus('published')}
              />
            </Container>
            <Container kind="row">
              <Label width="30px" />
              <CheckButton
                justify="left"
                heightStrategy="compact"
                text="Archivés"
                tooltip="Montre les éléments archivés"
                checked={archived}
                onClick={this.changeStatus('archived')}
              />
            </Container>
          </Container>
        </Container>

        <ReactList
          length={this.props.count}
          type={this.props.type || 'variable'}
          itemRenderer={this.renderItem}
          itemSizeEstimator={this.estimateItemSize}
        />
      </Container>
    );
  }
}

export default List;
