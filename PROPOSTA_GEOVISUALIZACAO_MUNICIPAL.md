# Proposta inicial — Site aberto de geovisualização de Ourinhos-SP

## 1) Objetivo do produto
Criar um site público com foco no município de **Ourinhos-SP**, mostrando:
- Um mapa principal em tela.
- Uma legenda/painel lateral com camadas selecionáveis.
- Pontos, rotas e outras geometrias (linhas e polígonos).
- Informações vindas de planilhas (coordenadas + descrições).

## 2) Funcionalidades principais (MVP)
1. **Mapa base interativo** (zoom, pan, clique).
2. **Painel lateral de camadas**:
   - Ativar/desativar temas (saúde, educação, obras, turismo etc.).
   - Filtros por categoria e status.
3. **Importação de planilhas** (CSV/XLSX):
   - Leitura de latitude/longitude e campos descritivos.
   - Validação de dados obrigatórios.
4. **Exibição geográfica**:
   - Pontos (equipamentos públicos, ocorrências, serviços).
   - Rotas/linhas (transporte, coleta, caminhos turísticos).
   - Polígonos (bairros, zonas administrativas, áreas de proteção).
5. **Pop-up de detalhes** no clique do item do mapa.
6. **Busca textual** por nome/local.

## 3) Arquitetura recomendada
### Front-end
- **React + TypeScript**
- **Leaflet** (suficiente para MVP) ou MapLibre GL JS
- UI com componentes simples para filtros e legenda

### Back-end
- **Python + FastAPI**
- API para:
  - Publicar camadas geoespaciais em GeoJSON.
  - Fazer upload e processamento de planilhas.
  - Aplicar filtros e paginação.

### Banco de dados geográfico
- **PostgreSQL + PostGIS**
- Tabelas separadas por tipo de geometria (ou tabela única com coluna geom + tipo)

### Fluxo de dados de planilhas
1. Upload da planilha.
2. Normalização de colunas (nome, categoria, descrição, lat, lon, etc.).
3. Validação (coordenadas válidas, campos obrigatórios, duplicidade).
4. Conversão para geometria.
5. Armazenamento no PostGIS.
6. Disponibilização no mapa via API (GeoJSON/vector tiles futuramente).

## 4) Modelo mínimo de planilha (pontos)
Colunas sugeridas:
- `id`
- `nome`
- `categoria`
- `descricao`
- `latitude`
- `longitude`
- `endereco`
- `status`
- `atualizado_em`

## 5) Camadas sugeridas para iniciar (Ourinhos-SP)
- Equipamentos públicos (escolas, UBS, CRAS etc.)
- Obras em andamento
- Pontos turísticos
- Rotas de transporte/local
- Limites administrativos (bairros/distritos)

## 6) Qualidade de dados e governança
- Definir dicionário de dados (nome e significado de cada coluna).
- Definir responsável por atualização por secretaria/setor.
- Registrar data da última atualização no painel.
- Logs de importação para rastreabilidade.

## 7) Segurança e operação
- Site público para consulta.
- Área administrativa autenticada para upload/edição.
- Versionamento de datasets (rollback simples).
- Backup diário do banco.

## 8) Roadmap de implementação
### Fase 1 (2–4 semanas)
- Mapa base + painel lateral.
- Upload de CSV de pontos.
- Exibição com pop-ups e filtros simples.

### Fase 2 (3–6 semanas)
- Rotas/linhas e polígonos.
- Busca textual e filtros avançados.
- Painel administrativo básico.

### Fase 3 (contínuo)
- Dashboard com métricas.
- Cache, otimização e escalabilidade.
- Integrações com dados oficiais (quando disponível).

## 9) Próximos passos práticos
1. Escolher 1 planilha piloto real de Ourinhos-SP.
2. Padronizar colunas e validar dados.
3. Entregar MVP com 2–3 camadas prioritárias.
4. Coletar feedback dos usuários e iterar.
5. Evoluir para ingestão automatizada e versionada.
