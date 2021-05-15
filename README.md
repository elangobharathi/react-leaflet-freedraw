# react-leaflet-freedraw

React component built on top of [react-leaflet](https://github.com/PaulLeCam/react-leaflet) that integrates [Leaflet.FreeDraw](https://github.com/Wildhoney/Leaflet.FreeDraw) library. Please checkout [codesandbox EXAMPLE](https://codesandbox.io/s/react-leaflet-freedraw-example-1fy3l?file=/src/App.js) using this package with some primary use cases.

## Install

`npm install react-leaflet-freedraw --save`

or

`yarn add react-leaflet-freedraw`

Make sure that you have the following peer dependencies installed.

`npm install leaflet react-leaflet @react-leaflet/core leaflet-freedraw ramda react react-dom --save`

or

`yarn add leaflet react-leaflet @react-leaflet/core leaflet-freedraw ramda react react-dom`

## Getting started

Please make sure that you go through [Leaflet.FreeDraw](https://github.com/Wildhoney/Leaflet.FreeDraw) readme before integrating this component.

You need to wrap this component into MapContainer component and pass the options as shown below.

```javascript
import React, { useRef } from 'react';
import { MapContainer } from 'react-leaflet';
import Freedraw, { ALL } from 'react-leaflet-freedraw';

const Component = () => {
  const freedrawRef = useRef(null);

  return (
    <MapContainer>
      <Freedraw
        mode={ALL}
        eventHandlers={{
          markers: (event) =>
            console.log(
              'markers drawn - latLngs',
              event.latLngs,
              'Polygons:',
              freedrawRef.current.size()
            ),
          mode: (event) => console.log('mode changed', event),
        }}
        ref={freedrawRef}
      />
    </MapContainer>
  );
};
```

It supports all the options mentioned in [Leaflet.FreeDraw](https://github.com/Wildhoney/Leaflet.FreeDraw).

A detailed example of how to use this componenet is in the [example folder of this repo](https://github.com/elangobharathi/react-leaflet-freedraw/tree/master/example). To run the example,

1. Clone this repo
2. Run `npm i`
3. Run `npm run example`
