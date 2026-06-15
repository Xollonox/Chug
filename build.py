#!/usr/bin/env python3
"""
CHUG: Shadow of Fame build helper.

This project is intentionally static: index.html, styles.css, and game.js are served directly by GitHub Pages.
Running this script performs a lightweight sanity check only. No bundling, transpiling, or dependency install is required.
"""
from pathlib import Path

REQUIRED_FILES = ["index.html", "styles.css", "game.js"]


def main() -> int:
    root = Path(__file__).resolve().parent
    missing = [name for name in REQUIRED_FILES if not (root / name).is_file()]

    if missing:
        print("Missing required static files:")
        for name in missing:
            print(f"- {name}")
        return 1

    print("CHUG static sanity check passed. No build step required.")
    
    local_engine = root / "game_engine.js"
    if local_engine.is_file():
        print("[INFO] Local game_engine.js detected! The game loader will run in offline mode.")
    else:
        print("[INFO] No local game_engine.js found. The game loader will fetch the engine from CDN at runtime.")
        print("       To enable offline play and local engine development, save the engine script as 'game_engine.js'.")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
