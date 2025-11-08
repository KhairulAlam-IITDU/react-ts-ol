import React, { useRef } from "react";
import "ol/ol.css";
import { useMapInitialization } from "../../hooks/useMapInitialization.ts";
import { useMapClickHandler } from "../../hooks/useMapClickHandler.ts";

const MapView: React.FC = () => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const {map, isMapReady} = useMapInitialization(mapRef);

    useMapClickHandler(map, isMapReady);

    return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};

export default MapView;
