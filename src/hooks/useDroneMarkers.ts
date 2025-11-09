import { useEffect } from "react";
import Map from "ol/Map";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Style, Icon } from "ol/style";
import { fromLonLat } from "ol/proj";
import { MOCK_DRONES } from "../constants/initialMapConst";
import type { Drone } from "../types";

export const useDroneMarkers = (
    map: Map | null,
    isReady: boolean,
    onDroneClick: (drone: Drone) => void
) => {
    useEffect(() => {
        if (!map || !isReady) return;

        const features = MOCK_DRONES.map(drone => {
            const feature = new Feature({
                geometry: new Point(fromLonLat(drone.position)),
                drone: drone
            });

            feature.setStyle(new Style({
                image: new Icon({
                    src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="%23e74c3c" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
                    scale: 1,
                })
            }));

            return feature;
        });

        const vectorSource = new VectorSource({ features });
        const vectorLayer = new VectorLayer({
            source: vectorSource,
            zIndex: 1000
        });
        vectorLayer.set('type', 'overlay');

        map.addLayer(vectorLayer);

        const handleMapClick = (event: any) => {
            map.forEachFeatureAtPixel(event.pixel, (feature) => {
                const drone = feature.get('drone');
                if (drone) {
                    onDroneClick(drone);
                    return true;
                }
                return false;
            });
        };

        map.on('click', handleMapClick);

        return () => {
            map.removeLayer(vectorLayer);
            map.un('click', handleMapClick);
        };
    }, [map, isReady, onDroneClick]);
};