import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import withC from 'goblin-laboratory/widgets/connect-helpers/with-c';
import AnimatedContainer from 'goblin-gadgets/widgets/animated-container/widget';

/******************************************************************************/

const animationPairs = {
  open: {
    rightToLeft: {
      last: 'rightToCenter', // new
      beforeLast: 'centerToLeft', // old
    },
    leftToRight: {
      last: 'leftToCenter',
      beforeLast: 'centerToRight',
    },
    topToBottom: {
      last: 'topToCenter',
      beforeLast: 'centerToBottom',
    },
    bottomToTop: {
      last: 'bottomToCenter',
      beforeLast: 'centerToTop',
    },

    zoom: {
      last: 'zoomIn',
      beforeLast: 'none',
    },
    zoomX: {
      last: 'zoomInX',
      beforeLast: 'none',
    },
    zoomY: {
      last: 'zoomInY',
      beforeLast: 'none',
    },

    fade: {
      last: 'fadeIn',
      beforeLast: 'none',
    },
  },

  back: {
    leftToRight: {
      last: 'centerToRight', // old
      beforeLast: 'leftToCenter', // new
    },
    rightToLeft: {
      last: 'centerToLeft',
      beforeLast: 'rightToCenter',
    },
    bottomToTop: {
      last: 'centerToTop',
      beforeLast: 'bottomToCenter',
    },
    topToBottom: {
      last: 'centerToBottom',
      beforeLast: 'topToCenter',
    },

    zoom: {
      last: 'zoomOut',
      beforeLast: 'none',
    },
    zoomX: {
      last: 'zoomOutX',
      beforeLast: 'none',
    },
    zoomY: {
      last: 'zoomOutY',
      beforeLast: 'none',
    },

    fade: {
      last: 'fadeOut',
      beforeLast: 'none',
    },
  },

  replace: null, // set below
};

animationPairs.replace = animationPairs.open;

/******************************************************************************/

class StackNavigationWidget extends Widget {
  constructor() {
    super(...arguments);
    this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
  }

  handleAnimationEnd() {
    console.log('StackNavigationWidget: handleAnimationEnd');
    this.doDispatch(this.props.model, 'endAnimation');
  }

  getComponent(screen) {
    if (!screen) {
      return null;
    }

    const widget = screen.get('widget');
    const Component = this.props.widgets[widget];

    if (!Component) {
      console.warn(
        `No widget defined for screen '${widget}'. You should check the 'widgets' prop given to 'StackNavigation'.`
      );
    }

    return Component;
  }

  /******************************************************************************/

  renderComponent(screen, Component) {
    if (!screen) {
      return null;
    }

    let widgetProps = screen.get('widgetProps');
    if (widgetProps) {
      widgetProps = widgetProps.toObject();
    }

    return (
      <Component
        serviceId={screen.get('serviceId')}
        {...widgetProps}
        settings={this.props.settings} // TODO: should be removed
      />
    );
  }

  renderFix(screen, Component) {
    return (
      <AnimatedContainer animation="none" fitContent={this.props.fitContent}>
        {this.renderComponent(screen, Component)}
      </AnimatedContainer>
    );
  }

  renderAnimation(
    lastScreen,
    lastComponent,
    beforeLastScreen,
    operation,
    animation
  ) {
    const beforeLastComponent = this.getComponent(beforeLastScreen);

    let animations = null;
    if (animation) {
      animations = animationPairs[operation][animation];
      if (!animations) {
        console.warn(
          `StackNavigation: Animation '${animation}' is not defined.`
        );
      }
    }

    const beforeLastAnimation = animations ? animations.beforeLast : null;

    return (
      <React.Fragment>
        {beforeLastScreen && beforeLastAnimation ? (
          <AnimatedContainer
            animation={beforeLastAnimation || 'none'}
            fitContent={this.props.fitContent}
          >
            {this.renderComponent(beforeLastScreen, beforeLastComponent)}
          </AnimatedContainer>
        ) : null}
        <AnimatedContainer
          animation={animations ? animations.last : 'none'}
          onAnimationEnd={this.handleAnimationEnd}
          fitContent={this.props.fitContent}
        >
          {this.renderComponent(lastScreen, lastComponent)}
        </AnimatedContainer>
      </React.Fragment>
    );
  }

  render() {
    const {navigationState} = this.props;
    const stack = navigationState.get('stack');
    const operation = navigationState.get('operation');
    const operationParams = navigationState.get('operationParams');
    const lastScreen = stack.get(stack.length - 1);

    let beforeLastScreen = null;
    if (operation === 'back') {
      const backCount = operationParams.get('backCount');
      if (stack.length >= backCount + 1) {
        beforeLastScreen = stack.get(stack.length - (backCount + 1));
      }
    } else if (stack.length >= 2) {
      beforeLastScreen = stack.get(stack.length - 2);
    }

    console.log(
      `StackNavigation: operation=${operation} last=${
        lastScreen ? lastScreen.get('widget') : null
      } beforeLast=${beforeLastScreen ? beforeLastScreen.get('widget') : null}`
    );

    const lastComponent = this.getComponent(lastScreen);
    if (operation) {
      let screenForAnimation = lastScreen;
      if (operation === 'back') {
        const backCount = operationParams.get('backCount');
        if (backCount > 1) {
          screenForAnimation = stack.get(stack.length - backCount);
        }
      }
      let animation = null;
      const animations = screenForAnimation.get('animations');
      if (animations) {
        animation = animations.get(operation);
        if (!animation && operation === 'replace') {
          animation = animations.get('open');
        }
      }

      return this.renderAnimation(
        lastScreen,
        lastComponent,
        beforeLastScreen,
        operation,
        animation
      );
    } else {
      return this.renderFix(lastScreen, lastComponent);
    }
  }
}

/******************************************************************************/

const StackNavigationNC = Widget.connect((state, props) => {
  return {
    navigationState: state.get(props.model),
  };
})(StackNavigationWidget);

const StackNavigation = withC(StackNavigationNC);
StackNavigation.displayName = 'StackNavigation';

export default StackNavigation;
