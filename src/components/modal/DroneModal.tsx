import React from "react";
import { MOCK_PHOTOS } from "../../constants/initialMapConst";
import type { Drone } from "../../types";

interface DroneModalProps {
    drone: Drone | null;
    onClose: () => void;
}

export const DroneModal: React.FC<DroneModalProps> = ({ drone, onClose }) => {
    if (!drone) return null;

    const photos = MOCK_PHOTOS(drone.id);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                <h2 className="modal-title">{drone.name}</h2>
                <div className="modal-info">
                    <span>Status: <strong>{drone.status}</strong></span>
                    <span>Position: {drone.position[0].toFixed(4)}, {drone.position[1].toFixed(4)}</span>
                </div>
                <h3 className="photos-title">Recent Captures</h3>
                <div className="photos-grid">
                    {photos.map(photo => (
                        <div key={photo.id} className="photo-card">
                            <img src={photo.url} alt={`Capture ${photo.id}`} />
                            <div className="photo-timestamp">{photo.timestamp}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};