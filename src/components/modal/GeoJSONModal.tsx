import React, { useEffect, useRef } from "react";
import type { GeoJSONFeatureProperties } from "../../types";

interface GeoJSONModalProps {
    properties: GeoJSONFeatureProperties | null;
    coordinate: number[] | null;
    onClose: () => void;
}

export const GeoJSONModal: React.FC<GeoJSONModalProps> = ({
                                                                  properties,
                                                                  coordinate,
                                                                  onClose
                                                              }) => {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (overlayRef.current && coordinate) {
            // Positioning logic if needed
        }
    }, [coordinate]);

    if (!properties) return null;

    const formatPopulation = (pop: number) => {
        if (pop >= 1000000000) return `${(pop / 1000000000).toFixed(1)}B`;
        if (pop >= 1000000) return `${(pop / 1000000).toFixed(1)}M`;
        if (pop >= 1000) return `${(pop / 1000).toFixed(1)}K`;
        return pop.toString();
    };

    return (
        <div className="geojson-popup-overlay" onClick={onClose}>
            <div
                ref={overlayRef}
                className="geojson-popup"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="geojson-popup-closer" onClick={onClose}>
                    ×
                </button>
                <div className="geojson-popup-content">
                    <h3>{properties.name || properties.NAME || 'Unknown Region'}</h3>
                    {properties.pop_est && (
                        <>
                            <p className="geojson-popup-label">Population</p>
                            <p className="geojson-popup-value">
                                {formatPopulation(properties.pop_est)}
                            </p>
                        </>
                    )}
                    {properties.continent && (
                        <p className="geojson-popup-info">
                            Continent: {properties.continent}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};