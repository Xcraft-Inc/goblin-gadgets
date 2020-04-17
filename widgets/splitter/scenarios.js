import React from 'react';
import Button from '../button/widget';

export default [
  {
    name: 'vertical %',
    props: {
      kind: 'vertical',
      firstSize: '50%',
      firstMinSize: '10%',
      lastMinSize: '10%',
      children: (
        <React.Fragment>
          <Button width="100px" height="100px" text="Left" />
          <Button width="100px" height="100px" text="Right" />
        </React.Fragment>
      ),
    },
  },
  {
    name: 'vertical px',
    props: {
      kind: 'vertical',
      firstSize: '120px',
      firstMinSize: '10px',
      lastMinSize: '10px',
      children: (
        <React.Fragment>
          <Button width="100px" height="100px" text="Left" />
          <Button width="100px" height="100px" text="Right" />
        </React.Fragment>
      ),
    },
  },
  {
    name: 'horizontal %',
    props: {
      kind: 'horizontal',
      firstSize: '50%',
      firstMinSize: '10%',
      lastMinSize: '10%',
      children: (
        <React.Fragment>
          <Button width="100px" height="100px" text="Top" />
          <Button width="100px" height="100px" text="Bottom" />
        </React.Fragment>
      ),
    },
  },
  {
    name: 'horizontal px',
    props: {
      kind: 'horizontal',
      firstSize: '120px',
      firstMinSize: '10px',
      lastMinSize: '10px',
      children: (
        <React.Fragment>
          <Button width="100px" height="100px" text="Top" />
          <Button width="100px" height="100px" text="Bottom" />
        </React.Fragment>
      ),
    },
  },
];
