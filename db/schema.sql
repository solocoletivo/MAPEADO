CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE IF NOT EXISTS camada_pontos (
  id BIGSERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  categoria TEXT NOT NULL,
  descricao TEXT,
  endereco TEXT,
  status TEXT DEFAULT 'ativo',
  atualizado_em TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  geom geometry(Point, 4326) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_camada_pontos_geom
  ON camada_pontos
  USING GIST (geom);
