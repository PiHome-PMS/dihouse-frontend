import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import type {
  PermissionCategory,
  PermissionGroup,
  PermissionItem,
  PermissionSection,
} from '../data/permissionData';

interface PermissionAccordionProps {
  sections: PermissionSection[];
  // Structure: { sectionId: { permissionId: ['view', 'update', ...] } }
  selectedPermissions: Record<string, Record<string, string[]>>;
  onChange: (sectionId: string, permissionId: string, actions: string[]) => void;
}

/**
 * Render a list of permission items with action checkboxes
 */
function PermissionItemList({
  permissions,
  sectionId,
  selectedPermissions,
  onChange,
}: {
  permissions: PermissionItem[];
  sectionId: string;
  selectedPermissions: Record<string, Record<string, string[]>>;
  onChange: (sectionId: string, permissionId: string, actions: string[]) => void;
}) {
  const toggleAction = (permissionId: string, action: string) => {
    const currentActions = selectedPermissions[sectionId]?.[permissionId] || [];
    const newActions = currentActions.includes(action)
      ? currentActions.filter((a) => a !== action)
      : [...currentActions, action];
    onChange(sectionId, permissionId, newActions);
  };

  const toggleAllActionsForPermission = (permissionId: string, allActions: string[]) => {
    const currentActions = selectedPermissions[sectionId]?.[permissionId] || [];
    const allSelected = allActions.every((a) => currentActions.includes(a));
    const newActions = allSelected ? [] : [...allActions];
    onChange(sectionId, permissionId, newActions);
  };

  return (
    <div className="space-y-1">
      {permissions.map((permission) => {
        const actions = permission.actions || ['view'];
        const currentActions = selectedPermissions[sectionId]?.[permission.id] || [];
        const allSelected = actions.every((a) => currentActions.includes(a));
        const someSelected = actions.some((a) => currentActions.includes(a)) && !allSelected;

        return (
          <div
            key={permission.id}
            className="flex items-center justify-between gap-4 p-2 bg-white border border-gray-100 rounded-[3px] hover:bg-gray-50/50 transition-colors"
          >
            {/* Permission name with master checkbox */}
            <div className="flex items-center gap-2 min-w-[180px]">
              <input
                type="checkbox"
                checked={allSelected}
                ref={(el) => {
                  if (el) el.indeterminate = someSelected;
                }}
                onChange={() => toggleAllActionsForPermission(permission.id, actions)}
                className="h-4 w-4 text-primary rounded accent-blue-500"
              />
              <span className="text-sm text-gray-700">{permission.name}</span>
            </div>

            {/* Action checkboxes - aligned to right */}
            <div className="flex items-center gap-3 flex-wrap">
              {actions.map((action) => (
                <label key={action} className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentActions.includes(action)}
                    onChange={() => toggleAction(permission.id, action)}
                    className="h-3.5 w-3.5 rounded accent-blue-500"
                  />
                  <span className="text-xs text-gray-500">{action}</span>
                </label>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Level 3: Permission Group (Quản Lý Quyền, Vận hành công ty...)
 */
function PermissionGroupSection({
  group,
  sectionId,
  selectedPermissions,
  onChange,
}: {
  group: PermissionGroup;
  sectionId: string;
  selectedPermissions: Record<string, Record<string, string[]>>;
  onChange: (sectionId: string, permissionId: string, actions: string[]) => void;
}) {
  return (
    <div className="space-y-2">
      {/* Group title */}
      <div className="text-sm font-semibold text-blue-600 py-1">{group.title}</div>

      {/* Permission items */}
      <PermissionItemList
        permissions={group.permissions}
        sectionId={sectionId}
        selectedPermissions={selectedPermissions}
        onChange={onChange}
      />
    </div>
  );
}

/**
 * Level 2: Permission Category (Công ty, Dự án...)
 */
function PermissionCategorySection({
  category,
  sectionId,
  selectedPermissions,
  onChange,
}: {
  category: PermissionCategory;
  sectionId: string;
  selectedPermissions: Record<string, Record<string, string[]>>;
  onChange: (sectionId: string, permissionId: string, actions: string[]) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Count selected for this category
  const getSelectedCount = () => {
    let total = 0;
    let selected = 0;
    for (const group of category.groups) {
      for (const perm of group.permissions) {
        const actions = perm.actions || ['view'];
        total += actions.length;
        selected += (selectedPermissions[sectionId]?.[perm.id] || []).length;
      }
    }
    return { selected, total };
  };

  const { selected, total } = getSelectedCount();

  return (
    <div className="border border-gray-200 rounded-[3px] overflow-hidden">
      {/* Category header */}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: Category accordion header */}
      <div
        className="flex items-center justify-between p-2 px-3 bg-gray-100 cursor-pointer hover:bg-gray-200/70 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-700">{category.title}</span>
          <span className="text-xs text-gray-400">
            ({selected}/{total})
          </span>
        </div>
        <ChevronDown
          className={cn('h-4 w-4 text-gray-500 transition-transform', isExpanded && 'rotate-180')}
        />
      </div>

      {/* Category content - groups */}
      {isExpanded && (
        <div className="p-3 bg-gray-50/50 space-y-4">
          {category.groups.map((group) => (
            <PermissionGroupSection
              key={group.id}
              group={group}
              sectionId={sectionId}
              selectedPermissions={selectedPermissions}
              onChange={onChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Expandable accordion for permission sections
 * Supports:
 * - Flat permissions (notification)
 * - 2-level groups (app: groups > permissions)
 * - 3-level categories (web: categories > groups > permissions)
 */
export function PermissionAccordion({
  sections,
  selectedPermissions,
  onChange,
}: PermissionAccordionProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]
    );
  };

  const getSelectedCount = (section: PermissionSection) => {
    let total = 0;
    let selected = 0;

    // Flat permissions (notification)
    if (section.permissions) {
      for (const perm of section.permissions) {
        const actions = perm.actions || ['view'];
        total += actions.length;
        selected += (selectedPermissions[section.id]?.[perm.id] || []).length;
      }
    }

    // 2-level groups (app)
    if (section.groups) {
      for (const group of section.groups) {
        for (const perm of group.permissions) {
          const actions = perm.actions || ['view'];
          total += actions.length;
          selected += (selectedPermissions[section.id]?.[perm.id] || []).length;
        }
      }
    }

    // 3-level categories (web)
    if (section.categories) {
      for (const category of section.categories) {
        for (const group of category.groups) {
          for (const perm of group.permissions) {
            const actions = perm.actions || ['view'];
            total += actions.length;
            selected += (selectedPermissions[section.id]?.[perm.id] || []).length;
          }
        }
      }
    }

    return { selected, total };
  };

  return (
    <div className="space-y-3">
      {sections.map((section) => {
        const isExpanded = expandedSections.includes(section.id);
        const { selected, total } = getSelectedCount(section);

        return (
          <div key={section.id} className="border border-gray-200 rounded-[3px] overflow-hidden">
            {/* Main section header (Level 1) */}
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: Accordion header click */}
            <div
              className="flex items-center justify-between p-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => toggleSection(section.id)}
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-700">{section.title}</span>
                <span className="text-xs text-gray-500">
                  ({selected}/{total})
                </span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-gray-400 transition-transform',
                  isExpanded && 'rotate-180'
                )}
              />
            </div>

            {/* Section content */}
            {isExpanded && (
              <div className="p-4 bg-white border-t border-gray-100 space-y-4">
                {/* Flat permissions (notification) */}
                {section.permissions && (
                  <PermissionItemList
                    permissions={section.permissions}
                    sectionId={section.id}
                    selectedPermissions={selectedPermissions}
                    onChange={onChange}
                  />
                )}

                {/* 2-level groups (app) */}
                {section.groups && (
                  <div className="space-y-4">
                    {section.groups.map((group) => (
                      <PermissionGroupSection
                        key={group.id}
                        group={group}
                        sectionId={section.id}
                        selectedPermissions={selectedPermissions}
                        onChange={onChange}
                      />
                    ))}
                  </div>
                )}

                {/* 3-level categories (web) */}
                {section.categories && (
                  <div className="space-y-2">
                    {section.categories.map((category) => (
                      <PermissionCategorySection
                        key={category.id}
                        category={category}
                        sectionId={section.id}
                        selectedPermissions={selectedPermissions}
                        onChange={onChange}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
