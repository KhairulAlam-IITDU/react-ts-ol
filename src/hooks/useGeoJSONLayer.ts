import { useEffect, useCallback } from "react";
import Map from "ol/Map";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { Style, Fill, Stroke } from "ol/style";
import type { GeoJSONConfig, GeoJSONFeatureProperties } from "../types";

const getColorForValue = (value: number, colorScale: { value: number; color: string }[]): string => {
    for (const scale of colorScale) {
        if (value >= scale.value) {
            return scale.color;
        }
    }
    return colorScale[colorScale.length - 1].color;
};

export const useGeoJSONLayer = (
    map: Map | null,
    isReady: boolean,
    config: GeoJSONConfig,
    enabled: boolean,
    onFeatureClick: (properties: GeoJSONFeatureProperties, coordinate: number[]) => void
) => {
    const handleMapClick = useCallback((event: any) => {
        if (!map) return;

        const features = map.getFeaturesAtPixel(event.pixel);
        if (features && features.length > 0) {
            const feature = features[0];
            const properties = feature.getProperties();

            if (properties && config.styleProperty && properties[config.styleProperty] !== undefined) {
                onFeatureClick(properties, event.coordinate);
            }
        }
    }, [map, config.styleProperty, onFeatureClick]);

    useEffect(() => {
        if (!map || !isReady || !enabled) return;

        const styleFunction = (feature: any) => {
            const properties = feature.getProperties();
            let color = '#fff5eb';

            if (config.styleProperty && config.colorScale && properties[config.styleProperty] !== undefined) {
                color = getColorForValue(properties[config.styleProperty], config.colorScale);
            }

            return new Style({
                stroke: new Stroke({
                    color: 'black',
                    width: 0.7,
                }),
                fill: new Fill({
                    color: color,
                }),
            });
        };

        const vectorSource = new VectorSource({
            url: config.url,
            format: new GeoJSON(),
        });

        const vectorLayer = new VectorLayer({
            source: vectorSource,
            style: styleFunction,
            zIndex: 500,
        });
        vectorLayer.set('type', 'geojson');

        map.addLayer(vectorLayer);
        map.on('click', handleMapClick);

        return () => {
            map.removeLayer(vectorLayer);
            map.un('click', handleMapClick);
        };
    }, [map, isReady, enabled, config, handleMapClick]);
};