# Dihouse Frontend

A modern property management and real estate operations dashboard built with React, TypeScript, and Tailwind CSS 4.

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (v9+)

### Installation
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Build & Preview
```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 🛠 Tech Stack

- **Core**: [React 18.3](https://react.dev/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
- **State Management**: [TanStack React Query v5](https://tanstack.com/query/latest)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Linting/Formatting**: [Biome](https://biomejs.dev/)
- **Themes**: [next-themes](https://github.com/pacocoursey/next-themes)

## 📁 Project Structure

```text
src/
├── api/           # Axios client & typed endpoints
├── components/    # Reusable UI & Layout components
├── features/      # Domain modules (future use)
├── hooks/         # Business logic & data fetching hooks
├── layouts/       # Structural shells (Auth, Dashboard)
├── pages/         # View components
├── providers/     # Global Context Providers
├── routes/        # Routing & Protection config
├── types/         # TypeScript interfaces
└── utils/         # Helper functions
```

## 📖 Documentation

For more detailed information, please refer to the following documentation files:

| Document | Description |
| :--- | :--- |
| [Project Overview](./docs/project-overview-pdr.md) | Vision, Functional & Non-functional requirements. |
| [Codebase Summary](./docs/codebase-summary.md) | Technical overview of directories and data flow. |
| [Code Standards](./docs/code-standards.md) | Development guidelines and best practices. |
| [System Architecture](./docs/system-architecture.md) | High-level design and architectural patterns. |

## 🛡 Security & Auth

The application implements a robust Authentication and RBAC (Role-Based Access Control) system:
- **Cookie-based Auth**: Automatic session management.
- **Permission Provider**: Granular access control for UI elements.
- **Protected Routes**: Middleware-style route guarding.

## 💅 Development Workflow

- **Linting**: We use Biome for ultra-fast linting and formatting.
- **Standard**: Follow the PascalCase for components and camelCase for hooks.
- **Styling**: Always use Tailwind utility classes; avoid custom CSS where possible.

---

Built with ❤️ for the Dihouse Team.
