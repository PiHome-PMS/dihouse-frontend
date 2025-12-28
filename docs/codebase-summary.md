# Codebase Summary

## Directory Structure Overview

```bash
src/
├── api/           # API communication layer (Axios)
│   ├── endpoints/ # Specific API resource definitions
│   ├── interceptors/ # Request/Response middleware
│   └── api-client.ts # Central Axios instance
├── components/    # Reusable UI components
│   ├── ui/        # Atomic components (Shadcn/Radix)
│   ├── common/    # Shared logic components (Protected, ThemeToggle)
│   └── layout/    # Structural components (Header, Sidebar)
├── config/        # Environment and global constants
├── features/      # Domain-specific logic (Modules)
├── hooks/         # Custom React hooks (useAuth, useProjects)
├── layouts/       # Page layout templates
├── lib/           # Third-party configurations and utility wrappers
├── pages/         # View components mapped to routes
├── providers/     # React Context providers (Auth, Query, Theme)
├── routes/        # Routing configuration and protection logic
├── types/         # Global TypeScript interfaces/types
└── utils/         # Pure helper functions
```

## Critical Files

| File | Responsibility |
| :--- | :--- |
| `src/main.tsx` | Entry point, initializes providers and React. |
| `src/App.tsx` | Root component, contains routing structure. |
| `src/api/api-client.ts` | Configures Axios with base URL and credentials. |
| `src/providers/AuthProvider.tsx` | Manages authentication state and session lifecycle. |
| `src/routes/routes.tsx` | Centralized route definitions with lazy loading. |
| `src/hooks/usePermissions.ts` | Hook for RBAC permission checks. |

## Data Flow & State Management

### Server State (React Query)
- Handled in `src/hooks/` (e.g., `useProjects.ts`).
- Uses `QueryProvider.tsx` for global configuration.
- Cache invalidation and background fetching are managed per resource.

### Authentication State (Context)
- Centralized in `AuthProvider.tsx`.
- Exposed via `useAuth()` hook.
- Synchronized with `PermissionProvider` for RBAC.

### Component Styling (Tailwind 4)
- Utility-first approach with Tailwind CSS 4.
- Dynamic classes managed via `cn()` helper in `src/lib/utils.ts`.
- Theming controlled through `ThemeProvider.tsx` and `next-themes`.

## External Integrations

1. **Backend API**: Communicates via JSON over HTTPS.
2. **Icons**: `lucide-react` library.
3. **Validations**: `zod` for schema-based validation in forms and API responses.
4. **UI Primitives**: Radix UI (via Shadcn) for accessible components.

## Recent Changes
- Initial project setup with clean architecture.
- Implemented RBAC system with `PermissionProvider`.
- Setup typed API layer with automated interceptors.
- Integrated Tailwind CSS 4 with `@tailwindcss/vite`.
