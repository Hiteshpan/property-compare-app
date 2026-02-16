from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import random
import os

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---- SAFE MODEL LOADER ----
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, "complex_price_model_v2.pkl")

try:
    with open(model_path, "rb") as f:
        model = pickle.load(f)
    print("Model loaded successfully")
except Exception as e:
    print("Model failed to load, using fallback model")
    
    class FallbackModel:
        def predict(self, data):
            base_price = 50000
            price = (
                base_price +
                data["bedrooms"] * 20000 +
                data["bathrooms"] * 15000 +
                data["school_rating"] * 10000 +
                (data["lot_area"] if data["property_type"] == "SFH" else data["building_area"]) * 5 +
                (20000 if data["has_pool"] else 0) +
                (15000 if data["has_garage"] else 0)
            )
            return price

    model = FallbackModel()


class CompareRequest(BaseModel):
    address1: str
    address2: str


def generate_property_data(address: str):
    property_type = random.choice(["SFH", "Condo"])

    return {
        "property_type": property_type,
        "lot_area": random.randint(2000, 6000) if property_type == "SFH" else 0,
        "building_area": random.randint(800, 2000) if property_type == "Condo" else 0,
        "bedrooms": random.randint(2, 5),
        "bathrooms": random.randint(1, 4),
        "year_built": random.randint(1995, 2022),
        "has_pool": random.choice([True, False]),
        "has_garage": random.choice([True, False]),
        "school_rating": random.randint(5, 10)
    }


@app.post("/compare")
async def compare_properties(request: CompareRequest):

    prop1 = generate_property_data(request.address1)
    prop2 = generate_property_data(request.address2)

    price1 = model.predict(prop1)
    price2 = model.predict(prop2)

    return {
        "property1": {
            "address": request.address1,
            "features": prop1,
            "predicted_price": price1
        },
        "property2": {
            "address": request.address2,
            "features": prop2,
            "predicted_price": price2
        }
    }
