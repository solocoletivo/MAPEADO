# Mapeado Ourinhos-SP

Esqueleto inicial de um portal aberto de geovisualização para o município de **Ourinhos (SP)**.

## Objetivo
Disponibilizar um mapa público com camadas temáticas (pontos, rotas e áreas), alimentado por planilhas/datasets oficiais.

## Estrutura do projeto
- `frontend/`: aplicação React + TypeScript + Leaflet para visualização no mapa.
- `backend/`: API FastAPI para servir dados geoespaciais em GeoJSON.
- `db/`: scripts SQL iniciais (PostgreSQL + PostGIS).
- `PROPOSTA_GEOVISUALIZACAO_MUNICIPAL.md`: visão funcional e roadmap.

## Como rodar (esqueleto)
### 1) Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 2) Frontend
```bash
cd frontend
npm install
npm run dev
```

### 3) Acessos
- Frontend: `http://localhost:5173`
- API: `http://localhost:8000`
- GeoJSON de pontos: `http://localhost:8000/api/v1/layers/equipamentos-publicos`

## Próximos passos recomendados
1. Conectar upload de planilhas reais do município.
2. Persistir dados no PostGIS.
3. Criar painel administrativo para atualização de camadas.
4. Adicionar rotas/linhas e polígonos oficiais de bairros/distritos.
