import React, { useEffect, useState, useRef } from "react";
import { render } from "react-dom";
import { Map, TileLayer } from "react-leaflet";
import Freedraw, { CREATE, EDIT, DELETE, APPEND, ALL } from "../Freedraw";
import CheckboxContainer from "./Checkboxes";

function Example() {
  const [controls, setControls] = useState([
    {
      id: "create",
      label: "Create",
      mode: CREATE,
      isChecked: true
    },
    {
      id: "edit",
      label: "Edit Polygons",
      mode: EDIT,
      isChecked: true
    },
    {
      id: "attach-elbows",
      label: "Attach Elbows",
      mode: APPEND,
      isChecked: true
    },
    {
      id: "delete",
      label: "Delete",
      mode: DELETE,
      isChecked: true
    }
  ]);
  const freedrawRef = useRef(null);
  useEffect(() => {
    const handler = event => {
      // Cancel the current FreeDraw action when the escape key is pressed.
      if (event.key === "Escape") {
        freedrawRef.current.leafletElement.cancel();
      }
    };
    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Set the state according to the selections of the checkboxes
  const handleOptionsChange = e => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    const copyControls = [...controls];
    const control = copyControls.find(each => each.id === item);
    control.isChecked = isChecked;
    setControls(copyControls);
  };

  // Listen for any markers added, removed or edited, and then output the lat lng boundaries.
  const handleOnMarkers = event => {
    console.log(
      "LatLngs:",
      event.latLngs,
      "Polygons:",
      freedrawRef.current.leafletElement.size()
    );
  };

  // Listen for when the mode changes
  const handleModeChange = event => {
    console.log("mode changed", event);
  };

  let mode = ALL;
  controls.forEach(control => {
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
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attribution/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        />
        <Freedraw
          mode={mode}
          onMarkers={handleOnMarkers}
          onModeChange={handleModeChange}
          ref={freedrawRef}
        />
      </Map>
      <div className="checkboxContainer">
        <CheckboxContainer
          checkboxes={controls}
          onChange={handleOptionsChange}
        />
      </div>
    </div>
  );
}

render(<Example />, document.getElementById("app"));
