export interface Drone {
    id: number;
    name: string;
    position: [number, number];
    status: "Active" | "Standby" | "Maintenance";
}

export interface Photo {
    id: number;
    url: string;
    timestamp: string;
}

export interface LayerType {
    id: string;
    name: string;
    source: () => any;
}

// New GeoJSON types
export interface GeoJSONFeatureProperties {
    [key: string]: any;
}

export interface GeoJSONConfig {
    url: string;
    styleProperty?: string;
    colorScale?: { value: number; color: string }[];
}