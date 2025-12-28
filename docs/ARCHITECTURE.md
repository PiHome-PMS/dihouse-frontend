# Feature-Based Architecture

## Overview

DiHouse follows **Bulletproof React** feature-based architecture. Each business domain is a self-contained module in `src/features/`.

## Directory Structure

```
src/
├── features/                    # Domain-specific modules
│   └── {feature-name}/
│       ├── api/                 # API hooks (useFeatureData, mutations)
│       ├── components/          # Feature-specific UI components
│       ├── hooks/               # Feature-specific logic hooks
│       ├── pages/               # Route-level page components
│       ├── types/               # TypeScript interfaces/types
│       └── index.ts             # Public API (barrel export)
├── pages/                       # Non-feature pages (Home, 404, etc.)
├── components/                  # Shared UI components
│   ├── ui/                      # Atomic components (shadcn/ui)
│   ├── common/                  # App-wide components
│   └── layout/                  # Layout components
├── config/                      # App configuration
│   └── navigation.config.ts     # Sidebar navigation config
├── hooks/                       # Shared hooks
├── utils/                       # Shared utilities
└── types/                       # Shared types
```

## Import Rules

### DO ✅
```typescript
import { DashboardPage, StatCard } from '@/features/dashboard';
```

### DON'T ❌
```typescript
import { StatCard } from '@/features/dashboard/components/StatCard';
```

## Placement Rules

| Code Type | Location |
|-----------|----------|
| Used by 1 feature | `features/{name}/` |
| Used by 2 features | Keep in original, import |
| Used by 3+ features | Move to `shared/` or `components/` |

## Adding a New Feature

### Quick Start (Recommended)

Use the CLI command to scaffold a new feature:

```bash
pnpm create-feature <feature-name>
```

**Example:**
```bash
pnpm create-feature users
pnpm create-feature order-management
```

This creates:
```
src/features/{name}/
├── api/
├── components/
├── hooks/
├── pages/{Name}Page.tsx
├── types/{name}.types.ts
└── index.ts
```

### Manual Steps After Scaffolding

#### 1. Update barrel export
```typescript
// src/features/{name}/index.ts - uncomment exports
export { FeaturePage } from './pages/FeaturePage';
```

#### 2. Add route
```typescript
// src/routes/routes.tsx
const FeaturePage = lazy(() =>
  import('@/features/{name}').then((m) => ({ default: m.FeaturePage }))
);

// Add to routes array
{ path: '/{name}', element: <FeaturePage /> }
```

#### 3. Add navigation item
```typescript
// src/config/navigation.config.ts
{
  id: '{name}',
  label: 'Feature Name',
  path: '/{name}',
  icon: FeatureIcon,
  permissions: ['feature:read'], // Optional RBAC
}
```

## Navigation Config

Navigation is centralized in `src/config/navigation.config.ts`:

```typescript
import type { NavItem } from '@/types';

export const navigationConfig: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'users',
    label: 'Users',
    path: '/users',
    icon: Users,
    permissions: ['users:read'], // RBAC filtering
  },
];
```

### RBAC Filtering

The sidebar automatically filters items based on user permissions using `filterNavByPermissions()`.

## Component Naming

- Pages: `{Feature}Page.tsx` (PascalCase)
- Components: `{Component}.tsx` (PascalCase)
- Types: `{feature}.types.ts` (kebab-case)
- Hooks: `use{Feature}.ts` (camelCase)
