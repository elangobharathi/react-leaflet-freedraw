import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import { render } from 'react-dom';
import { MapContainer, TileLayer } from 'react-leaflet';
import Freedraw, { CREATE, EDIT, DELETE, APPEND, ALL } from '../Freedraw';
import CheckboxContainer from './Checkboxes';

const intialState = [
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

function reducer(state = intialState, event) {
  return state.map((control) => {
    if (control.id === event.target.name) {
      return {
        ...control,
        isChecked: event.target.checked,
      };
    }
    return {
      ...control,
    };
  });
}

function Example() {
  const [state, dispatch] = useReducer(reducer, intialState);
  const freedrawRef = useRef(null);
  
  const handleMarkersDraw = useCallback(
    (event) =>
      console.log(
        'markers drawn - latLngs',
        event.latLngs,
        'Polygons:',
        freedrawRef.current.size()
      ),
    []
  );
  const handleModeChange = useCallback(
    (event) => console.log('mode changed', event),
    []
  );

  const handlers = useMemo(
    () => ({
      markers: handleMarkersDraw,
      mode: handleModeChange,
    }),
    [handleMarkersDraw, handleModeChange]
  );

  const handleEscapeKey = useCallback((event) => {
    // Cancel the current FreeDraw action when the escape key is pressed.
    if (event.key === 'Escape') {
      freedrawRef.current.cancel();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleEscapeKey);
    return () => window.removeEventListener('keydown', handleEscapeKey);
  }, [handleEscapeKey]);

  const mode = state.reduce((result, current) => {
    if (current.isChecked) {
      return result | current.mode;
    } else {
      return result ^ current.mode;
    }
  }, ALL);

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
        <Freedraw mode={mode} eventHandlers={handlers} ref={freedrawRef} />
      </MapContainer>
      <div className="checkboxContainer">
        <CheckboxContainer checkboxes={state} onChange={dispatch} />
      </div>
    </div>
  );
}

render(<Example />, document.getElementById('app'));
