import './App.css'
import MapView from "./components/map/MapView.tsx";

function App() {

  return (
    <>
      <h1>React + TypeScript + Vite + OpenLayers</h1>
      <div className="card">
        <MapView />
      </div>
    </>
  )
}

export default App
