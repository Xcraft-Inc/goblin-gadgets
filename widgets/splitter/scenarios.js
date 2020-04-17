import React from 'react';
import Button from '../button/widget';

export default [
  {
    name: 'V%',
    props: {
      kind: 'vertical',
      firstSize: '40%',
      firstMinSize: '10%',
      lastMinSize: '10%',
      children: (
        <React.Fragment>
          <Button width="100px" height="100px" text="40%" />
          <Button width="100px" height="100px" text="" />
        </React.Fragment>
      ),
    },
  },
  {
    name: 'V%',
    props: {
      kind: 'vertical',
      lastSize: '40%',
      firstMinSize: '10%',
      lastMinSize: '10%',
      children: (
        <React.Fragment>
          <Button width="100px" height="100px" text="" />
          <Button width="100px" height="100px" text="40%" />
        </React.Fragment>
      ),
    },
  },
  {
    name: 'Vpx',
    props: {
      kind: 'vertical',
      firstSize: '120px',
      firstMinSize: '10px',
      lastMinSize: '10px',
      children: (
        <React.Fragment>
          <Button width="100px" height="100px" text="120px" />
          <Button width="100px" height="100px" text="" />
        </React.Fragment>
      ),
    },
  },
  {
    name: 'Vpx',
    props: {
      kind: 'vertical',
      lastSize: '120px',
      firstMinSize: '10px',
      lastMinSize: '10px',
      children: (
        <React.Fragment>
          <Button width="100px" height="100px" text="" />
          <Button width="100px" height="100px" text="120px" />
        </React.Fragment>
      ),
    },
  },
  {
    name: 'H%',
    props: {
      kind: 'horizontal',
      firstSize: '40%',
      firstMinSize: '10%',
      lastMinSize: '10%',
      children: (
        <React.Fragment>
          <Button width="100px" height="100px" text="40%" />
          <Button width="100px" height="100px" text="" />
        </React.Fragment>
      ),
    },
  },
  {
    name: 'H%',
    props: {
      kind: 'horizontal',
      lastSize: '40%',
      firstMinSize: '10%',
      lastMinSize: '10%',
      children: (
        <React.Fragment>
          <Button width="100px" height="100px" text="" />
          <Button width="100px" height="100px" text="40%" />
        </React.Fragment>
      ),
    },
  },
  {
    name: 'Hpx',
    props: {
      kind: 'horizontal',
      firstSize: '120px',
      firstMinSize: '10px',
      lastMinSize: '10px',
      children: (
        <React.Fragment>
          <Button width="100px" height="100px" text="120px" />
          <Button width="100px" height="100px" text="" />
        </React.Fragment>
      ),
    },
  },
  {
    name: 'Hpx',
    props: {
      kind: 'horizontal',
      lastSize: '120px',
      firstMinSize: '10px',
      lastMinSize: '10px',
      children: (
        <React.Fragment>
          <Button width="100px" height="100px" text="" />
          <Button width="100px" height="100px" text="120px" />
        </React.Fragment>
      ),
    },
  },
];
