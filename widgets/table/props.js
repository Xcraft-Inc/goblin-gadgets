import {types, addType} from 'goblin-gadgets/types/types.js';
import PropTypes from 'prop-types';
import Shredder from 'xcraft-core-shredder';

const samples = [
  {id: 'T1', text: 'Petite table'},
  {id: 'T2', text: 'Moyenne table'},
  {id: 'T3', text: 'Grande table'},
  {id: 'T4', text: 'Table avec filtre et tri'},
  {id: 'T5', text: 'Table à plusieurs niveaux'},
];

const samplesData = {
  T1: {
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
        content: 'C6',
        dimensions: '11.4x16.2x1',
        weight: '150g',
      },
      {
        content: 'A4',
        dimensions: '21x29.7x1',
        weight: '100g',
      },
      {
        content: 'XT9',
        dimensions: '50x50x100',
        weight: '1kg',
      },
      {
        content: 'N1',
        dimensions: '1x2x3',
        weight: '10g',
      },
    ],
  },
  T2: {
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
        description: 'Lundi',
        grow: '1',
        textAlign: 'right',
      },
      {
        name: 'ma',
        description: 'Mardi',
        grow: '1',
        textAlign: 'right',
      },
      {
        name: 'me',
        description: 'Mercredi',
        grow: '1',
        textAlign: 'right',
      },
      {
        name: 'je',
        description: 'Jeudi',
        grow: '1',
        textAlign: 'right',
      },
      {
        name: 've',
        description: 'Vendredi',
        grow: '1',
        textAlign: 'right',
      },
      {
        name: 'sa',
        description: 'Samedi',
        grow: '1',
        textAlign: 'right',
      },
      {
        name: 'di',
        description: 'Dimanche',
        grow: '1',
        textAlign: 'right',
      },
    ],
    'rows': [
      {
        lu: '10.00',
        ma: '12.00',
        me: '10.00',
        je: '10.00',
        ve: '19.00',
        sa: '5.00',
        di: '100.00',
      },
      {
        lu: '120.00',
        ma: '150.00',
        je: '100.00',
        ve: '20.00',
        di: '2.00',
      },
      {
        lu: '5.00',
        ma: '50.00',
        me: '51.00',
        je: '34.00',
        ve: '7.00',
        sa: '65.00',
      },
    ],
  },
  T3: {
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
        description: 'Crésus Comptabilité PRO',
        quantity: '1',
        unit: 'pce',
        pricePerUnit: '480.00',
        finalPrice: '480.00',
      },
      {
        description: 'Crésus Facturation PRO',
        quantity: '200',
        unit: 'pce',
        pricePerUnit: '480.00',
        discount: '100.00',
        finalPrice: '95900.00',
      },
      {
        description: 'Formation compabilité mardi 10.02.2017',
        quantity: '4.5',
        unit: 'h',
        pricePerUnit: '150.00',
        finalPrice: '675.00',
      },
      {
        description: 'Dépannage ticket #30.205',
        quantity: '1',
        pricePerUnit: '100.00',
        discount: '10%',
        finalPrice: '90.00',
      },
      {
        description: 'Vis M12',
        quantity: '200',
        unit: 'pce',
        pricePerUnit: '0.30',
        finalPrice: '60.00',
      },
      {
        description:
          'Description débile super longue pour tester la mise en page lorsque le texte est très long, voilà voilà...',
        quantity: '1',
        pricePerUnit: '5.00',
        finalPrice: '5.00',
      },
      {
        description: 'Huile de coude extra-forte',
        quantity: '2.5',
        unit: 'dl',
        pricePerUnit: '10.00',
        finalPrice: '250.00',
      },
    ],
  },
  T4: {
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
        column1: 'Table basse',
        column2: '100',
        column3: '120',
        column4: '30',
      },
      {
        column1: 'Table à manger',
        column2: '200',
        column3: '330',
        column4: '70',
      },
      {
        column1: 'Lit simple',
        column2: '90',
        column3: '210',
        column4: '50',
      },
      {
        column1: 'Lit double',
        column2: '180',
        column3: '210',
        column4: '50',
      },
      {
        column1: 'Armoire simple',
        column2: '100',
        column3: '80',
        column4: '200',
      },
      {
        column1: 'Armoire double',
        column2: '200',
        column3: '80',
        column4: '200',
      },
      {
        column1: 'Armoire triple',
        column2: '280',
        column3: '80',
        column4: '200',
      },
      {
        column1: 'Chaise',
        column2: '60',
        column3: '60',
        column4: '110',
      },
    ],
  },
  T5: {
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
            column1: 'Lundi',
            column2: '8h00 – 18h30',
          },
          {
            column1: 'Mardi',
            column2: '8h00 – 18h30',
          },
          {
            column1: 'Mercredi',
            column2: '8h00 – 18h30',
          },
          {
            column1: 'Jeudi',
            column2: '8h00 – 18h30',
          },
          {
            column1: 'Vendredi',
            column2: '8h00 – 18h30',
          },
          {
            column1: 'Samedi',
            column2: '',
            rows: [
              {
                column1: 'Matin',
                column2: '8h00 – 12h00',
              },
              {
                column1: 'Après-midi',
                column2: '13h30 – 17h00',
              },
            ],
          },
          {
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
            column1: 'Janvier',
            column2: '',
          },
          {
            column1: 'Février',
            column2: 'Fermeture annuelle',
          },
          {
            column1: 'Mars',
            column2: '',
          },
          {
            column1: 'Avril',
            column2: '',
          },
          {
            column1: 'Mai',
            column2: '',
          },
          {
            column1: 'Juin',
            column2: '',
          },
          {
            column1: 'Juillet',
            column2: '',
          },
          {
            column1: 'Août',
            column2: '',
          },
          {
            column1: 'Septembre',
            column2: '',
          },
          {
            column1: 'Octobre',
            column2: '',
          },
          {
            column1: 'Novembre',
            column2: '',
          },
          {
            column1: 'Décembre',
            column2: '',
          },
        ],
      },
    ],
  },
};

/******************************************************************************/

addType('dataTable', {
  type: 'dataTable',
  defaultValue: 'T1',
  widget: 'combo',
  restrictsToList: true,
  samples: samples,
  samplesData: samplesData,
  propType: PropTypes.object,
});

addType('sortingColumns', {
  type: 'sortingColumns',
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
  propType: PropTypes.object,
});

/******************************************************************************/

export default [
  {
    name: 'data',
    group: 'main',
    type: types.dataTable,
    description: 'The data of table.',
    required: true,
  },
  {
    name: 'selectionMode',
    group: 'main',
    type: types.enum(['single', 'multi']),
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
    name: 'fontSizeStrategy',
    group: 'aspect',
    type: types.enum(['', 'decrease']),
    description: 'Only for multi-level tables.',
  },

  {
    name: 'grow',
    group: 'layout',
    type: types.grow,
  },
  {
    name: 'height',
    group: 'layout',
    type: types.size,
  },
];
