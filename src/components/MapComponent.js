import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import '../styles/Map/MapComponentStyles.css'

// Crear icono personalizado
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapComponent = () => {
  const [markers, setMarkers] = useState([]);

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setMarkers([...markers, e.latlng]);
      },
    });
    return null;
  };

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} className="map-container">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((position, idx) => (
        <Marker key={`marker-${idx}`} position={position}>
          <Popup className="map-popup">
            <span>Marker is at {position.toString()}</span>
          </Popup>
        </Marker>
      ))}
      <MapEvents />
    </MapContainer>
  );
};

export default MapComponent;