# Project Overview & Product Development Requirements (PDR)

## Project Vision
Dihouse Frontend is a modern, high-performance web application designed for property management and real estate operations. It provides a robust, scalable interface for managing projects, user permissions, and dashboards with a focus on developer experience and clean architecture.

## Tech Stack Summary
| Category | Technology |
| :--- | :--- |
| **Framework** | React 19 (React 18.3 used in implementation) |
| **Build Tool** | Vite |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 4 + Shadcn UI |
| **Routing** | React Router 7 |
| **State Management** | TanStack React Query (Server), React Context (Auth/UI) |
| **Forms** | React Hook Form + Zod |
| **Linting/Formatting** | Biome |

## Core Functional Requirements

### 1. Authentication & Session Management
- **Login/Logout**: Secure credential-based authentication.
- **Persistent Sessions**: Cookie-based authentication with automatic token handling.
- **Protected Routes**: Middleware-like route protection based on authentication state.

### 2. Role-Based Access Control (RBAC)
- **Granular Permissions**: System-wide permission checking via `PermissionProvider`.
- **Component-Level Access**: `Protected` wrapper for UI elements based on required permissions.
- **Hook-Based Checks**: `usePermissions` hook for programmatic access control.

### 3. Dashboard & Resource Management
- **Project Tracking**: CRUD operations for property projects via `useProjects`.
- **Global Search/Filter**: Capabilities to manage large sets of property data.
- **Data Visualization**: Responsive layouts for metrics and lists.

### 4. User Experience
- **Theme Support**: Integrated `next-themes` for light/dark/system modes.
- **Notifications**: Toast notifications via `sonner`.
- **Responsive Design**: Mobile-first layouts with `mobile-menu-overlay`.

## Non-Functional Requirements

### Performance
- **Lazy Loading**: Route-based code splitting for faster initial loads.
- **Optimized Assets**: Modern bundling via Vite and LightningCSS (Tailwind 4).
- **Caching**: Efficient server-state caching with React Query.

### Scalability
- **Feature-Based Architecture**: Ready for domain-specific modules in `src/features`.
- **Atomic Components**: Reusable UI primitives in `src/components/ui`.
- **Typed API**: Centralized Axios client with shared TypeScript interfaces.

### Security
- **XSS Prevention**: React-native sanitization and Zod validation.
- **CSRF Protection**: Handled via secure cookie policies and interceptors.
- **Type Safety**: End-to-end TypeScript coverage from API to UI.

## Implementation Roadmap
1. [x] Core architecture and project initialization.
2. [x] API layer with authentication interceptors.
3. [x] Layout system (Auth, Dashboard, Root).
4. [ ] Migration of domain logic to `src/features`.
5. [ ] Comprehensive unit and integration testing.
6. [ ] CI/CD pipeline integration.
