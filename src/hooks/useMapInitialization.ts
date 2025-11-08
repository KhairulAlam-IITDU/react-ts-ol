import React, { useEffect, useState, useRef } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { MAP_CONFIG } from "../constants/initialMapConst.ts";

export const useMapInitialization = (targetRef: React.RefObject<HTMLDivElement | null>) => {
    const mapRef = useRef<Map | null>(null);
    const [isMapReady, setIsMapReady] = useState(false);

    useEffect(() => {
        if (!targetRef.current) return;

        const mapInstance = new Map({
            target: targetRef.current,
            layers: [new TileLayer({ source: new OSM() })],
            view: new View({
                center: MAP_CONFIG.initialCenter,
                zoom: MAP_CONFIG.initialZoom,
            }),
        });

        mapRef.current = mapInstance;
        setIsMapReady(true);

        return () => {
            mapInstance.setTarget(undefined);
            mapRef.current = null;
            setIsMapReady(false);
        };
    }, []);

    return { map: mapRef.current, isMapReady };
};