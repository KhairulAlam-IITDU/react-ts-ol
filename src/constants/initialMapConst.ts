import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
import type { Drone, LayerType } from "../types";
import { fromLonLat } from "ol/proj";

export const MAP_CONFIG = {
    initialCenter: fromLonLat([10.7522, 59.9139]), // Oslo
    initialZoom: 5,
    animationDuration: 500,
};

export const LAYER_TYPES: Record<string, LayerType> = {
    DEFAULT: {
        id: 'default',
        name: 'Default',
        source: () => new OSM()
    },
    HUMANITARIAN: {
        id: 'humanitarian',
        name: 'Humanitarian',
        source: () => new OSM({
            url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
            attributions: '© OpenStreetMap contributors'
        })
    },
    TERRAIN: {
        id: 'terrain',
        name: 'Terrain',
        source: () => new XYZ({
            url: 'https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}.png',
            attributions: '© Stadia Maps © Stamen Design'
        })
    }
};

export const MOCK_DRONES: Drone[] = [
    { id: 1, name: "Drone Alpha", position: [10.7522, 59.9139], status: "Active" }, // Oslo
    { id: 2, name: "Drone Beta", position: [5.3221, 60.3913], status: "Active" }, // Bergen
    { id: 3, name: "Drone Gamma", position: [10.3951, 63.4305], status: "Standby" }, // Trondheim
    { id: 4, name: "Drone Delta", position: [18.9553, 69.6492], status: "Active" }, // Tromsø
    { id: 5, name: "Drone Epsilon", position: [5.7331, 58.9700], status: "Maintenance" }, // Stavanger
];

export const MOCK_PHOTOS = (droneId: number) => [
    { id: 1, url: `https://picsum.photos/200/150?random=${droneId}1`, timestamp: "2 min ago" },
    { id: 2, url: `https://picsum.photos/200/150?random=${droneId}2`, timestamp: "5 min ago" },
    { id: 3, url: `https://picsum.photos/200/150?random=${droneId}3`, timestamp: "12 min ago" },
    { id: 4, url: `https://picsum.photos/200/150?random=${droneId}4`, timestamp: "25 min ago" },
    { id: 5, url: `https://picsum.photos/200/150?random=${droneId}5`, timestamp: "1 hour ago" },
];