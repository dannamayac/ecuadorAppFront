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

const MapComponent = ({ data }) => {
  const [markers, setMarkers] = useState([]);

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setMarkers([...markers, { ...e.latlng, info: 'Información adicional' }]);
      },
    });
    return null;
  };

  return (
    <MapContainer center={[4.7110, -74.0721]} zoom={12} className="map-container">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {data.map((item, idx) => (
        <Marker key={`marker-${idx}`} position={[item.lat, item.lng]}>
          <Popup className="map-popup">
            <span>{item.info}</span>
          </Popup>
        </Marker>
      ))}
      {/* Renderizar también los marcadores adicionales si los hay */}
      {markers.map((marker, idx) => (
        <Marker key={`extra-marker-${idx}`} position={marker}>
          <Popup>
            <span>{marker.info}</span>
          </Popup>
        </Marker>
      ))}
      <MapEvents />
    </MapContainer>
  );
};

export default MapComponent;