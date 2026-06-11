import os
import json
from pathlib import Path

from fastapi import FastAPI, APIRouter, Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel


REGISTRATIONS_FILE = Path("registrations.json")


def load_registrations() -> list:
    if REGISTRATIONS_FILE.exists():
        return json.loads(REGISTRATIONS_FILE.read_text())
    return []


def save_registrations(data: list) -> None:
    REGISTRATIONS_FILE.write_text(json.dumps(data, indent=2))


class Registration(BaseModel):
    name: str
    email: str


def create_app(static_dir: str) -> FastAPI:
    api = APIRouter()

    @api.get("/health")
    def health():
        return {"ok": True}

    @api.post("/register")
    def register(reg: Registration):
        registrations = load_registrations()
        # Avoid duplicate emails
        if any(r.get("email") == reg.email for r in registrations):
            return {"status": "already_registered", "message": "This email is already registered!"}
        registrations.append({"name": reg.name, "email": reg.email})
        save_registrations(registrations)
        return {"status": "registered", "message": f"Welcome, {reg.name}! You're registered for the workshop."}

    @api.get("/registrations")
    def list_registrations():
        return load_registrations()

    app = FastAPI()
    app.include_router(api, prefix="/api")

    if os.path.isdir(static_dir):
        assets_dir = os.path.join(static_dir, "assets")
        if os.path.isdir(assets_dir):
            app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

        @app.get("/{path:path}")
        async def spa_fallback(request: Request, path: str):
            file_path = os.path.join(static_dir, path)
            if path and os.path.isfile(file_path):
                return FileResponse(file_path)
            return FileResponse(
                os.path.join(static_dir, "index.html"),
                headers={
                    "Cache-Control": "no-cache, no-store, must-revalidate",
                    "Pragma": "no-cache",
                    "Expires": "0",
                },
            )

    return app
