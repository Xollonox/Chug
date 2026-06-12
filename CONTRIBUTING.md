# Contributing to CHUG: Shadow of Fame

Thank you for your interest in improving **CHUG: Shadow of Fame**.

This project is created and maintained by **Xollonox**. Contributions should respect the original style, tone, and creative direction of the game.

---

## Before Contributing

Please make sure your change is useful, clean, and tested locally.

Good contributions include:

- Bug fixes
- UI polish
- Performance improvements
- Accessibility improvements
- Mobile layout fixes
- Documentation improvements
- Small gameplay improvements that match the current design

Please avoid:

- Replacing the creative direction without discussion
- Adding large external dependencies without a strong reason
- Committing generated logs or temporary server files
- Mixing unrelated changes in one pull request

---

## Local Setup

Clone the repository:

```bash
git clone https://github.com/Xollonox/Chug.git
cd Chug
```

Run a local server:

```bash
python3 -m http.server 8000
```

Open:

```text
http://localhost:8000/
```

---

## Development Rules

- Keep the project dependency-free unless approved.
- Keep the browser game playable without a build step.
- Test on desktop and mobile if your change affects layout or controls.
- Keep commits clear and descriptive.
- Do not commit private files, logs, temporary files, or local server artifacts.

---

## Pull Request Checklist

Before opening a pull request, confirm:

- [ ] The game still loads from `index.html`.
- [ ] No console-breaking errors were introduced.
- [ ] The layout still works on desktop.
- [ ] Mobile landscape mode was considered for UI changes.
- [ ] Only relevant files are included.
- [ ] The change matches the project style.

---

## Project Ownership

The game and creative direction belong to **Xollonox**. Contributions may be accepted, modified, or rejected to protect the quality and identity of the project.
