import React from "react";

interface GeoJSONToggleProps {
    enabled: boolean;
    onToggle: (enabled: boolean) => void;
}

export const GeoJSONToggle: React.FC<GeoJSONToggleProps> = ({ enabled, onToggle }) => {
    return (
        <div className="panel-segment">
            <div className="toggle-container">
                <label className="toggle-label">
                    <input
                        type="checkbox"
                        checked={enabled}
                        onChange={(e) => onToggle(e.target.checked)}
                        className="toggle-input"
                    />
                    <span className="toggle-slider"></span>
                    <span className="toggle-text">Population Data</span>
                </label>
            </div>
        </div>
    );
};