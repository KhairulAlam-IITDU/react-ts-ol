import React, { useRef, useState } from "react";
import { MapView } from "./components/map/MapView";
import { SidePanel } from "./components/panel/SidePanel";
import { DroneModal } from "./components/modal/DroneModal";
import { GeoJSONModal } from "./components/modal/GeoJSONModal";
import { useMapInitialization } from "./hooks/useMapInitialization";
import { useMapClickHandler } from "./hooks/useMapClickHandler";
import { useLayerManager } from "./hooks/useLayerManager";
import { useDroneMarkers } from "./hooks/useDroneMarkers";
import { useGeoJSONLayer } from "./hooks/useGeoJSONLayer";
import { LAYER_TYPES, GEOJSON_CONFIG } from "./constants/initialMapConst";
import type { Drone, GeoJSONFeatureProperties } from "./types";
import "./App.css";

const App: React.FC = () => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const { map, isMapReady } = useMapInitialization(mapRef);
    const [selectedLayer, setSelectedLayer] = useState(LAYER_TYPES.DEFAULT.id);
    const [selectedDrone, setSelectedDrone] = useState<Drone | null>(null);
    const [geoJSONEnabled, setGeoJSONEnabled] = useState(false);
    const [geoJSONFeature, setGeoJSONFeature] = useState<{
        properties: GeoJSONFeatureProperties;
        coordinate: number[];
    } | null>(null);

    useMapClickHandler(map, isMapReady);
    useLayerManager(map, isMapReady, selectedLayer);
    useDroneMarkers(map, isMapReady, setSelectedDrone);
    useGeoJSONLayer(
        map,
        isMapReady,
        GEOJSON_CONFIG,
        geoJSONEnabled,
        (properties, coordinate) => {
            setGeoJSONFeature({ properties, coordinate });
        }
    );

    return (
        <div className="app-container">
            <h1 className="app-title">Drone Surveillance System</h1>
            <div className="main-content">
                <SidePanel
                    selectedLayer={selectedLayer}
                    onLayerChange={setSelectedLayer}
                    onDroneSelect={setSelectedDrone}
                    geoJSONEnabled={geoJSONEnabled}
                    onGeoJSONToggle={setGeoJSONEnabled}
                />
                <MapView mapRef={mapRef} />
            </div>
            <DroneModal drone={selectedDrone} onClose={() => setSelectedDrone(null)} />
            <GeoJSONModal
                properties={geoJSONFeature?.properties || null}
                coordinate={geoJSONFeature?.coordinate || null}
                onClose={() => setGeoJSONFeature(null)}
            />
        </div>
    );
};

export default App;