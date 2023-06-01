import {types, addType} from 'goblin-gadgets/types/types.js';
import {object} from 'xcraft-core-stones';
import {propsList} from '../../types/props-list.js';

const samples = [{value: 'T1', text: 'Petite table'}];

const samplesData = {
  T1: {
    header: [
      {
        name: 'description',
        description: 'Description',
        grow: '1',
        textAlign: 'left',
      },
      {
        name: 'quantity',
        description: 'Quantité',
        width: '100px',
        textAlign: 'right',
        indent: 'space',
      },
    ],
    rows: [
      {
        id: 'City',
        description: 'City bike Imperator homme XL',
        quantity: '51',
        rows: [
          {
            id: 'City.cadre',
            description: 'Cadre alu B-5',
            quantity: '1',
            rows: [
              {
                id: 'City.cadre.tube',
                description: 'Tube alu',
                quantity: '7',
              },
              {
                id: 'City.cadre.roulement',
                description: 'Roulement à bille',
                quantity: '4',
              },
            ],
          },
          {
            id: 'City.roue',
            description: 'Roue standard 26"',
            quantity: '2',
            rows: [
              {
                id: 'City.roue.jante',
                description: 'Jante alu 26" G.1402',
                quantity: '1',
              },
              {
                id: 'City.roue.rayon',
                description: 'Rayon acier',
                quantity: '24',
              },
              {
                id: 'City.roue.pneu',
                description: 'Pneu tout temps',
                quantity: '1',
              },
            ],
          },
          {
            id: 'City.pedalier',
            description: 'Pédalier Shimano RT 8 vitesses',
            quantity: '1',
            rows: [
              {
                id: 'City.pedalier.manivelle',
                description: 'Manivelle',
                quantity: '2',
              },
              {
                id: 'City.pedalier.pedalegauche',
                description: 'Pédale gauche',
                quantity: '1',
              },
              {
                id: 'City.pedalier.pedaledroite',
                description: 'Pédale droite',
                quantity: '1',
              },
            ],
          },
        ],
      },
      {
        id: 'VTT',
        description: 'VTT Specialized S-Works Epic 29',
        quantity: '14',
        rows: [
          {
            id: 'VTT.cadre',
            description: 'Cadre carbone RT-12',
            quantity: '1',
          },
          {
            id: 'VTT.roue',
            description: 'Roue 29"',
            quantity: '2',
            rows: [
              {
                id: 'VTT.roue.jante',
                description: 'Jante Roval Control SL 29"',
                quantity: '1',
              },
              {
                id: 'VTT.roue.pneu',
                description: 'Pneu Ground Control All Grid',
                quantity: '1',
              },
              {
                id: 'VTT.roue.long',
                description:
                  "Maître Corbeau, sur un arbre perché, Tenait en son bec un fromage. Maître Renard, par l'odeur alléché, Lui tint à peu près ce langage : Et bonjour, Monsieur du Corbeau. Que vous êtes joli ! que vous me semblez beau ! Sans mentir, si votre ramage Se rapporte à votre plumage, Vous êtes le Phénix des hôtes de ces bois. À ces mots, le Corbeau ne se sent pas de joie ; Et pour montrer sa belle voix, Il ouvre un large bec, laisse tomber sa proie. Le Renard s'en saisit, et dit : Mon bon Monsieur, Apprenez que tout flatteur Vit aux dépens de celui qui l'écoute. Cette leçon vaut bien un fromage, sans doute. Le Corbeau honteux et confus Jura, mais un peu tard, qu'on ne l'y prendrait plus.",
                quantity: '1',
                rows: [
                  {
                    id: 'VTT.roue.long.debile',
                    description: "C'était juste un texte débile pour tester !",
                    quantity: '1',
                  },
                ],
              },
            ],
          },
          {
            id: 'VTT.pedalier',
            description: 'Pédalier Shimano XTR 11 vitesses, 11-40t',
            quantity: '1',
          },
        ],
      },
      {
        id: 'Cargo',
        description: 'Cargo bike Kango-R',
        quantity: '2',
        rows: [
          {
            id: 'Cargo.cadre',
            description: 'Plateforme alu D-2',
            quantity: '1',
          },
          {
            id: 'Cargo.roue1',
            description: 'Roue 15"',
            quantity: '1',
          },
          {
            id: 'Cargo.roue2',
            description: 'Roue 21"',
            quantity: '1',
          },
          {
            id: 'Cargo.pedalier',
            description: 'Pédalier Shimano XT 11 vitesses',
            quantity: '1',
          },
        ],
      },
    ],
  },
};

/******************************************************************************/

addType('dataTree', {
  type: object,
  defaultValue: 'T1',
  widget: 'combo',
  restrictsToList: true,
  samples: samples,
  samplesData: samplesData,
});

/******************************************************************************/

export default [
  // Main.
  {
    name: 'data',
    group: 'main',
    type: types.dataTree,
    description: 'The data of tree.',
  },
  {
    name: 'selectionMode',
    group: 'main',
    type: types.enum(['none', 'single', 'multi']),
  },
  {
    name: 'selection',
    group: 'aspect',
    type: types.bool,
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
    name: 'onClick',
    group: 'function',
    type: types.function,
  },
  {
    name: 'selectionChanged',
    group: 'function',
    type: types.function,
  },
];
