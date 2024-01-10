"use client";
import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

let DefaultIcon = L.icon({
  iconUrl:
    "https://ik.imagekit.io/sarrahmanme/location.png?updatedAt=1704853645093",
  shadowUrl:
    "https://ik.imagekit.io/sarrahmanme/location.png?updatedAt=1704853645093",
  iconSize: [25, 41],
  shadowSize: [25, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map = ({ lokasi }: any) => {
  const bounds =
    lokasi.asal.latlang && lokasi.tujuan.latlang
      ? [
          lokasi.asal.latlang.split(",").map(parseFloat),
          lokasi.tujuan.latlang.split(",").map(parseFloat),
        ]
      : undefined;

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
      <MapContainer
        center={[0, 0]}
        zoom={13}
        style={{ height: "100%" }}
        bounds={bounds}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="Map data © OpenStreetMap contributors"
        />
        {lokasi.asal.latlang && (
          <Marker position={lokasi.asal.latlang.split(",").map(parseFloat)}>
            <Popup>{lokasi.asal.nama || "asal"}</Popup>
          </Marker>
        )}
        {lokasi.tujuan.latlang && (
          <Marker position={lokasi.tujuan.latlang.split(",").map(parseFloat)}>
            <Popup>{lokasi.tujuan.nama || "tujuan"}</Popup>
          </Marker>
        )}
        {lokasi.asal.latlang && lokasi.tujuan.latlang && (
          <ChangeMapView
            coords={lokasi.asal.latlang.split(",").map(parseFloat)}
          />
        )}
        {lokasi.asal.latlang && lokasi.tujuan.latlang && (
          <Polyline
            pathOptions={{ color: "#3949AB" }} // Ubah warna Polyline sesuai keinginan Anda
            positions={[
              lokasi.asal.latlang.split(",").map(parseFloat),
              lokasi.tujuan.latlang.split(",").map(parseFloat),
            ]}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
