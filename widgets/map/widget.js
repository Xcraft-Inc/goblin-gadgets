import React from 'react';
import Widget from 'laboratory/widget';

import Container from 'gadgets/container/widget';
import Leaflet from './reaflet.js';
import 'leaflet/dist/leaflet.css';

class Map extends Widget {
  constructor () {
    super (...arguments);
  }

  initMap (node) {
    if (!node) {
      return;
    }

    this.map = Leaflet.map (node, {
      keyboard: true,
    });

    this.map.setView ([this.props.lat, this.props.lon], this.props.zoom);

    Leaflet.tileLayer ('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo (this.map);
  }

  addItems () {
    this.props.items.forEach (item => {
      var icon = Leaflet.MakiMarkers.icon ({
        icon: item.icon,
        color: item.color,
        size: 'l',
      });

      Leaflet.marker (item.pos, {
        title: item.title,
        icon: icon,
        keyboard: true,
        riseOnHover: true,
        draggable: true,
      }).addTo (this.map);
    });
  }

  componentDidMount () {
    window.dispatchEvent (new Event ('resize'));
  }

  render () {
    return (
      <Container kind="panes">
        <div
          ref={node => this.initMap (node)}
          style={{width: '600px', height: '400px', position: 'relative'}}
          className="leaflet-container leaflet-touch leaflet-retina leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom"
        />
      </Container>
    );
  }
}

/******************************************************************************/
export default Map;
