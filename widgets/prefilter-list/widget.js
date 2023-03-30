import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import C from 'goblin-laboratory/widgets/connect-helpers/c';
import Label from 'goblin-gadgets/widgets/label/widget';
import TextField from 'goblin-gadgets/widgets/text-field/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import T from 't';

/******************************************************************************/

class PrefilterList extends Widget {
  constructor() {
    super(...arguments);
    // Add a new prefilter with current filters and sort
    this.onAdd = this.onAdd.bind(this);
    // Apply/Remove filters and sort of selected prefilter
    this.onTogglePrefilter = this.onTogglePrefilter.bind(this);
    // Start edition of a prefilter name
    this.onEditPrefilterName = this.onEditPrefilterName.bind(this);
    // Cancel edition of a prefilter name
    this.onCancelPrefilterNameEdit = this.onCancelPrefilterNameEdit.bind(this);
    // Change name of a prefilter
    this.onSavePrefilterName = this.onSavePrefilterName.bind(this);
    // Save filters on current selected prefilter
    this.onSavePrefilter = this.onSavePrefilter.bind(this);
    // Delete current selected prefilter
    this.onDeletePrefilter = this.onDeletePrefilter.bind(this);
  }

  onAdd() {
    this.doFor(this.props.id, 'createPrefilter', {});
  }

  onTogglePrefilter(id) {
    this.doFor(this.props.id, 'togglePrefilter', {prefilterId: id});
  }

  onEditPrefilterName(id, name) {
    this.dispatch({type: 'START-EDITION', id, name});
  }

  onCancelPrefilterNameEdit() {
    this.dispatch({type: 'FINISH-EDITION'});
  }

  onSavePrefilterName() {
    const state = this.getWidgetState();
    const id = state.get('editedPrefilterId');
    const name = state.get('editedPrefilterName');
    this.doFor(this.props.id, 'changePrefilterName', {prefilterId: id, name});
    this.dispatch({type: 'FINISH-EDITION'});
  }

  /* Action on selectedPrefilterId */

  onSavePrefilter() {
    this.doFor(this.props.id, 'savePrefilter', {});
  }

  onDeletePrefilter() {
    this.doFor(this.props.id, 'deletePrefilter', {});
  }

  renderListItem(item, index) {
    return (
      <React.Fragment key={index}>
        {this.renderListItemName(item)}
        {this.renderListItemButtons(item.id)}
      </React.Fragment>
    );
  }

  renderListItemName(item) {
    if (this.props.editedPrefilterId === item.id) {
      return (
        <div className={this.styles.classNames.listItemEdited}>
          <TextField value={C('.editedPrefilterName')} grow="1" />
          <Button
            key="1"
            glyph={'solid/check'}
            tooltip={T('Modifier le nom du pré-filtrage')}
            onClick={() => {
              this.onSavePrefilterName();
            }}
          />
          <Button
            key="2"
            glyph={'solid/times'}
            tooltip={T('Annuler la modification')}
            onClick={this.onCancelPrefilterNameEdit}
          />
        </div>
      );
    } else {
      const selectedFilter = item.id === this.props.selectedPrefilterId;
      const className = selectedFilter
        ? this.styles.classNames.listItemActive
        : this.styles.classNames.listItem;
      return (
        <div className={className}>
          <Label
            text={item.name}
            grow="1"
            onClick={() => this.onTogglePrefilter(item.id)}
          />
          <Button
            glyph={'solid/pencil'}
            tooltip={T('Editer le nom du pré-filtrage')}
            onClick={() => {
              this.onEditPrefilterName(item.id, item.name);
            }}
          />
        </div>
      );
    }
  }

  renderListItemButtons(id) {
    if (this.props.selectedPrefilterId !== id) {
      return null;
    }
    return (
      <div className={this.styles.classNames.buttons}>
        <Label
          text={T('Sauvegarder')}
          tooltip={T('Sauvegarder le pré-filtrage')}
          glyph="solid/save"
          className={this.styles.classNames.button}
          onClick={this.onSavePrefilter}
        />
        <Label
          text={T('Supprimer')}
          tooltip={T('Supprimer le pré-filtrage')}
          glyph="solid/trash"
          className={this.styles.classNames.button}
          onClick={this.onDeletePrefilter}
        />
      </div>
    );
  }

  renderList() {
    return this.props.prefilters.map((item, index) =>
      this.renderListItem(item, index)
    );
  }

  renderAddButton() {
    return (
      <Label
        text={T('Ajouter')}
        glyph="solid/plus"
        onClick={this.onAdd}
        tooltip={T('Ajouter un nouveau pré-filtrage')}
        className={this.styles.classNames.button}
      />
    );
  }

  render() {
    if (!this.props.prototypeMode) {
      return null;
    }

    return (
      <div className={this.styles.classNames.container}>
        <div className={this.styles.classNames.containerTitle}>
          <Label kind="title" text={T('Pré-filtrage')} />
        </div>
        <div>
          {this.renderList()}
          {this.renderAddButton()}
        </div>
      </div>
    );
  }
}

/******************************************************************************/

const PrefilterListConnected = Widget.connect((state) => {
  const userSession = Widget.getUserSession(state);
  const prototypeMode = userSession.get('prototypeMode');
  return {prototypeMode};
})(PrefilterList);

export default PrefilterListConnected;
