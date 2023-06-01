import {types, addType} from 'goblin-gadgets/types/types.js';
import Shredder from 'xcraft-core-shredder';
import {propsList} from '../../types/props-list.js';
import {object} from 'xcraft-core-stones';

/******************************************************************************/

const t1 = {
  header: [
    {
      name: 'content',
      description: 'Type',
      width: '100px',
      textAlign: 'left',
    },
    {
      name: 'dimensions',
      description: 'Dimensions',
      width: '200px',
      textAlign: 'left',
    },
    {
      name: 'weight',
      description: 'Poids',
      width: '100px',
      textAlign: 'right',
    },
  ],
  rows: [
    {
      id: '1',
      content: 'C6',
      dimensions: {glyph: 'solid/check', text: '11.4x16.2x1'},
      weight: '150g',
    },
    {
      id: '2',
      content: 'A4',
      dimensions: {glyph: 'solid/times', text: '21x29.7x1'},
      weight: '100g',
    },
    {
      id: '3',
      content: 'XT9',
      dimensions: {glyph: 'solid/calendar', text: '50x50x100'},
      weight: '1kg',
    },
    {
      id: '4',
      content: 'N1',
      dimensions: {glyph: 'solid/rocket', text: '1x2x3'},
      weight: '10g',
    },
  ],
};

const t2 = {
  'post-header': [
    {
      names: ['lu', 'ma', 'me', 'je', 've'],
      description: 'Ouvrable',
      textAlign: 'center',
    },
    {
      names: ['sa', 'di'],
      description: 'Week-end',
      textAlign: 'center',
    },
  ],
  'header': [
    {
      name: 'lu',
      description: 'Lun',
      grow: '1',
      textAlign: 'right',
    },
    {
      name: 'ma',
      description: 'Mar',
      grow: '1',
      textAlign: 'right',
    },
    {
      name: 'me',
      description: 'Mer',
      grow: '1',
      textAlign: 'right',
    },
    {
      name: 'je',
      description: 'Jeu',
      grow: '1',
      textAlign: 'right',
    },
    {
      name: 've',
      description: 'Ven',
      grow: '1',
      textAlign: 'right',
    },
    {
      name: 'sa',
      description: 'Sam',
      grow: '1',
      textAlign: 'right',
    },
    {
      name: 'di',
      description: 'Dim',
      grow: '1',
      textAlign: 'right',
    },
  ],
  'rows': [
    {
      id: '1',
      lu: '10.00',
      ma: '12.00',
      me: '10.00',
      je: '10.00',
      ve: '19.00',
      sa: '5.00',
      di: '100.00',
    },
    {
      id: '2',
      lu: '120.00',
      ma: '150.00',
      je: '100.00',
      ve: '20.00',
      di: '2.00',
    },
    {
      id: '3',
      lu: '5.00',
      ma: '50.00',
      me: '51.00',
      je: '34.00',
      ve: '7.00',
      sa: '65.00',
    },
  ],
};

const t3 = {
  header: [
    {
      name: 'description',
      description: 'Description',
      grow: '5',
      textAlign: 'left',
    },
    {
      name: 'quantity',
      description: 'Quantité',
      grow: '1',
      textAlign: 'right',
    },
    {
      name: 'unit',
      description: 'Unité',
      grow: '1',
      textAlign: 'left',
    },
    {
      name: 'pricePerUnit',
      description: 'Prix',
      grow: '1',
      textAlign: 'right',
    },
    {
      name: 'discount',
      description: 'Rabais',
      grow: '1',
      textAlign: 'right',
    },
    {
      name: 'finalPrice',
      description: 'Total',
      grow: '1',
      textAlign: 'right',
    },
  ],
  rows: [
    {
      id: '1',
      description: 'Crésus Comptabilité PRO',
      quantity: '1',
      unit: 'pce',
      pricePerUnit: '480.00',
      finalPrice: '480.00',
    },
    {
      id: '2',
      description: 'Crésus Facturation PRO',
      quantity: '200',
      unit: 'pce',
      pricePerUnit: '480.00',
      discount: '100.00',
      finalPrice: '95900.00',
    },
    {
      id: '3',
      description: 'Formation compabilité mardi 10.02.2017',
      quantity: '4.5',
      unit: 'h',
      pricePerUnit: '150.00',
      finalPrice: '675.00',
    },
    {
      id: '4',
      description: 'Dépannage ticket #30.205',
      quantity: '1',
      pricePerUnit: '100.00',
      discount: '10%',
      finalPrice: '90.00',
    },
    {
      id: '5',
      description: 'Vis M12',
      quantity: '200',
      unit: 'pce',
      pricePerUnit: '0.30',
      finalPrice: '60.00',
    },
    {
      id: '6',
      description:
        'Description débile super longue pour tester la mise en page lorsque le texte est très long, voilà voilà...',
      quantity: '1',
      pricePerUnit: '5.00',
      finalPrice: '5.00',
    },
    {
      id: '7',
      description: 'Huile de coude extra-forte',
      quantity: '2.5',
      unit: 'dl',
      pricePerUnit: '10.00',
      finalPrice: '250.00',
    },
  ],
};

const t4 = {
  header: [
    {
      name: 'column1',
      description: 'Nom',
      width: '200px',
      textAlign: 'left',
    },
    {
      name: 'column2',
      description: 'Largeur',
      width: '100px',
      textAlign: 'right',
      type: 'price',
    },
    {
      name: 'column3',
      description: 'Longueur',
      width: '100px',
      textAlign: 'right',
      type: 'price',
    },
    {
      name: 'column4',
      description: 'Hauteur',
      width: '100px',
      textAlign: 'right',
      type: 'price',
    },
  ],
  filtering: 'enable',
  sorting: 'enable',
  defaultSortingColumns: ['column1'],
  rows: [
    {
      id: '1',
      column1: 'Table basse',
      column2: '100',
      column3: '120',
      column4: '30',
    },
    {
      id: '2',
      column1: 'Table à manger',
      column2: '200',
      column3: '330',
      column4: '70',
    },
    {
      id: '3',
      column1: 'Lit simple',
      column2: '90',
      column3: '210',
      column4: '50',
    },
    {
      id: '4',
      column1: 'Lit double',
      column2: '180',
      column3: '210',
      column4: '50',
    },
    {
      id: '5',
      column1: 'Armoire simple',
      column2: '100',
      column3: '80',
      column4: '200',
    },
    {
      id: '6',
      column1: 'Armoire double',
      column2: '200',
      column3: '80',
      column4: '200',
    },
    {
      id: '7',
      column1: 'Armoire triple',
      column2: '280',
      column3: '80',
      column4: '200',
    },
    {
      id: '8',
      column1: 'Chaise',
      column2: '60',
      column3: '60',
      column4: '110',
    },
  ],
};

const t5 = {
  header: [
    {
      name: 'column1',
      description: 'Groupe',
      width: '200px',
      textAlign: 'left',
      indent: 'space',
    },
    {
      name: 'column2',
      description: 'Description',
      grow: '1',
      textAlign: 'left',
      indent: 'space',
    },
  ],
  rows: [
    {
      column1: 'Jours',
      column2: '',
      horizontalSeparator: 'both',
      rows: [
        {
          id: '1',
          column1: 'Lundi',
          column2: '8h00 – 18h30',
        },
        {
          id: '2',
          column1: 'Mardi',
          column2: '8h00 – 18h30',
        },
        {
          id: '3',
          column1: 'Mercredi',
          column2: '8h00 – 18h30',
        },
        {
          id: '4',
          column1: 'Jeudi',
          column2: '8h00 – 18h30',
        },
        {
          id: '5',
          column1: 'Vendredi',
          column2: '8h00 – 18h30',
        },
        {
          id: '6',
          column1: 'Samedi',
          column2: '',
          rows: [
            {
              id: '6.1',
              column1: 'Matin',
              column2: '8h00 – 12h00',
            },
            {
              id: '6.2',
              column1: 'Après-midi',
              column2: '13h30 – 17h00',
            },
          ],
        },
        {
          id: '7',
          column1: 'Dimanche',
          column2: 'Fermé',
        },
      ],
    },
    {
      column1: 'Mois',
      column2: '',
      horizontalSeparator: 'both',
      rows: [
        {
          id: '1',
          column1: 'Janvier',
          column2: '',
        },
        {
          id: '2',
          column1: 'Février',
          column2: 'Fermeture annuelle',
        },
        {
          id: '3',
          column1: 'Mars',
          column2: '',
        },
        {
          id: '4',
          column1: 'Avril',
          column2: '',
        },
        {
          id: '5',
          column1: 'Mai',
          column2: '',
        },
        {
          id: '6',
          column1: 'Juin',
          column2: '',
        },
        {
          id: '7',
          column1: 'Juillet',
          column2: '',
        },
        {
          id: '8',
          column1: 'Août',
          column2: '',
        },
        {
          id: '9',
          column1: 'Septembre',
          column2: '',
        },
        {
          id: '10',
          column1: 'Octobre',
          column2: '',
        },
        {
          id: '11',
          column1: 'Novembre',
          column2: '',
        },
        {
          id: '12',
          column1: 'Décembre',
          column2: '',
        },
      ],
    },
  ],
};

/******************************************************************************/

const samples = [
  {id: 'T1', text: 'Petite table'},
  {id: 'T2', text: 'Moyenne table'},
  {id: 'T3', text: 'Grande table'},
  {id: 'T4', text: 'Table avec filtre et tri'},
  {id: 'T5', text: 'Table à plusieurs niveaux'},
];

const samplesData = {
  T1: new Shredder(t1),
  T2: new Shredder(t2),
  T3: new Shredder(t3),
  T4: new Shredder(t4),
  T5: new Shredder(t5),
};

/******************************************************************************/

const selectedIds = [
  {id: 'S1', text: 'Premier sélectionné'},
  {id: 'S2', text: 'Deuxième sélectionné'},
  {id: 'S12', text: 'Premier et deuxième sélectionnés'},
];

const selectedIdsData = {
  S1: ['1'],
  S2: ['2'],
  S12: ['1', '2'],
};

/******************************************************************************/

addType('dataTable', {
  type: object,
  defaultValue: 'T1',
  widget: 'combo',
  restrictsToList: true,
  samples: samples,
  samplesData: samplesData,
});

addType('selectedIds', {
  type: object,
  defaultValue: 'S1',
  widget: 'combo',
  restrictsToList: true,
  samples: selectedIds,
  samplesData: selectedIdsData,
});

addType('sortingColumns', {
  type: object,
  widget: 'combo',
  restrictsToList: true,
  samples: [
    {id: 'S1', text: 'Column 1'},
    {id: 'S2', text: 'Column 2, 1'},
    {id: 'S3', text: 'Column 3, 1'},
    {id: 'S4', text: 'Column 4, 1'},
  ],
  samplesData: {
    S1: new Shredder(['column1']),
    S2: new Shredder(['column2', 'column1']),
    S3: new Shredder(['column3', 'column1']),
    S4: new Shredder(['column4', 'column1']),
  },
});

/******************************************************************************/

export default [
  // Main.
  {
    name: 'data',
    group: 'main',
    type: types.dataTable,
    description: 'The data of table.',
  },
  {
    name: 'selectedIds',
    group: 'main',
    type: types.selectedIds,
  },
  {
    name: 'selectionMode',
    group: 'main',
    type: types.enum(['none', 'single', 'multi']),
  },
  {
    name: 'filter',
    group: 'main',
    type: types.string,
  },
  {
    name: 'sortingColumns',
    group: 'main',
    type: types.sortingColumns,
    description: "Only for data with sorting: 'enable'.",
  },
  {
    name: 'useKeyUpDown',
    group: 'main',
    type: types.bool,
    description: "Work only widh connected widget (don't work with WidgetDoc).",
  },
  {
    name: 'widgetId',
    group: 'main',
    type: types.string,
  },

  // Aspect.
  {
    name: 'frame',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'hasButtons',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'headerWithoutHorizontalSeparator',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'widgetDocPreview',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'compactMargins',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'simpleHeader',
    group: 'aspect',
    type: types.bool,
  },
  {
    name: 'fontSizeStrategy',
    group: 'aspect',
    type: types.enum(['', 'decrease']),
    description: 'Only for multi-level tables.',
  },
  {
    name: 'cellFormat',
    group: 'aspect',
    type: types.enum(['singleLine', 'original']),
  },

  // Layout.
  {
    name: 'grow',
    group: 'layout',
    type: types.grow,
  },
  {
    name: 'height',
    group: 'layout',
    type: types.pixel,
    min: 0,
    max: 1000,
  },

  // Function.
  {
    name: 'onSelectionChanged',
    group: 'function',
    type: types.function,
  },
];
