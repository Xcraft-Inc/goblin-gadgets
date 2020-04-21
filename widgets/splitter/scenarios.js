import React from 'react';
import Container from '../container/widget';
import Label from '../label/widget';

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
          <Container width="100%" height="100%" backgroundColor="aliceblue">
            <Label text="40%" />
          </Container>
          <Container width="100%" height="100%" backgroundColor="lemonchiffon">
            <Label text="" />
          </Container>
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
          <Container width="100%" height="100%" backgroundColor="aliceblue">
            <Label text="" />
          </Container>
          <Container width="100%" height="100%" backgroundColor="lemonchiffon">
            <Label text="40%" />
          </Container>
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
          <Container width="100%" height="100%" backgroundColor="aliceblue">
            <Label text="120px" />
          </Container>
          <Container width="100%" height="100%" backgroundColor="lemonchiffon">
            <Label text="" />
          </Container>
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
          <Container width="100%" height="100%" backgroundColor="aliceblue">
            <Label text="" />
          </Container>
          <Container width="100%" height="100%" backgroundColor="lemonchiffon">
            <Label text="120px" />
          </Container>
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
          <Container width="100%" height="100%" backgroundColor="aliceblue">
            <Label text="40%" />
          </Container>
          <Container width="100%" height="100%" backgroundColor="lemonchiffon">
            <Label text="" />
          </Container>
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
          <Container width="100%" height="100%" backgroundColor="aliceblue">
            <Label text="" />
          </Container>
          <Container width="100%" height="100%" backgroundColor="lemonchiffon">
            <Label text="40%" />
          </Container>
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
          <Container width="100%" height="100%" backgroundColor="aliceblue">
            <Label text="120px" />
          </Container>
          <Container width="100%" height="100%" backgroundColor="lemonchiffon">
            <Label text="" />
          </Container>
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
          <Container width="100%" height="100%" backgroundColor="aliceblue">
            <Label text="" />
          </Container>
          <Container width="100%" height="100%" backgroundColor="lemonchiffon">
            <Label text="120px" />
          </Container>
        </React.Fragment>
      ),
    },
  },
];
