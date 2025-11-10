import React from "react";
import { GEOJSON_LEGEND } from "../../constants/initialMapConst";

export const GeoJSONLegend: React.FC = () => {
    return (
        <div className="state-legend">
            <h4>{GEOJSON_LEGEND.title}</h4>
            {GEOJSON_LEGEND.items.map((item, index) => (
                <div key={index} className="legend-row">
                    <span
                        className="legend-color-box"
                        style={{ backgroundColor: item.color }}
                    ></span>
                    {item.label}
                </div>
            ))}
        </div>
    );
};