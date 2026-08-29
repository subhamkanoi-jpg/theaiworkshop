"""Local-only static file wrapper around the single API in api/index.py."""

import os

from fastapi import FastAPI, Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from api.index import app as api_app


def create_app(static_dir: str) -> FastAPI:
    app = api_app

    if os.path.isdir(static_dir):
        assets_dir = os.path.join(static_dir, "assets")
        if os.path.isdir(assets_dir):
            app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

        @app.get("/{path:path}")
        async def spa_fallback(request: Request, path: str):
            file_path = os.path.join(static_dir, path)
            if path and os.path.isfile(file_path):
                return FileResponse(file_path)
            slug = path.rstrip("/").lower()
            named = {
                "book": "book.html",
                "workshop": "workshop.html",
                "path": "path.html",
                "room": "room.html",
                "host": "host.html",
                "kolkata": "kolkata.html",
                "about": "about.html",
            }
            named_file = named.get(slug)
            if named_file:
                named_path = os.path.join(static_dir, named_file)
                if os.path.isfile(named_path):
                    return FileResponse(named_path)
            index = os.path.join(static_dir, "index.html")
            return FileResponse(
                index,
                headers={
                    "Cache-Control": "no-cache, no-store, must-revalidate",
                    "Pragma": "no-cache",
                    "Expires": "0",
                },
            )

    return app
