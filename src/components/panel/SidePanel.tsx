import React from "react";
import { LayerSelector } from "./LayerSelector";
import { DroneList } from "./DroneList";
import { GeoJSONToggle } from "./GeoJSONToggle";
import { GeoJSONLegend } from "./GeoJSONLegend";
import { MOCK_DRONES } from "../../constants/initialMapConst";
import type { Drone } from "../../types";

interface SidePanelProps {
    selectedLayer: string;
    onLayerChange: (layerId: string) => void;
    onDroneSelect: (drone: Drone) => void;
    geoJSONEnabled: boolean;
    onGeoJSONToggle: (enabled: boolean) => void;
}

export const SidePanel: React.FC<SidePanelProps> = ({
                                                        selectedLayer,
                                                        onLayerChange,
                                                        onDroneSelect,
                                                        geoJSONEnabled,
                                                        onGeoJSONToggle
                                                    }) => {
    return (
        <div className="side-panel">
            <LayerSelector selectedLayer={selectedLayer} onLayerChange={onLayerChange} />
            <GeoJSONToggle enabled={geoJSONEnabled} onToggle={onGeoJSONToggle} />
            {geoJSONEnabled && <GeoJSONLegend />}
            <DroneList drones={MOCK_DRONES} onDroneSelect={onDroneSelect} />
        </div>
    );
};