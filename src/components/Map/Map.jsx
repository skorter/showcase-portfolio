"use client";
import { Map, Overlay, ZoomControl, GeoJsonLoader } from "pigeon-maps";
import { useState } from "react";

const netherlandsGeoJson =
  "https://raw.githubusercontent.com/johan/world.geo.json/master/countries/NLD.geo.json";
const bulgariaGeoJson =
  "https://raw.githubusercontent.com/johan/world.geo.json/master/countries/BGR.geo.json";

const markerVarna = [43.2140504, 27.9147333];
const markerEindhoven = [51.4416, 5.4697];

const centerMarker = [
  (markerVarna[0] + markerEindhoven[0]) / 2 + 6,
  (markerVarna[1] + markerEindhoven[1]) / 2 - 1,
];

const zoomLevel = 3;

export default function MyMap() {
  const [center, setCenter] = useState(centerMarker);
  const [zoom, setZoom] = useState(zoomLevel);
  const stickerSize = zoom >= 8 ? 150 : 120;

  return (
    <Map
      provider={(x, y, z) =>
        `https://tiles.stadiamaps.com/tiles/stamen_toner_lite/${z}/${x}/${y}.png?api_key=${process.env.NEXT_PUBLIC_MAP_7DAYTRIAL_API_KEY}`
      }
      center={center}
      zoom={zoom}
      onBoundsChanged={({ center, zoom, initial }) => {
        if (initial) return;
        setCenter(center);
        setZoom(zoom);
      }}
    >
      <GeoJsonLoader
        link={bulgariaGeoJson}
        styleCallback={(feature, hover) => ({
          fill: "#000",
          stroke: "#000",
          strokeWidth: zoom >= 5 ? "2" : "5",
          fillOpacity: zoom >= 5 ? 0 : 1,
        })}
      />
      <GeoJsonLoader
        link={netherlandsGeoJson}
        styleCallback={(feature, hover) => ({
          fill: "#000",
          stroke: "#000",
          strokeWidth: zoom >= 5 ? "2" : "5",
          fillOpacity: zoom >= 5 ? 0 : 1,
        })}
      />
      <Overlay anchor={markerEindhoven}>
        <img
          src="stickers/28.png"
          width={stickerSize}
          height={stickerSize}
          style={{ transform: "translate(-50%, -100%)", cursor: "pointer" }}
          onClick={() => {
            setCenter([markerEindhoven[0] + 0.01, markerEindhoven[1]]);
            setZoom(12);
          }}
        />
      </Overlay>
      <Overlay anchor={markerVarna}>
        <img
          src="stickers/29.png"
          width={stickerSize}
          height={stickerSize}
          style={{ transform: "translate(-50%, -90%)", cursor: "pointer" }}
          onClick={() => {
            setCenter([markerVarna[0] + 0.01, markerVarna[1]]);
            setZoom(12);
          }}
        />
      </Overlay>
      <ZoomControl />
    </Map>
  );
}
