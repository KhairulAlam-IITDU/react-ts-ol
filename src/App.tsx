import React, { useRef, useState } from "react";
import { MapView } from "./components/map/MapView";
import { SidePanel } from "./components/panel/SidePanel";
import { DroneModal } from "./components/modal/DroneModal";
import { useMapInitialization } from "./hooks/useMapInitialization";
import { useMapClickHandler } from "./hooks/useMapClickHandler";
import { useLayerManager } from "./hooks/useLayerManager";
import { useDroneMarkers } from "./hooks/useDroneMarkers";
import { LAYER_TYPES } from "./constants/initialMapConst";
import type { Drone } from "./types";
import "./App.css";

const App: React.FC = () => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const { map, isMapReady } = useMapInitialization(mapRef);
    const [selectedLayer, setSelectedLayer] = useState(LAYER_TYPES.DEFAULT.id);
    const [selectedDrone, setSelectedDrone] = useState<Drone | null>(null);

    useMapClickHandler(map, isMapReady);
    useLayerManager(map, isMapReady, selectedLayer);
    useDroneMarkers(map, isMapReady, setSelectedDrone);

    return (
        <div className="app-container">
            <h1 className="app-title">OpenLayers Drone Map</h1>
            <div className="main-content">
                <SidePanel
                    selectedLayer={selectedLayer}
                    onLayerChange={setSelectedLayer}
                    onDroneSelect={setSelectedDrone}
                />
                <MapView mapRef={mapRef} />
            </div>
            <DroneModal drone={selectedDrone} onClose={() => setSelectedDrone(null)} />
        </div>
    );
};

export default App;