from fastapi import APIRouter

from app.services.geojson_service import load_sample_points_geojson

router = APIRouter(tags=["layers"])


@router.get("/layers/equipamentos-publicos")
def get_public_facilities() -> dict:
    return load_sample_points_geojson()
