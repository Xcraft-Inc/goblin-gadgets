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
    this.renderTable = this.renderTable.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
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
      status: 'status',
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

    if (items.length) {
      const range = [items[0].index, items[items.length - 1].index];
      // Horrible hack qui corrige le problème de la liste de gauche qui est
      // vide la plupart du temps lors de l'ouverture du panneau de recherche !
      if (range.length !== 2 || range[0] !== 0 || range[1] !== 0) {
        this.loadIndex(range);
      }
    }

    return (
      <div ref={ref}>
        {items.map(row => {
          return this.renderRow(row);
        })}
      </div>
    );
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
          pageSize={this.props.pageSize / 2}
          length={this.props.count}
          type={this.props.type || 'variable'}
          itemsRenderer={this.renderTable}
          itemRenderer={this.renderItem}
        />
      </Container>
    );
  }
}

export default List;
