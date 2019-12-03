//T:2019-02-27
import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';

/******************************************************************************/

class Accordion extends Widget {
  constructor(props) {
    super(...arguments);

    this.setDivRef = this.setDivRef.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);

    this.state = {
      isExpanded: props.expanded,
    };
  }

  componentDidUpdate() {
    if (!this.props.expanded && this.state.isExpanded) {
      setTimeout(() => {
        this.setState({
          isExpanded: false,
        });
      }, 0);
    }
  }

  setDivRef(ref) {
    this.divRef = ref;
  }

  handleTransitionEnd() {
    if (this.props.expanded) {
      this.setState({
        isExpanded: true,
      });
    }
  }

  render() {
    const {
      expanded,
      hasOpacity,
      hasOverflow,
      transition,
      ...otherProps
    } = this.props;

    let maxHeight = '0';
    let opacity = '0';
    if (expanded) {
      if (this.state.isExpanded || !this.divRef) {
        maxHeight = 'none';
        opacity = '1';
      } else {
        maxHeight = this.divRef.scrollHeight + 'px';
        opacity = '1';
      }
    } else if (this.state.isExpanded) {
      if (this.divRef) {
        maxHeight = this.divRef.scrollHeight + 'px';
        opacity = '1';
      }
    }

    if (!hasOpacity) {
      opacity = null;
    }

    return (
      <div
        {...otherProps}
        ref={this.setDivRef}
        className={this.styles.classNames.accordion}
        style={{...this.props.style, maxHeight, opacity}}
        onTransitionEnd={this.handleTransitionEnd}
      >
        {this.props.children}
      </div>
    );
  }
}

/******************************************************************************/
export default Accordion;
