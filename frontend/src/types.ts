export type GeoFeature = {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: {
    id: string;
    nome: string;
    categoria: string;
    descricao: string;
    endereco: string;
    status: string;
  };
};

export type FeatureCollection = {
  type: "FeatureCollection";
  features: GeoFeature[];
};
