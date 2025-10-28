import React, { useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.fullscreen";
import "leaflet.fullscreen/Control.FullScreen.css";

function FitBounds({ feed, minMag }) {
  const map = useMap();
  if (!feed || !feed.features) return null;
  const points = feed.features
    .filter((f) => f.properties && f.properties.mag >= minMag)
    .map((f) => [f.geometry.coordinates[1], f.geometry.coordinates[0]]);
  if (points.length > 0) {
    map.fitBounds(points, { padding: [40, 40] });
  }
  return null;
}

function magToRadius(mag) {
  return mag <= 0 ? 4 : Math.pow(2, mag / 1.5);
}

function magToColor(mag) {
  if (mag >= 6) return "#ff0033";
  if (mag >= 5) return "#ff6600";
  if (mag >= 4) return "#ffaa00";
  if (mag >= 3) return "#ffcc00";
  if (mag >= 2) return "#a2ff00";
  return "#66ff66";
}

export default function MapView({ feed, minMag }) {
  const center = [20, 0];
  const features = useMemo(() => (feed?.features ? feed.features : []), [feed]);

  return (
    <MapContainer
      center={center}
      zoom={2}
      scrollWheelZoom
      style={{
        height: "78vh",
        width: "100%",
        borderRadius: "16px",
        overflow: "hidden",
      }}
      fullscreenControl={true}
    >
      {/* Base Map - Stylish Carto Voyager */}
      <TileLayer
        attribution='&copy; <a href=\"https://carto.com/attributions\">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      <FitBounds feed={feed} minMag={minMag} />

      {/* Render Circle Markers */}
      {features
        .filter((f) => f.geometry && f.properties && f.properties.mag >= minMag)
        .map((f) => {
          const [lon, lat, depth] = f.geometry.coordinates;
          const mag = f.properties.mag;
          const place = f.properties.place;
          const time = new Date(f.properties.time).toUTCString();
          const id = f.id;

          return (
            <CircleMarker
              key={id}
              center={[lat, lon]}
              radius={magToRadius(mag)}
              pathOptions={{
                color: magToColor(mag),
                fillOpacity: 0.7,
                weight: 2,
              }}
            >
              <Tooltip direction="top" offset={[0, -4]} opacity={1}>
                <strong>{place}</strong>
                <br />
                Mag: {mag} | Depth: {depth} km
              </Tooltip>
              <Popup>
                <div className="popup-card">
                  <h4>{place}</h4>
                  <p>
                    <b>Magnitude:</b> {mag}
                    <br />
                    <b>Depth:</b> {depth} km
                    <br />
                    <b>Time:</b> {time}
                  </p>
                  <a
                    href={f.properties.url}
                    target="_blank"
                    rel="noreferrer"
                    className="popup-link"
                  >
                    More Info ↗
                  </a>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}

      {/* Legend */}
      <div className="legend leaflet-bottom leaflet-left">
        <div>
          <span style={{ background: "#66ff66" }}></span> 0–2
        </div>
        <div>
          <span style={{ background: "#a2ff00" }}></span> 2–3
        </div>
        <div>
          <span style={{ background: "#ffcc00" }}></span> 3–4
        </div>
        <div>
          <span style={{ background: "#ffaa00" }}></span> 4–5
        </div>
        <div>
          <span style={{ background: "#ff6600" }}></span> 5–6
        </div>
        <div>
          <span style={{ background: "#ff0033" }}></span> 6+
        </div>
      </div>
    </MapContainer>
  );
}
