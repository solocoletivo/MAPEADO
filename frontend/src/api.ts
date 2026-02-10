import type { FeatureCollection } from "./types";

const API_BASE = "http://localhost:8000/api/v1";

export async function fetchEquipamentos(): Promise<FeatureCollection> {
  const response = await fetch(`${API_BASE}/layers/equipamentos-publicos`);
  if (!response.ok) {
    throw new Error("Falha ao buscar camada de equipamentos públicos.");
  }

  return response.json() as Promise<FeatureCollection>;
}
