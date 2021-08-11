import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';

import boxBack from 'goblin-gadgets/assets/box-back.png';
import boxFront from 'goblin-gadgets/assets/box-front.png';

/******************************************************************************/

class WellDone extends Widget {
  constructor() {
    super(...arguments);
    this.state = {frontLoaded: false, backLoaded: false};
    this.onFrontLoad = this.onFrontLoad.bind(this);
    this.onBackLoad = this.onBackLoad.bind(this);
  }

  getCircleStyle(translateY, animationTime, animationDelay, index, sheet) {
    const size = Math.floor(Math.random() * 20 + 5);
    //const size = Math.floor(Math.random() * 15 + 5);
    const width = `${size}px`;
    const height = `${size}px`;

    var colors = ['#2681cb', '#469f18', '#cd6f00']; // Official colors for Crésus modules
    const i = Math.floor(Math.random() * 3);
    const background = colors[i];

    //const positionX = Math.floor(Math.random() * 150 + 60); // 60..210
    const positionX = Math.floor(Math.random() * 110 + 80); // 80..190

    const translateX = Math.floor(Math.random() * 500 - 100);
    const rotationY = Math.floor(Math.random() * 180 + 90);

    const frameXName = 'xAxis' + index;
    //let rule = `@keyframes ${frameXName}{ 20%{opacity:1;} 100%{ transform: translateX(${translateX}px) rotateY(${rotationY}deg); opacity:0; }} `;
    let rule = `@keyframes ${frameXName}{ 100%{ transform: translateX(${translateX}px) rotateY(${rotationY}deg) scale(0); }} `;
    sheet.insertRule(rule, 2);

    const frameYName = 'yAxis' + index;
    rule = `@keyframes ${frameYName}{ 100%{ transform: translateY(${translateY}px) ; animation-timing-function: ease-in; }} `;
    sheet.insertRule(rule, 2);

    const animation = `${frameXName} ${animationTime} linear infinite`;

    return {
      position: 'absolute',
      borderRadius: '50%',
      width,
      height,
      background,
      transform: `translateX(${positionX}px)`,
      transformOrigin: 'center',
      animation,
      animationDelay,
    };
  }

  getContainerStyle(translateY, animationTime, animationDelay, index) {
    const positionY = Math.floor(Math.random() * 100 + 15);
    const transform = `translateY(${positionY}px)`;
    const frameYName = 'yAxis' + index;
    const animation = `${frameYName} ${animationTime} infinite`;

    return {
      position: 'absolute',
      left: '40%',
      top: '50%',
      transform,
      animation,
      animationDelay,
    };
  }

  /******************************************************************************/

  renderConfetti(sheet, index) {
    const translateY = Math.floor(Math.random() * 300 + 100) * -1;
    //const translateY = Math.floor(Math.random() * 430 + 170) * -1;
    //const translateY = Math.floor(Math.random() * 170 + 530) * -1;
    const animationTime = `${(Math.abs(translateY) * 1.5) / 600 + 1}s`;
    const animationDelay = `${Math.random() * 3 + 0.2}s`;

    const circleStyle = this.getCircleStyle(
      translateY,
      animationTime,
      animationDelay,
      index,
      sheet
    );

    const containerStyle = this.getContainerStyle(
      translateY,
      animationTime,
      animationDelay,
      index
    );

    return (
      <div key={index} style={containerStyle}>
        <div style={circleStyle} />
      </div>
    );
  }

  renderConfettis() {
    const sheet = document.styleSheets[0];

    const result = [];
    for (let i = 0; i < 300; i++) {
      result.push(this.renderConfetti(sheet, i));
    }
    return result;
  }

  renderBoxBack(hidden) {
    const style = {
      position: 'absolute',
      left: '40%',
      top: '50%',
      width: '300px',
      visibility: hidden ? 'hidden' : 'visible',
    };

    return <img onLoad={this.onBackLoad} style={style} src={boxBack} alt="" />;
  }

  renderBoxFront(hidden) {
    const style = {
      position: 'absolute',
      left: '40%',
      top: '50%',
      width: '300px',
      visibility: hidden ? 'hidden' : 'visible',
    };

    return (
      <img onLoad={this.onFrontLoad} style={style} src={boxFront} alt="" />
    );
  }

  render() {
    if (this.state.frontLoaded && this.state.backLoaded) {
      return (
        <div>
          {this.renderBoxBack()}
          {this.renderConfettis()}
          {this.renderBoxFront()}
        </div>
      );
    } else {
      return (
        <div>
          {this.renderBoxBack(true)}
          {this.renderBoxFront(true)}
        </div>
      );
    }
  }

  onFrontLoad() {
    this.setState({frontLoaded: true});
  }

  onBackLoad() {
    this.setState({backLoaded: true});
  }
}

/******************************************************************************/

export default WellDone;
