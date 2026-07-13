import type { AppRole } from '@/types/auth';

export type Permission =
  | 'workspace:view'
  | 'uploads:manage'
  | 'knowledge:manage'
  | 'messages:manage'
  | 'users:manage'
  | 'content:publish'
  | 'events:register';

const permissions: Record<AppRole, ReadonlySet<Permission>> = {
  member: new Set(['events:register']),
  resource_person: new Set([
    'workspace:view',
    'uploads:manage',
    'knowledge:manage',
    'messages:manage',
  ]),
  admin: new Set([
    'workspace:view',
    'uploads:manage',
    'knowledge:manage',
    'messages:manage',
    'users:manage',
    'content:publish',
    'events:register',
  ]),
};

export function can(role: AppRole | null, permission: Permission): boolean {
  return role ? permissions[role].has(permission) : false;
}
