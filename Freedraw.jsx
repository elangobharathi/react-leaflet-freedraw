import LeafletFreedraw from 'leaflet-freedraw';
import { createLayerComponent } from '@react-leaflet/core';

function createLeafletElement(props, context) {
  const instance = new LeafletFreedraw({ ...props });
  return { instance, context: { ...context, overlayContainer: instance } };
}

function updateLeafletElement(instance, props, prevProps) {
  if (props.mode !== prevProps.mode) {
    instance.mode(props.mode);
  }
}

const Freedraw = createLayerComponent(
  createLeafletElement,
  updateLeafletElement
);

export default Freedraw;

export * from 'leaflet-freedraw';
