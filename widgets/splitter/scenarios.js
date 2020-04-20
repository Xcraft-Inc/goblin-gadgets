import React from 'react';
import Button from '../button/widget';

export default [
  {
    name: 'V%',
    props: {
      kind: 'vertical',
      firstSize: {type: 'percentage', value: '40%'},
      lastSize: {type: 'percentage'},
      firstMinSize: {type: 'percentage', value: '10%'},
      lastMinSize: {type: 'percentage', value: '10%'},
      firstMaxSize: {type: 'percentage'},
      lastMaxSize: {type: 'percentage'},
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
      firstSize: {type: 'percentage'},
      lastSize: {type: 'percentage', value: '40%'},
      firstMinSize: {type: 'percentage', value: '10%'},
      lastMinSize: {type: 'percentage', value: '10%'},
      firstMaxSize: {type: 'percentage'},
      lastMaxSize: {type: 'percentage'},
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
      firstSize: {type: 'size', value: '120px'},
      lastSize: {type: 'size'},
      firstMinSize: {type: 'size', value: '10px'},
      lastMinSize: {type: 'size', value: '10px'},
      firstMaxSize: {type: 'size'},
      lastMaxSize: {type: 'size'},
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
      firstSize: {type: 'size'},
      lastSize: {type: 'size', value: '120px'},
      firstMinSize: {type: 'size', value: '10px'},
      lastMinSize: {type: 'size', value: '10px'},
      firstMaxSize: {type: 'size'},
      lastMaxSize: {type: 'size'},
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
      firstSize: {type: 'percentage', value: '40%'},
      lastSize: {type: 'percentage'},
      firstMinSize: {type: 'percentage', value: '10%'},
      lastMinSize: {type: 'percentage', value: '10%'},
      firstMaxSize: {type: 'percentage'},
      lastMaxSize: {type: 'percentage'},
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
      firstSize: {type: 'percentage'},
      lastSize: {type: 'percentage', value: '40%'},
      firstMinSize: {type: 'percentage', value: '10%'},
      lastMinSize: {type: 'percentage', value: '10%'},
      firstMaxSize: {type: 'percentage'},
      lastMaxSize: {type: 'percentage'},
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
      firstSize: {type: 'size', value: '120px'},
      lastSize: {type: 'size'},
      firstMinSize: {type: 'size', value: '10px'},
      lastMinSize: {type: 'size', value: '10px'},
      firstMaxSize: {type: 'size'},
      lastMaxSize: {type: 'size'},
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
      firstSize: {type: 'size'},
      lastSize: {type: 'size', value: '120px'},
      firstMinSize: {type: 'size', value: '10px'},
      lastMinSize: {type: 'size', value: '10px'},
      firstMaxSize: {type: 'size'},
      lastMaxSize: {type: 'size'},
      children: (
        <React.Fragment>
          <Button width="100px" height="100px" text="" />
          <Button width="100px" height="100px" text="120px" />
        </React.Fragment>
      ),
    },
  },
];
