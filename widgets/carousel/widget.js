import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import * as styles from './styles';
import {Unit} from 'electrum-theme';

import CarouselButton from '../carousel-button/widget';
import CarouselBullet from '../carousel-bullet/widget';

/******************************************************************************/

export default class Carousel extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.state = {
      innerWidth: this.maxWidth,
      position: 0,
      mouseMove: 0,
    };

    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleBulletClicked = this.handleBulletClicked.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  //#region get/set
  get innerWidth() {
    return this.state.innerWidth;
  }

  set innerWidth(value) {
    this.setState({
      innerWidth: value,
    });
  }

  get position() {
    return this.state.position;
  }

  set position(value) {
    this.setState({
      position: value,
    });
  }

  get mouseMove() {
    return this.state.mouseMove;
  }

  set mouseMove(value) {
    this.setState({
      mouseMove: value,
    });
  }
  //#endregion

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  /******************************************************************************/

  get maxWidth() {
    return Unit.parse(this.props.maxWidth).value;
  }

  get itemWidth() {
    return Unit.parse(this.props.itemWidth).value;
  }

  get carouselWidth() {
    const width = Math.min(this.innerWidth, this.maxWidth);
    return Math.floor(width / this.itemWidth) * this.itemWidth;
  }

  get pagesCount() {
    const visibleCount = Math.ceil(this.carouselWidth / this.itemWidth);
    return this.props.children.length - (visibleCount - 1);
  }

  get pageSelected() {
    const p = Math.floor(
      (this.position + this.mouseMove + this.itemWidth / 2) / this.itemWidth
    );

    return Math.min(Math.max(p, 0), this.pagesCount - 1);
  }

  get minPosition() {
    return 0;
  }

  get maxPosition() {
    return (this.pagesCount - 1) * this.itemWidth;
  }

  get leftPosition() {
    let position = this.position + this.mouseMove;

    const min = this.minPosition;
    const max = this.maxPosition;

    const force = this.props.forceRequiredToOverflow || 10; // 2..n

    if (position < min) {
      position = min - (min - position) / force;
    }

    if (position > max) {
      position = max + (position - max) / force;
    }

    return -position;
  }

  /******************************************************************************/

  handleResize(e) {
    const elementH = document.getElementById('courses-header');
    const width = elementH.getBoundingClientRect().width;
    console.log(`onResize ${width}`);
    this.innerWidth = width;
  }

  handlePrev() {
    if (this.props.cycling === 'loop' && this.position === this.minPosition) {
      this.position = this.maxPosition;
    } else {
      this.position -= this.itemWidth;
    }
  }

  handleNext() {
    if (this.props.cycling === 'loop' && this.position === this.maxPosition) {
      this.position = this.minPosition;
    } else {
      this.position += this.itemWidth;
    }
  }

  handleBulletClicked(index) {
    this.position = this.itemWidth * index;
  }

  handleMouseOver(e) {
    console.log('handleMouseOver');
  }

  handleMouseDown(e) {
    console.log('handleMouseDown');
    this.mouseX = e.clientX;
    this.mouseMove = 0;
    this.mouseDown = true;
  }

  handleMouseMove(e) {
    console.log('handleMouseMove');
    if (this.mouseDown) {
      this.mouseMove = this.mouseX - e.clientX;
    } else {
      //
    }
  }

  handleMouseUp(e) {
    console.log('handleMouseUp');
    const dx =
      Math.floor((this.mouseMove + this.itemWidth / 2) / this.itemWidth) *
      this.itemWidth;
    const position = this.position + dx;

    this.position = Math.min(
      Math.max(position, this.minPosition),
      this.maxPosition
    );

    this.mouseMove = 0;
    this.mouseDown = false;
  }

  handleMouseOut(e) {
    console.log('handleMouseOut');
    if (this.mouseDown) {
      this.handleMouseUp(e);
    }
  }

  /******************************************************************************/

  // TODO: This layout capture the events, and hide it for buttons of modules!
  renderTouchLayer() {
    return (
      <div
        className={this.styles.classNames.touchLayer}
        onMouseOver={this.handleMouseOver}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onMouseOut={this.handleMouseOut}
      />
    );
  }

  renderBullet(selected, index) {
    return (
      <CarouselBullet
        key={index}
        selected={selected}
        onClick={() => this.handleBulletClicked(index)}
      />
    );
  }

  renderBullets(pagesCount) {
    const pageSelected = this.pageSelected;

    const result = [];
    for (let index = 0; index < pagesCount; index++) {
      const selected = pageSelected === index;
      result.push(this.renderBullet(selected, index));
    }
    return result;
  }

  renderNavigator() {
    if (this.props.navigator !== 'bullets') {
      return null;
    }

    const pagesCount = this.pagesCount;
    if (pagesCount <= 1) {
      return null;
    }

    return (
      <div className={this.styles.classNames.navigator}>
        {this.renderBullets(pagesCount)}
      </div>
    );
  }

  renderButtonPrev() {
    const enabled =
      this.props.cycling === 'loop' ||
      (this.pagesCount > 1 && this.pageSelected > 0);

    return (
      <div className={this.styles.classNames.buttonPrev}>
        <CarouselButton
          kind="left"
          disabled={!enabled}
          onClick={this.handlePrev}
        />
      </div>
    );
  }

  renderButtonNext() {
    const enabled =
      this.props.cycling === 'loop' ||
      (this.pagesCount > 1 && this.pageSelected < this.pagesCount - 1);

    return (
      <div className={this.styles.classNames.buttonNext}>
        <CarouselButton
          kind="right"
          disabled={!enabled}
          onClick={this.handleNext}
        />
      </div>
    );
  }

  renderPages() {
    const bandStyle = {
      left: this.leftPosition + 'px',
    };

    return (
      <div className={this.styles.classNames.horizontalBand} style={bandStyle}>
        {this.props.children}
      </div>
    );
  }

  render() {
    const carouselStyle = {
      maxWidth: this.carouselWidth + 'px',
    };

    return (
      <div className={this.styles.classNames.carousel} style={carouselStyle}>
        {this.renderPages()}
        {this.renderTouchLayer()}
        {this.renderNavigator()}
        {this.renderButtonPrev()}
        {this.renderButtonNext()}
      </div>
    );
  }
}

/******************************************************************************/
