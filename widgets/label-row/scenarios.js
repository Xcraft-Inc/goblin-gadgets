import React from 'react';
import TextInputNC from '../text-input-nc/widget';

export default [
  {
    name: 'field',
    props: {
      labelText: 'Nom du client',
      children: <TextInputNC grow="1" value="Jean Dupond" />,
    },
  },
  {
    name: 'fields',
    props: {
      labelText: 'NPA | Ville',
      children: (
        <React.Fragment>
          <TextInputNC width="100px" value="1000" spacing="overlap" />
          <TextInputNC grow="1" value="Lausanne" />
        </React.Fragment>
      ),
    },
  },
  {
    name: 'field-multiline',
    props: {
      labelText: 'Description',
      children: (
        <TextInputNC
          grow="1"
          rows="8"
          value="Un jeune vieillard, assis debout sur un mur de pierre en bois, lisait un journal plié en quatre dans sa poche, à la lueur d'une bougie éteinte."
        />
      ),
    },
  },
  {
    name: 'empty',
    props: {},
  },
];
