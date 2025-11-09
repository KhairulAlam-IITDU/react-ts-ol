import { useEffect } from "react";
import Map from "ol/Map";
import { MAP_CONFIG } from "../constants/initialMapConst";
import { MapBrowserEvent } from "ol";

export const useMapClickHandler = (map: Map | null, isReady: boolean) => {
    useEffect(() => {
        if (!map || !isReady) return;

        const handleClick = (event: MapBrowserEvent) => {
            const clickedCoordinate = event.coordinate;

            map.getView().animate({
                center: clickedCoordinate,
                duration: MAP_CONFIG.animationDuration,
            });
        };

        map.on("click", handleClick);

        return () => {
            map.un("click", handleClick);
        };
    }, [map, isReady]);
};