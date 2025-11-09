import { useEffect } from "react";
import Map from "ol/Map";
import LayerGroup from "ol/layer/Group";
import TileLayer from "ol/layer/Tile";

export const useLayerManager = (map: Map | null, isReady: boolean, selectedLayer: string) => {
    useEffect(() => {
        if (!map || !isReady) return;

        const layers = map.getLayers();
        const baseLayerGroup = layers.item(0) as LayerGroup;

        if (baseLayerGroup) {
            baseLayerGroup.getLayers().forEach((layer) => {
                const tileLayer = layer as TileLayer;
                const layerId = tileLayer.get('id');
                const isBase = tileLayer.get('type') === 'base';

                if (isBase) {
                    tileLayer.setVisible(layerId === selectedLayer);
                }
            });
        }
    }, [map, isReady, selectedLayer]);
};