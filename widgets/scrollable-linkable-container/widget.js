//T:2019-02-27
import T from 't';
import React from 'react';
import Widget from 'laboratory/widget';
import _ from 'lodash';
/******************************************************************************/

class ScrollableLinkableContainer extends Widget {
  constructor() {
    super(...arguments);
    this.handleScroll = _.debounce(this.handleScroll.bind(this), 500);
  }

  handleScroll(e) {
    // const max = e.target.scrollHeight - e.target.offsetHeight;
    // const top = e.target.scrollTop;
    // const pos = max > 0 ? top / max : 0;
    this.dispatch({
      type: 'SCROLL_TOP',
      name: this.props.name || 'default',
      value: e.target.scrollTop,
    });
  }

  /******************************************************************************/

  render() {
    const {disabled, index} = this.props;

    const id = this.props.id || this.context.id;

    const LoadWidget = this.mapWidget(
      props => {
        if (!props.widgetId) {
          this.dispatch({
            type: 'INIT_SCROLLABLE',
            id: id,
            name: this.props.name || 'default',
          });
          return null;
        }

        return (
          <div
            key={index}
            ref={el => {
              if (el) {
                el.addEventListener('scroll', this.handleScroll);
                const scrollTop = this.getState()
                  .widgets.get(id)
                  .get(this.props.name || 'default');
                el.scroll({
                  top: scrollTop,
                });
              }
            }}
            className={this.styles.classNames.box}
            disabled={disabled}
            onClick={this.props.onClick}
          >
            {this.props.children}
          </div>
        );
      },
      'widgetId',
      `widgets.${id}.id`
    );

    return <LoadWidget />;
  }
}

/******************************************************************************/
export default ScrollableLinkableContainer;
