import React from "react";
import type { Drone } from "../../types";

interface DroneListProps {
    drones: Drone[];
    onDroneSelect: (drone: Drone) => void;
}

export const DroneList: React.FC<DroneListProps> = ({ drones, onDroneSelect }) => {
    return (
        <div className="panel-segment">
            <h3 className="segment-title">Active Drones</h3>
            <div className="drone-list">
                {drones.map(drone => (
                    <div
                        key={drone.id}
                        className="drone-item"
                        onClick={() => onDroneSelect(drone)}
                    >
                        <div className="drone-icon">🚁</div>
                        <div className="drone-info">
                            <div className="drone-name">{drone.name}</div>
                            <div className={`drone-status status-${drone.status.toLowerCase()}`}>
                                {drone.status}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};