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

    zoom: {
      last: 'zoomIn',
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

    zoom: {
      last: 'zoomOut',
      beforeLast: 'none',
    },

    fade: {
      last: 'fadeOut',
      beforeLast: 'none',
    },
  },
};

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
        settings={this.props.settings}
      />
    );
  }

  renderFix(screen, Component) {
    return (
      <AnimatedContainer animation="none">
        {this.renderComponent(screen, Component)}
      </AnimatedContainer>
    );
  }

  renderAnimation(lastScreen, lastComponent, beforeLastScreen) {
    const beforeLastComponent = this.getComponent(beforeLastScreen);

    let animation = null;
    if (lastComponent.animations) {
      animation = lastComponent.animations[this.props.operation];
    }

    let animations = null;
    if (animation) {
      animations = animationPairs[this.props.operation][animation];
      if (!animations) {
        console.warn(
          `StackNavigation: Animation '${animation}' is not defined.`
        );
      }
    }

    return (
      <React.Fragment>
        {beforeLastScreen ? (
          <AnimatedContainer
            animation={animations ? animations.beforeLast : 'none'}
          >
            {this.renderComponent(beforeLastScreen, beforeLastComponent)}
          </AnimatedContainer>
        ) : null}
        <AnimatedContainer
          animation={animations ? animations.last : 'none'}
          onAnimationEnd={this.handleAnimationEnd}
        >
          {this.renderComponent(lastScreen, lastComponent)}
        </AnimatedContainer>
      </React.Fragment>
    );
  }

  render() {
    const {lastScreen, beforeLastScreen, operation} = this.props;

    console.log(
      `StackNavigation: operation=${operation} last=${lastScreen.get(
        'widget'
      )} beforeLast=${beforeLastScreen ? beforeLastScreen.get('widget') : null}`
    );

    const lastComponent = this.getComponent(lastScreen);
    if (operation) {
      return this.renderAnimation(lastScreen, lastComponent, beforeLastScreen);
    } else {
      return this.renderFix(lastScreen, lastComponent);
    }
  }
}

/******************************************************************************/

const StackNavigationNC = Widget.connect((state, props) => {
  const navigationState = state.get(props.model);
  const stack = navigationState.get('stack');
  return {
    lastScreen: stack.get(stack.length - 1),
    beforeLastScreen: stack.length < 2 ? null : stack.get(stack.length - 2),
    operation: navigationState.get('operation'),
  };
})(StackNavigationWidget);

const StackNavigation = withC(StackNavigationNC);
StackNavigation.displayName = 'StackNavigation';

export default StackNavigation;
