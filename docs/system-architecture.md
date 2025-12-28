# System Architecture

## Architectural Overview
Dihouse Frontend follows a **Clean Architecture** pattern adapted for React. It emphasizes separation of concerns between the UI, business logic, and data acquisition layers.

## 1. Layered Architecture

### A. Presentation Layer (`src/pages`, `src/layouts`)
- Responsible for rendering the UI and handling user interactions.
- Pages are composed of components and use hooks to interact with business logic.
- Uses `src/layouts` to provide consistent structural shells (e.g., Dashboard Sidebar).

### B. Logic & State Layer (`src/hooks`, `src/providers`)
- Contains custom hooks that encapsulate business logic.
- Context Providers manage global application state (Authentication, Permissions, Theming).
- Decouples UI components from complex state management.

### C. Domain & Feature Layer (`src/features`)
- Future-proof directory for modularizing large feature sets.
- Each feature will eventually contain its own components, hooks, and services.

### D. Infrastructure Layer (`src/api`, `src/lib`)
- **API Client**: Centralized Axios instance with interceptors for authentication and error handling.
- **Lib**: Third-party library configurations (e.g., React Query client, Toast config).
- **Utils**: Pure helper functions without side effects.

## 2. Component Hierarchy
```text
RootLayout
 └── ThemeProvider
      └── QueryProvider
           └── AuthProvider
                └── PermissionProvider
                     └── App (Routing)
                          ├── AuthLayout (Login)
                          └── DashboardLayout (Protected Pages)
                               └── Page Components
```

## 3. Data Flow

### Request Flow
1. **Trigger**: User interacts with a component (e.g., clicks "Save").
2. **Hook**: Component calls a custom hook (e.g., `useUpdateProject`).
3. **API**: Hook invokes an API function from `src/api/endpoints`.
4. **Interceptor**: Request interceptor adds auth headers.
5. **Backend**: Data is sent to the remote server.

### Response Flow
1. **Response**: Server sends JSON back.
2. **Interceptor**: Response interceptor checks for errors (e.g., 401 Unauthorized).
3. **Cache**: React Query updates the local cache.
4. **UI**: Components observing the cache automatically re-render with new data.

## 4. Security Architecture

### Authentication (AuthN)
- Handled via `AuthProvider`.
- Token/Cookie-based authentication.
- Automatic logout on session expiration via 401 interceptor.

### Authorization (AuthZ)
- Handled via `PermissionProvider`.
- Role-Based Access Control (RBAC).
- `Protected` component and `usePermissions` hook for UI-level gating.

## 5. Build & Deployment
- **Bundler**: Vite for fast development and optimized production builds.
- **Language**: TypeScript for compile-time safety.
- **Styles**: Tailwind CSS 4 using the LightningCSS engine.
- **Linting**: Biome for unified linting and formatting at high speed.
