import React from "react";
import { LayerSelector } from "./LayerSelector";
import { DroneList } from "./DroneList";
import { MOCK_DRONES } from "../../constants/initialMapConst";
import type { Drone } from "../../types";

interface SidePanelProps {
    selectedLayer: string;
    onLayerChange: (layerId: string) => void;
    onDroneSelect: (drone: Drone) => void;
}

export const SidePanel: React.FC<SidePanelProps> = ({
                                                        selectedLayer,
                                                        onLayerChange,
                                                        onDroneSelect
                                                    }) => {
    return (
        <div className="side-panel">
            <LayerSelector selectedLayer={selectedLayer} onLayerChange={onLayerChange} />
            <DroneList drones={MOCK_DRONES} onDroneSelect={onDroneSelect} />
        </div>
    );
};