# Code Standards & Guidelines

## 1. Core Principles
- **KISS (Keep It Simple, Stupid)**: Avoid over-engineering. Write readable code.
- **YAGNI (You Ain't Gonna Need It)**: Don't implement features or abstractions until they are actually required.
- **DRY (Don't Repeat Yourself)**: Abstract shared logic into hooks, utils, or common components.

## 2. TypeScript Standards
- **Strict Mode**: `strict: true` must remain enabled in `tsconfig.json`.
- **Interfaces vs Types**:
  - Use `interface` for object shapes and class definitions.
  - Use `type` for unions, intersections, and primitives.
- **No `any`**: Explicitly type all variables, function parameters, and return values. Use `unknown` if the type is truly dynamic.
- **Enums**: Prefer string literal unions or `const object` over TypeScript `enum`.

## 3. React Development
- **Functional Components**: Use arrow functions for component definitions.
- **Hook Placement**: Keep hooks at the top level of the component.
- **Props Destructuring**: Always destructure props in the function signature.
- **Memoization**: Use `useMemo` and `useCallback` only when performance profiling indicates a need, or for stable dependency references.

```tsx
// Preferred Pattern
interface ButtonProps {
  label: string;
  onClick: () => void;
}

export const MyButton = ({ label, onClick }: ButtonProps) => {
  return <button onClick={onClick}>{label}</button>;
};
```

## 4. Directory & File Naming
- **Components**: PascalCase (e.g., `ProjectCard.tsx`).
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth.ts`).
- **Utils/Types**: kebab-case or camelCase (e.g., `format-date.ts`, `auth.types.ts`).
- **Styles**: Global styles in `index.css`. Component-specific styles via Tailwind classes.

## 5. API Layer
- **Centralization**: All API calls must go through `src/api/endpoints`.
- **Typing**: Every endpoint must have a corresponding request and response type in `src/types/api.types.ts`.
- **Error Handling**: Use the central axios interceptors for global error handling (e.g., 401 logouts).

## 6. State Management
- **Server State**: Always use `TanStack React Query`.
- **UI State**: Use `useState` for local state or `Context` for global UI state (theming, sidebar toggle).
- **Avoid Over-usage of Context**: Don't put everything in Context; it leads to unnecessary re-renders.

## 7. Linting & Formatting
- **Biome**: We use Biome for both linting and formatting.
- **Pre-commit**: Ensure `pnpm lint` and `pnpm format` pass before committing.
- **Config**: Settings are defined in `biome.json`.

## 8. Testing Strategy
- **Unit Tests**: For utility functions and pure logic.
- **Component Tests**: For complex UI interactions.
- **Naming**: `[filename].test.ts` or `[filename].spec.tsx`.

## 9. CSS & Styling
- **Tailwind CSS 4**: Use utility classes exclusively.
- **Dynamic Classes**: Use the `cn()` utility from `src/lib/utils.ts`.
- **Variables**: Use CSS variables for theme-specific colors in `index.css`.

```tsx
import { cn } from "@/lib/utils";

const MyComponent = ({ className, active }) => (
  <div className={cn("base-style", active && "active-style", className)}>
    Content
  </div>
);
```
