import React from 'react';
import Widget from 'laboratory/widget';
import * as Bool from '../helpers/boolean-helpers.js';

/******************************************************************************/

class Container extends Widget {
  constructor () {
    super (...arguments);
    this.panelBottoms = [];
  }

  static get wiring () {
    return {
      id: 'id',
      kind: 'kind',
      text: 'text',
      glyph: 'glyph',
    };
  }

  setKind (kind) {
    this.do ('kind', {kind});
  }

  componentWillMount () {
    const dragController = this.props.dragController;
    const dragSource = this.props.dragSource;
    const dragOwnerId = this.props.dragOwnerId;
    let count = 0;
    count += dragController ? 1 : 0;
    count += dragSource ? 1 : 0;
    count += dragOwnerId ? 1 : 0;
    if (count !== 0 && count !== 3) {
      // These 3 properties must exist all together, or none !
      console.error (
        'Container has invalid properties:' +
          ` dragController=${dragController} dragSource=${dragSource} dragOwnerId=${dragOwnerId}`
      );
    }
    if (this.props.navigationFor) {
      this.initNavigation ();
    }
  }

  componentDidMount () {
    super.componentDidMount ();

    if (this.props.navigationFor) {
      const panelElem = document.querySelectorAll (
        `[data-navigation-name="${this.props.navigationFor}"]`
      )[0];
      if (panelElem) {
        this.computePanelBottoms (panelElem);
        panelElem.addEventListener ('scroll', ::this.handleScroll, true);
      }
    }
    if (this.props.dragController) {
      if (!window.document.dragControllers) {
        window.document.dragControllers = [];
      }
      window.document.dragControllers.push (this);
    }
    if (this.props.dragParentId) {
      if (!window.document.dragParentControllers) {
        window.document.dragParentControllers = [];
      }
      window.document.dragParentControllers.push (this);
    }
    if (this.props.kind === 'flying-dialog' || this.props.kind === 'floating') {
      if (!window.document.flyingDialogs) {
        window.document.flyingDialogs = [];
      }
      window.document.flyingDialogs.push (this);
    }
    if (this.props.viewId) {
      if (!window.document.viewIds) {
        window.document.viewIds = [];
      }
      window.document.viewIds.push (this);
    }
  }

  componentWillUnmount () {
    if (this.props.navigationFor) {
      const panelElem = document.querySelectorAll (
        `[data-navigation-name="${this.props.navigationFor}"]`
      )[0];
      if (panelElem) {
        panelElem.removeEventListener ('scroll', this.handleScroll, true);
      }
    }
    if (this.props.dragController && window.document.dragControllers) {
      const index = window.document.dragControllers.indexOf (this);
      if (index !== -1) {
        window.document.dragControllers.splice (index, 1);
      }
    }
    if (this.props.dragParentId && window.document.dragParentControllers) {
      const index = window.document.dragParentControllers.indexOf (this);
      if (index !== -1) {
        window.document.dragParentControllers.splice (index, 1);
      }
    }
    if (
      (this.props.kind === 'flying-dialog' || this.props.kind === 'floating') &&
      window.document.flyingDialogs
    ) {
      const index = window.document.flyingDialogs.indexOf (this);
      if (index !== -1) {
        window.document.flyingDialogs.splice (index, 1);
      }
    }
    if (this.props.viewId) {
      const index = window.document.viewIds.indexOf (this);
      if (index !== -1) {
        window.document.viewIds.splice (index, 1);
      }
    }
  }

  // Compute all cumulative bottom positions of panels.
  computePanelBottoms (panelElem) {
    this.panelBottoms = [];
    const children = [].slice.call (panelElem.children);
    var first = -1;
    children.forEach (c => {
      if (first === -1) {
        first = c.offsetTop;
      } else {
        this.panelBottoms.push (c.offsetTop - first - c.offsetHeight / 2);
      }
    });
    this.panelBottoms.push (1000000);
  }

  // Return the index of the top panel, according to scroll position.
  getPanelIndex (scrollTop, scrollMax) {
    if (scrollTop >= scrollMax - 4) {
      // 4 = chouia for mouse wheel
      // If scroller is on bottom, return the last index.
      return this.panelBottoms.length - 1;
    } else {
      for (var i = 0; i < this.panelBottoms.length; i++) {
        if (scrollTop < this.panelBottoms[i]) {
          return i;
        }
      }
      return -1;
    }
  }

  setNavigation (index) {
    // FIXME: what's the purpose of this? It's not used...
    const children = React.Children.map (this.props.children, (child, i) => {
      const active = {
        active: Bool.toString (i === index),
      };
      return React.cloneElement (child, active);
    });
  }

  initNavigation () {
    this.setNavigation (0);
  }

  handleScroll (e) {
    const max = e.target.scrollHeight - e.target.offsetHeight;
    const index = this.getPanelIndex (e.target.scrollTop, max);
    this.setNavigation (index);
  }

  render () {
    const {disabled, kind, anchor, show, index} = this.props;
    const navName = this.props.navigation - name;

    const boxClass = this.styles.classNames.box;
    const triangleClass = this.styles.classNames.triangle;

    if (Bool.isFalse (show)) {
      return null;
    } else if (
      kind === 'flying-combo' ||
      kind === 'flying-balloon' ||
      kind === 'flying-chat' ||
      kind === 'flying-dialog' ||
      kind === 'flying-task-menu'
    ) {
      return (
        <div key={index} disabled={disabled} className={boxClass} id={anchor}>
          <div className={triangleClass} />
          {this.props.children}
        </div>
      );
    } else {
      return (
        <div
          key={index}
          disabled={disabled}
          className={boxClass}
          id={anchor}
          data-navigation-name={navName}
        >
          {this.props.children}
        </div>
      );
    }
  }
}

/******************************************************************************/
export default Container;
