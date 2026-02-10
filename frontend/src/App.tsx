import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";

import { fetchEquipamentos } from "./api";
import type { GeoFeature } from "./types";

const ourinhosCenter: [number, number] = [-22.98, -49.87];

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export function App() {
  const [features, setFeatures] = useState<GeoFeature[]>([]);
  const [showEquipamentos, setShowEquipamentos] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchEquipamentos()
      .then((collection) => {
        setFeatures(collection.features);
      })
      .catch((error: Error) => {
        setErrorMessage(error.message);
      });
  }, []);

  const visibleFeatures = useMemo(() => {
    return showEquipamentos ? features : [];
  }, [features, showEquipamentos]);

  return (
    <div className="layout">
      <aside className="sidebar">
        <h1>Mapeado Ourinhos-SP</h1>
        <p>Portal de visualização geográfica do município.</p>

        <div className="legend-item">
          <label>
            <input
              type="checkbox"
              checked={showEquipamentos}
              onChange={(event) => setShowEquipamentos(event.target.checked)}
            />
            Equipamentos públicos
          </label>
        </div>

        <small>
          Camada piloto carregada por API/planilha. Próximo passo: incluir rotas e
          polígonos.
        </small>

        {errorMessage ? <p className="error">{errorMessage}</p> : null}
      </aside>

      <main className="map-wrapper">
        <MapContainer center={ourinhosCenter} zoom={13} className="map">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {visibleFeatures.map((feature) => (
            <Marker
              key={feature.properties.id}
              position={[
                feature.geometry.coordinates[1],
                feature.geometry.coordinates[0],
              ]}
              icon={markerIcon}
            >
              <Popup>
                <strong>{feature.properties.nome}</strong>
                <br />
                Categoria: {feature.properties.categoria}
                <br />
                {feature.properties.descricao}
                <br />
                Endereço: {feature.properties.endereco}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </main>
    </div>
  );
}
