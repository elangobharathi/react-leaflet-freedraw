import React from 'react';
import { render } from 'react-dom';
import { MapContainer, TileLayer } from 'react-leaflet';
import Freedraw, { CREATE, EDIT, DELETE, APPEND, ALL } from '../Freedraw';
import CheckboxContainer from './Checkboxes';

const controls = [
  {
    id: 'create',
    label: 'Create',
    mode: CREATE,
    isChecked: true,
  },
  {
    id: 'edit',
    label: 'Edit Polygons',
    mode: EDIT,
    isChecked: true,
  },
  {
    id: 'attach-elbows',
    label: 'Attach Elbows',
    mode: APPEND,
    isChecked: true,
  },
  {
    id: 'delete',
    label: 'Delete',
    mode: DELETE,
    isChecked: true,
  },
];

function Example() {
  let mode = ALL;

  controls.forEach((control) => {
    if (control.isChecked) {
      mode = mode | control.mode;
    } else {
      mode = mode ^ control.mode;
    }
  });

  return (
    <div>
      <MapContainer
        className="map"
        center={[20.5937, 78.9629]}
        zoom={5}
        doubleClickZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attribution/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        />
        <Freedraw
          mode={mode}
          eventHandlers={{
            markers: (event) => console.log('on markers', event.latLngs),
            mode: (event) => console.log('on mode', event),
          }}
        />
      </MapContainer>
      <div className="checkboxContainer">
        <CheckboxContainer
          checkboxes={controls}
          onChange={() => console.log('checkbox change')}
        />
      </div>
    </div>
  );
}

render(<Example />, document.getElementById('app'));
