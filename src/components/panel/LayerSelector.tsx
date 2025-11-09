import React from "react";
import { LAYER_TYPES } from "../../constants/initialMapConst";

interface LayerSelectorProps {
    selectedLayer: string;
    onLayerChange: (layerId: string) => void;
}

export const LayerSelector: React.FC<LayerSelectorProps> = ({ selectedLayer, onLayerChange }) => {
    return (
        <div className="panel-segment">
            <h3 className="segment-title">Map Layers</h3>
            <div className="layer-options">
                {Object.values(LAYER_TYPES).map(layer => (
                    <button
                        key={layer.id}
                        className={`layer-btn ${selectedLayer === layer.id ? 'active' : ''}`}
                        onClick={() => onLayerChange(layer.id)}
                    >
                        {layer.name}
                    </button>
                ))}
            </div>
        </div>
    );
};