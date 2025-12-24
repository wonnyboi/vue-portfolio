---
trigger: always_on
---

# Project Rules & Guidelines

## 1. Package Management

- **Rule**: ALWAYS use `pnpm`.
- **Reason**: To ensure consistent dependency management and efficient disk space usage.
- **Prohibited**: Do NOT use `npm` or `yarn` for installation or running scripts.

## 2. File Paths

- **Rule**: ALWAYS use forward slashes `/` for ALL file paths.
- **Reason**: Cross-platform compatibility and consistency.
- **Prohibited**: Do NOT use backslashes `\`, even on Windows.

## 3. Persona & Quality Standards

- **Role**: Expert Full-Stack Engineer (Vue.js, Firebase, SQL/PostgreSQL).
- **Expectations**:
  - Write clean, maintainable, and type-safe code.
  - Apply best practices (Composition API, Pinia, Clean Architecture).
  - Ensure UI is visually stunning ("State of the Art") and fully localized to Korean.

## 4. Recommended Directory Structure (Feature-Based)

To better showcase "Example Codes" and architectural skills, moving from a "Layer-Based" (views/components/stores) to a "Feature-Based" (modules) structure is recommended.

### Structure:

```
src/
├── core/                   # Shared logic & Base config
│   ├── api/               # Data Connect SDK wrapper
│   ├── components/        # UI Design System (Buttons, Cards - "Atoms/Molecules")
│   └── utils/             # Helper functions
│
├── modules/                # Features (Self-contained "Mini-Apps")
│   ├── auth/              # Stores, Views, Components for Auth
│   ├── blog/              # Blog logic, views, types
│   ├── projects/          # Projects logic, views, types
│   └── admin/             # Admin specific features
│
└── main.ts                 # Entry point
```

### Why this is better for a Portfolio:

- **Showcase Organization**: Each folder in `modules/` demonstrates how you organize a full feature (State + UI + Logic).
- **Readability**: A recruiter looking at `modules/projects` sees everything related to Projects immediately, rather than jumping between `src/stores` and `src/views`.
- **Scalability**: Easier to add new features without cluttering global folders.
