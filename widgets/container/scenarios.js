import React from 'react';
import Button from '../button/widget';

export default [
  {
    name: 'square',
    props: {
      width: '200px',
      height: '200px',
      backgroundColor: '#def',
    },
  },
  {
    name: 'row',
    props: {
      kind: 'row',
      backgroundColor: '#def',
      children: (
        <React.Fragment>
          <Button width="100px" text="A" />
          <Button width="100px" text="B" />
          <Button width="100px" text="C" />
          <Button width="100px" text="D" />
        </React.Fragment>
      ),
    },
  },
  {
    name: 'column',
    props: {
      kind: 'column',
      backgroundColor: '#def',
      children: (
        <React.Fragment>
          <Button width="100px" text="A" />
          <Button width="100px" text="B" />
          <Button width="100px" text="C" />
          <Button width="100px" text="D" />
        </React.Fragment>
      ),
    },
  },
  {
    name: 'empty',
    props: {},
  },
];
