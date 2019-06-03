const types = {
  bool: {
    type: 'bool',
  },

  string: {
    type: 'string',
  },

  nabu: {
    type: 'nabu',
  },

  number: {
    type: 'number',
  },

  enum: values => ({
    type: 'enum',
    values,
  }),

  component: {
    type: 'component',
  },

  function: {
    type: 'function',
  },

  color: {
    type: 'color',
  },

  size: {
    type: 'size',
  },

  glyph: {
    type: 'glyph',
  },

  shape: {
    type: 'shape',
  },

  angle: {
    type: 'angle',
  },

  percentage: {
    type: 'percentage',
  },

  spacing: {
    type: 'spacing',
  },

  shortcut: {
    type: 'shortcut',
  },

  grow: {
    type: 'grow',
  },

  fontStyle: {
    type: 'fontStyle',
  },

  cursor: {
    type: 'cursor',
  },

  fontWeight: {
    type: 'fontWeight',
  },

  textTransform: {
    type: 'textTransform',
  },

  justify: {
    type: 'justify',
  },
  dataTable: {
    type: 'dataTable',
  },
};

//-----------------------------------------------------------------------------

const typeSamples = {
  color: [
    '',
    'base',
    'primary',
    'secondary',
    'success',
    'pick',
    'drop',
    'task',
    'white',
    'lightgrey',
    'grey',
    'black',
    'red',
    'green',
    'blue',
    'yellow',
    {text: '#d2e6f9 — light blue', value: '#d2e6f9'},
    {text: '#8ab6df — blue', value: '#8ab6df'},
    {text: '#f5ddb8 — light orange', value: '#f5ddb8'},
    {text: '#fbce89 — orange', value: '#fbce89'},
    {text: '#c6f7da — light green', value: '#c6f7da'},
    {text: '#74f7a9 — green', value: '#74f7a9'},
  ],
  glyph: [
    '',
    'solid/check',
    'solid/times',
    'solid/bicycle',
    'solid/car',
    'solid/rocket',
    'solid/calendar',
  ],
  size: [
    '',
    '0px',
    '1px',
    '2px',
    '10px',
    '20px',
    '32px',
    '50px',
    '100px',
    '200px',
    '300px',
    '500px',
  ],
  component: ['short-text', 'long-text', 'button', 'button-10'],
  function: ['alert', 'log'],
  shape: [
    '',
    'rounded',
    'left-rounded',
    'right-rounded',
    'left-smooth',
    'right-smooth',
  ],
  angle: ['', '90', '180', '270'],
  percentage: ['', '50%', '75%', '100%', '150%', '200%'],
  spacing: ['', 'overlap', 'tiny', 'large', 'double'],
  shortcut: ['', '_ctrl_+A', '_shift_+A', '_alt_+A'],
  grow: ['', '0.5', '1'],
  fontStyle: ['', 'italic', 'oblique'],
  cursor: [
    '',
    'default',
    'none',
    'pointer',
    'cell',
    'crosshair',
    'text',
    'move',
    'not-allowed',
    'ew-resize',
    'ns-resize',
    'grab',
  ],
  fontWeight: ['', 'bold', 'bolder', 'lighter'],
  textTransform: ['', 'capitalize', 'uppercase', 'lowercase'],
  justify: ['', 'start', 'center', 'end', 'around', 'between', 'none'],
  dataTable: [
    {
      text: 'Petite table',
      value: {
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
    },
    {
      text: 'Moyenne table',
      value: {
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
        header: [
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
        rows: [
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
    },
    {
      text: 'Grande table',
      value: {
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
    },
  ],
};

//-----------------------------------------------------------------------------

module.exports = {
  types,
  typeSamples,
};
