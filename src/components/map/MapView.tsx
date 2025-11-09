import React from "react";
import "ol/ol.css";

interface MapViewProps {
    mapRef: React.RefObject<HTMLDivElement | null>;
}

export const MapView: React.FC<MapViewProps> = ({ mapRef }) => {
    return (
        <div className="map-container">
            <div ref={mapRef} className="map" />
        </div>
    );
};