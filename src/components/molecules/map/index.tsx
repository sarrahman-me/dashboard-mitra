"use client";
import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ lokasi }: any) => {
  const ChangeMapView = ({ coords }: any) => {
    const map = useMapEvents({
      zoomend: () => {
        map.setView(coords, map.getZoom());
      },
    });

    return null;
  };

  return (
    <div style={{ height: "400px" }}>
      <MapContainer center={[0, 0]} zoom={13} style={{ height: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="Map data © OpenStreetMap contributors"
        />
        {lokasi.asal.latlang && (
          <Marker position={lokasi.asal.latlang.split(",").map(parseFloat)}>
            <Popup>Asal</Popup>
          </Marker>
        )}
        {lokasi.tujuan.latlang && (
          <Marker position={lokasi.tujuan.latlang.split(",").map(parseFloat)}>
            <Popup>Tujuan</Popup>
          </Marker>
        )}
        {lokasi.asal.latlang && lokasi.tujuan.latlang && (
          <ChangeMapView
            coords={lokasi.asal.latlang.split(",").map(parseFloat)}
          />
        )}
        {/* Implement Leaflet Routing Machine here if needed */}
      </MapContainer>
    </div>
  );
};

export default Map;
