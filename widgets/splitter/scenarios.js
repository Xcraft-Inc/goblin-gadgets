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
        <>
          <Container width="100%" height="100%" backgroundColor="aliceblue">
            <Label text="40%" />
          </Container>
          <Container width="100%" height="100%" backgroundColor="lemonchiffon">
            <Label text="" />
          </Container>
        </>
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
        <>
          <Container width="100%" height="100%" backgroundColor="aliceblue">
            <Label text="" />
          </Container>
          <Container width="100%" height="100%" backgroundColor="lemonchiffon">
            <Label text="40%" />
          </Container>
        </>
      ),
    },
  },
  {
    name: 'Vpx',
    props: {
      kind: 'vertical',
      firstSize: {type: 'pixel', value: '120px'},
      lastSize: {type: 'pixel'},
      firstMinSize: {type: 'pixel', value: '10px'},
      lastMinSize: {type: 'pixel', value: '10px'},
      firstMaxSize: {type: 'pixel'},
      lastMaxSize: {type: 'pixel'},
      children: (
        <>
          <Container width="100%" height="100%" backgroundColor="aliceblue">
            <Label text="120px" />
          </Container>
          <Container width="100%" height="100%" backgroundColor="lemonchiffon">
            <Label text="" />
          </Container>
        </>
      ),
    },
  },
  {
    name: 'Vpx',
    props: {
      kind: 'vertical',
      firstSize: {type: 'pixel'},
      lastSize: {type: 'pixel', value: '120px'},
      firstMinSize: {type: 'pixel', value: '10px'},
      lastMinSize: {type: 'pixel', value: '10px'},
      firstMaxSize: {type: 'pixel'},
      lastMaxSize: {type: 'pixel'},
      children: (
        <>
          <Container width="100%" height="100%" backgroundColor="aliceblue">
            <Label text="" />
          </Container>
          <Container width="100%" height="100%" backgroundColor="lemonchiffon">
            <Label text="120px" />
          </Container>
        </>
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
        <>
          <Container width="100%" height="100%" backgroundColor="aliceblue">
            <Label text="40%" />
          </Container>
          <Container width="100%" height="100%" backgroundColor="lemonchiffon">
            <Label text="" />
          </Container>
        </>
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
        <>
          <Container width="100%" height="100%" backgroundColor="aliceblue">
            <Label text="" />
          </Container>
          <Container width="100%" height="100%" backgroundColor="lemonchiffon">
            <Label text="40%" />
          </Container>
        </>
      ),
    },
  },
  {
    name: 'Hpx',
    props: {
      kind: 'horizontal',
      firstSize: {type: 'pixel', value: '120px'},
      lastSize: {type: 'pixel'},
      firstMinSize: {type: 'pixel', value: '10px'},
      lastMinSize: {type: 'pixel', value: '10px'},
      firstMaxSize: {type: 'pixel'},
      lastMaxSize: {type: 'pixel'},
      children: (
        <>
          <Container width="100%" height="100%" backgroundColor="aliceblue">
            <Label text="120px" />
          </Container>
          <Container width="100%" height="100%" backgroundColor="lemonchiffon">
            <Label text="" />
          </Container>
        </>
      ),
    },
  },
  {
    name: 'Hpx',
    props: {
      kind: 'horizontal',
      firstSize: {type: 'pixel'},
      lastSize: {type: 'pixel', value: '120px'},
      firstMinSize: {type: 'pixel', value: '10px'},
      lastMinSize: {type: 'pixel', value: '10px'},
      firstMaxSize: {type: 'pixel'},
      lastMaxSize: {type: 'pixel'},
      children: (
        <>
          <Container width="100%" height="100%" backgroundColor="aliceblue">
            <Label text="" />
          </Container>
          <Container width="100%" height="100%" backgroundColor="lemonchiffon">
            <Label text="120px" />
          </Container>
        </>
      ),
    },
  },
];
