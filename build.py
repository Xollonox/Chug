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
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
