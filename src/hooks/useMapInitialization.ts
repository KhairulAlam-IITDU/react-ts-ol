import React, { useEffect, useState, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import LayerGroup from "ol/layer/Group";
import { MAP_CONFIG, LAYER_TYPES } from "../constants/initialMapConst";

export const useMapInitialization = (targetRef: React.RefObject<HTMLDivElement | null>) => {
    const mapRef = useRef<Map | null>(null);
    const [isMapReady, setIsMapReady] = useState(false);

    useEffect(() => {
        if (!targetRef.current) return;

        const baseLayers = Object.values(LAYER_TYPES).map(layerType => {
            const layer = new TileLayer({
                source: layerType.source(),
                visible: layerType.id === LAYER_TYPES.DEFAULT.id,
            });
            layer.set('id', layerType.id);
            layer.set('type', 'base');
            return layer;
        });

        const baseLayerGroup = new LayerGroup({
            layers: baseLayers,
        });
        baseLayerGroup.set('title', 'Base Layers');

        const mapInstance = new Map({
            target: targetRef.current,
            layers: [baseLayerGroup],
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