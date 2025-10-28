import React, { useEffect, useState } from "react";
import MapView from "./components/MapView";
import { format } from "date-fns";

export default function App() {
  const [data, setData] = useState(null);
  const [minMag, setMinMag] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const USGS_URL =
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
  useEffect(() => {
    setLoading(true);
    fetch(USGS_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Network response not ok");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  return (
    <div className="app-root">
      <header className="header">
        <h1>Earthquake Visualizer</h1>
        <p className="subtitle">
          Recent earthquakes (past 24 hours) — USGS feed
        </p>
        <div className="controls">
          <label>
            Minimum magnitude: <strong>{minMag.toFixed(1)}</strong>
          </label>
          <input
            type="range"
            min="0"
            max="7"
            step="0.1"
            value={minMag}
            onChange={(e) => setMinMag(parseFloat(e.target.value))}
          />
        </div>
        <div className="meta">
          <small>
            {loading
              ? "Loading…"
              : error
              ? `Error: ${error}`
              : `Loaded ${data.features.length} events — last update: ${format(
                  new Date(),
                  "PPpp"
                )}`}
          </small>
        </div>
      </header>

      <main className="main">
        <MapView feed={data} minMag={minMag} />
      </main>

      <footer className="footer">
        <small>Data source: USGS Earthquake Hazards Program (past day)</small>
      </footer>
    </div>
  );
}
