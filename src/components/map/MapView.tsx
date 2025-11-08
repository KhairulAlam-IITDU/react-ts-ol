import React, { useEffect, useRef } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

const MapView: React.FC = () => {
    const mapRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!mapRef.current) return;

        const map = new Map({
            target: mapRef.current,
            layers: [new TileLayer({ source: new OSM() })],
            view: new View({ center: [0, 0], zoom: 2 }),
        });

        return () => map.setTarget(undefined);
    }, []);

    return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};

export default MapView;
