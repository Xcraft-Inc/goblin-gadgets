import React from 'react';
import Container from '../container/widget';
import Label from '../label/widget';

export default [
  {
    name: 'V%',
    props: {
      kind: 'vertical',
      firstSize: '40%',
      firstMinSize: '10%',
      lastMinSize: '10%',
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
      lastSize: '40%',
      firstMinSize: '10%',
      lastMinSize: '10%',
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
      firstSize: '120px',
      firstMinSize: '10px',
      lastMinSize: '10px',
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
      lastSize: '120px',
      firstMinSize: '10px',
      lastMinSize: '10px',
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
      firstSize: '40%',
      firstMinSize: '10%',
      lastMinSize: '10%',
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
      lastSize: '40%',
      firstMinSize: '10%',
      lastMinSize: '10%',
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
      firstSize: '120px',
      firstMinSize: '10px',
      lastMinSize: '10px',
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
      lastSize: '120px',
      firstMinSize: '10px',
      lastMinSize: '10px',
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
