# react-leaflet-freedraw

React component built on top of [react-leaflet](https://github.com/PaulLeCam/react-leaflet) that integrates [Leaflet.FreeDraw](https://github.com/Wildhoney/Leaflet.FreeDraw) library.

## Install

`npm install react-leaflet-freedraw`

Make sure that you have the following peer dependencies installed.

`npm install leaflet react-leaflet leaflet-freedraw ramda react react-dom`

## Getting started

Please make sure that you go through [Leaflet.FreeDraw](https://github.com/Wildhoney/Leaflet.FreeDraw) readme before integrating this component.

You need to wrap this component into Map component and pass the options as shown below.

```javascript
import { Map } from 'react-leaflet';
import Freedraw, { ALL } from 'react-leaflet-freedraw';

const Component = () => (
  <Map>
    <Freedraw
      mode={ALL}
      onMarkers={this.handleOnMarkers}
      onModeChange={this.handleModeChange}
      ref={this.freedrawRef}
    />
  </Map>
);
```

It supports all the options mentioned in [Leaflet.FreeDraw](https://github.com/Wildhoney/Leaflet.FreeDraw).

A detailed example of how to use this componenet is in the [example folder of this repo](https://github.com/elangobharathi/react-leaflet-freedraw/tree/master/example). To run the example,

1. Clone this repo
2. Run `npm run example`
