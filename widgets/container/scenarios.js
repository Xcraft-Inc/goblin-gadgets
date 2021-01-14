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
        <>
          <Button key="A" width="100px" text="A" />
          <Button key="B" width="100px" text="B" />
          <Button key="C" width="100px" text="C" />
          <Button key="D" width="100px" text="D" />
        </>
      ),
    },
  },
  {
    name: 'column',
    props: {
      kind: 'column',
      backgroundColor: '#def',
      children: (
        <>
          <Button key="A" width="100px" text="A" />
          <Button key="B" width="100px" text="B" />
          <Button key="C" width="100px" text="C" />
          <Button key="D" width="100px" text="D" />
        </>
      ),
    },
  },
  {
    name: 'empty',
    props: {},
  },
];
