export default {
  'search': {
    searchValue: 'Jean Dupond',
    required: true,
    onAdd: func,
  },
  'search-new': {
    searchValue: '',
    hintText: 'Entrez un client',
    required: true,
    onAdd: func,
  },
  'selection': {
    selectedValue: 'Swiss System AG',
    selectedGlyph: 'solid/rocket',
    selectedGlyphColor: 'red',
    onClear: func,
    onShow: func,
  },
  'selection-readonly': {
    selectedValue: 'Velocité Lausanne',
    selectedGlyph: 'solid/bicycle',
    readonly: true,
    onClear: func,
    onShow: func,
  },
};

function func() {
  //
}
