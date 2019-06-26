export default [
  {
    name: 'search',
    props: {
      searchValue: 'Jean Dupond',
      required: true,
      onAdd: func,
    },
  },
  {
    name: 'search-new',
    props: {
      searchValue: '',
      hintText: 'Entrez un client',
      required: true,
      onAdd: func,
    },
  },
  {
    name: 'selection',
    props: {
      selectedValue: 'Swiss System AG',
      selectedGlyph: 'solid/rocket',
      selectedGlyphColor: 'red',
      onClear: func,
      onShow: func,
    },
  },
  {
    name: 'selection-readonly',
    props: {
      selectedValue: 'Velocité Lausanne',
      selectedGlyph: 'solid/bicycle',
      readonly: true,
      onClear: func,
      onShow: func,
    },
  },
  {
    name: 'empty',
    props: {},
  },
];

function func() {
  //
}
