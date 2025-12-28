import type { NavItem } from '@/types';

interface UserWithPermissions {
  permissions: string[];
}

/**
 * Recursively filter navigation items based on user permissions
 * Items without permissions are always visible
 */
export const filterNavByPermissions = (
  items: NavItem[],
  user: UserWithPermissions | null
): NavItem[] => {
  if (!user) return [];

  return (
    items
      .filter((item) => {
        // No permissions required = visible to all authenticated users
        if (!item.permissions?.length) return true;
        // Check if user has at least one required permission
        return item.permissions.some((p) => user.permissions.includes(p));
      })
      .map((item) => ({
        ...item,
        // Recursively filter children
        children: item.children ? filterNavByPermissions(item.children, user) : undefined,
      }))
      // Remove items with empty children arrays
      .filter((item) => !item.children || item.children.length > 0)
  );
};
