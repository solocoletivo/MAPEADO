import csv
from pathlib import Path

DATA_PATH = Path(__file__).resolve().parents[2] / "data" / "ourinhos_equipamentos.csv"


def load_sample_points_geojson() -> dict:
    features: list[dict] = []

    with DATA_PATH.open("r", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        for row in reader:
            lat = float(row["latitude"])
            lon = float(row["longitude"])

            features.append(
                {
                    "type": "Feature",
                    "geometry": {"type": "Point", "coordinates": [lon, lat]},
                    "properties": {
                        "id": row["id"],
                        "nome": row["nome"],
                        "categoria": row["categoria"],
                        "descricao": row["descricao"],
                        "endereco": row["endereco"],
                        "status": row["status"],
                    },
                }
            )

    return {"type": "FeatureCollection", "features": features}
