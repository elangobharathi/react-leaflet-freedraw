import React, { Component } from 'react';
import { render } from 'react-dom';
import { Map, TileLayer } from 'react-leaflet';
import Freedraw, { CREATE, EDIT, DELETE, APPEND, ALL } from '../Freedraw';
import CheckboxContainer from './Checkboxes';

class Example extends Component {
  state = {
    controls: [
      {
        id: 'create',
        label: 'Create',
        mode: CREATE,
        isChecked: true
      },
      {
        id: 'edit',
        label: 'Edit Polygons',
        mode: EDIT,
        isChecked: true
      },
      {
        id: 'attach-elbows',
        label: 'Attach Elbows',
        mode: APPEND,
        isChecked: true
      },
      {
        id: 'delete',
        label: 'Delete',
        mode: DELETE,
        isChecked: true
      }
    ]
  };

  componentDidMount() {
    document.addEventListener('keydown', event => {
      // Cancel the current FreeDraw action when the escape key is pressed.
      if (event.key === 'Escape') {
        this.freedrawRef.current.leafletElement.cancel();
      }
    });
  }

  // Set the state according to the selections of the checkboxes
  handleOptionsChange = e => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => {
      const copyControls = prevState.controls.slice();
      const control = copyControls.find(each => each.id === item);
      control.isChecked = isChecked;

      return {
        controls: copyControls
      };
    });
  };

  // Listen for any markers added, removed or edited, and then output the lat lng boundaries.
  handleOnMarkers = event => {
    console.log(
      'LatLngs:',
      event.latLngs,
      'Polygons:',
      this.freedrawRef.current.leafletElement.size()
    );
  };

  // Listen for when the mode changes
  handleModeChange = event => {
    console.log('mode changed', event);
  };

  freedrawRef = React.createRef();

  render() {
    let mode = ALL;

    this.state.controls.forEach(control => {
      if (control.isChecked) {
        mode = mode | control.mode;
      } else {
        mode = mode ^ control.mode;
      }
    });

    return (
      <div>
        <Map
          className="map"
          center={[20.5937, 78.9629]}
          zoom={5}
          doubleClickZoom={false}
        >
          <TileLayer
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors &copy; <a href=&quot;https://carto.com/attribution/&quot;>CARTO</a>"
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
          />
          <Freedraw
            mode={mode}
            onMarkers={this.handleOnMarkers}
            onModeChange={this.handleModeChange}
            ref={this.freedrawRef}
          />
        </Map>
        <div className="checkboxContainer">
          <CheckboxContainer
            checkboxes={this.state.controls}
            onChange={this.handleOptionsChange}
          />
        </div>
      </div>
    );
  }
}

render(<Example />, document.getElementById('app'));
