# 🌍 Earthquake Visualizer
link: https://s39jn5.csb.app/
An interactive web app to visualize recent earthquake activity worldwide using real-time data from the **USGS Earthquake API**.  
Built for learners and researchers who want to understand **global seismic patterns** through an intuitive, map-based interface.

---

## 🚀 Features

- 🌐 **Real-time data** from [USGS Earthquake API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson)
- 🗺️ **Interactive map visualization** with [React Leaflet](https://react-leaflet.js.org/)
- 🧩 **Marker clustering** for dense earthquake regions
- 📊 **Magnitude-based color & radius scaling**
- 🧭 **Dynamic popups** showing magnitude, depth, and location
- 🎨 **Modern UI** built with React + TailwindCSS (optional)
- ⚡ Fast and responsive — perfect for classroom demos or quick research

---

## 🛠️ Tech Stack

| Layer | Technology |
|--------|-------------|
| Frontend | React (Vite or CRA) |
| Mapping | Leaflet + React-Leaflet |
| Data | USGS Earthquake GeoJSON API |
| Styling | TailwindCSS / Custom CSS |
| Deployment | CodeSandbox / Netlify / Vercel |

---

## 📦 Installation

```bash
# Clone this repository
git clone https://github.com/<your-username>/earthquake-visualizer.git
cd earthquake-visualizer

# Install dependencies
npm install

# Start the development server
npm start
