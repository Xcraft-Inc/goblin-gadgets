import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import HinterFieldNC from '../hinter-field-nc/widget';
import withC from 'goblin-laboratory/widgets/connect-helpers/with-c';
import C from 'goblin-laboratory/widgets/connect-helpers/c';
import WithModel from 'goblin-laboratory/widgets/with-model/widget';

const HinterFieldConnected = withC(HinterFieldNC);

/******************************************************************************/
class HinterFieldSearch extends Widget {
  constructor() {
    super(...arguments);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchFocus = this.handleSearchFocus.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentWillUnmount() {
    this.removeOutsideClickListener();
  }

  handleSearchChange(value) {
    this.dispatchTo(this.widgetId, {
      type: 'CHANGE',
      path: this.props.hinter,
      newValue: value,
    });
    this.rawDispatch({
      type: 'hinter/search',
      model: `${this.context.model}.${this.props.hinter}`,
      value,
    });
  }

  handleSearchFocus() {
    this.navToHinter();
    this.addOutsideClickListener();
  }

  addOutsideClickListener() {
    document.addEventListener('click', this.handleOutsideClick);
  }

  removeOutsideClickListener() {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick(e) {
    const target = e.target;
    const containers = [...document.getElementsByClassName('hinter-container')];
    if (!containers.some(container => container.contains(target))) {
      this.hideHinter();
      this.removeOutsideClickListener();
    }
  }

  render() {
    const {hinter, ...otherProps} = this.props;
    return (
      <HinterFieldConnected
        searchValue={C(`widgets.${this.widgetId}.${this.props.hinter}`)}
        onSearchChange={this.handleSearchChange}
        onSearchFocus={this.handleSearchFocus}
        {...otherProps}
      />
    );
  }
}

/******************************************************************************/

class HinterFieldControl extends Widget {
  constructor() {
    super(...arguments);
    this.add = this.add.bind(this);
    this.clear = this.clear.bind(this);
    this.show = this.show.bind(this);
  }

  add(searchValue) {
    if (searchValue && searchValue.length >= 1) {
      this.doFor(this.workitemId, `add-new-${this.props.hinter}`, {
        value: searchValue,
      });
    }
  }

  clear() {
    this.props.onChange(null);
  }

  show() {
    this.navToDetail(this.workitemId, this.props.selectedId, this.props.hinter);
  }

  render() {
    const {summary = 'info', selectedId, onChange, ...otherProps} = this.props;

    this.workitemId = this.context.id;

    let selectedValuePath;
    let selectedGlyphPath;
    let selectedGlyphColorPath;
    if (selectedId) {
      const summariesPath = `backend.${selectedId}.meta.summaries`;
      selectedValuePath = `${summariesPath}.${summary}`;
      selectedGlyphPath = `${summariesPath}.glyph`;
      selectedGlyphColorPath = `${summariesPath}.glyphColor`;
    }

    // FIXME: Set context.model for compatibility with navToHinter
    return (
      <WithModel model={`backend.${this.workitemId}`}>
        <HinterFieldSearch
          widgetId={`${this.workitemId}$hinter-field`}
          onAdd={this.add}
          onClear={this.clear}
          onShow={this.show}
          selectedValue={C(selectedValuePath)}
          selectedGlyph={C(selectedGlyphPath)}
          selectedGlyphColor={C(selectedGlyphColorPath)}
          {...otherProps}
        />
      </WithModel>
    );
  }
}

/******************************************************************************/

const HinterField = withC(HinterFieldControl, {selectedId: 'onChange'});

// export default HinterField;

// FIXME: should be removed
// Convert model to selectedId for backward compatibility
export default class extends Widget {
  render() {
    let {selectedId, model, ...otherProps} = this.props;
    if (model) {
      selectedId = C(model);
    }
    return <HinterField {...otherProps} selectedId={selectedId} />;
  }
}
