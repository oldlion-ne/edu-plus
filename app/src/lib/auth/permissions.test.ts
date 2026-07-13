import { describe, expect, it } from 'vitest';

import { can } from './permissions';

describe('role permissions', () => {
  it('denies every privileged permission when a role is missing', () => {
    expect(can(null, 'workspace:view')).toBe(false);
    expect(can(null, 'users:manage')).toBe(false);
  });

  it('allows members to register for events but not enter the workspace', () => {
    expect(can('member', 'events:register')).toBe(true);
    expect(can('member', 'workspace:view')).toBe(false);
  });

  it('allows resource people to manage operational work but not roles or publishing', () => {
    expect(can('resource_person', 'uploads:manage')).toBe(true);
    expect(can('resource_person', 'knowledge:manage')).toBe(true);
    expect(can('resource_person', 'messages:manage')).toBe(true);
    expect(can('resource_person', 'users:manage')).toBe(false);
    expect(can('resource_person', 'content:publish')).toBe(false);
  });

  it('allows administrators to perform every defined operation', () => {
    expect(can('admin', 'workspace:view')).toBe(true);
    expect(can('admin', 'users:manage')).toBe(true);
    expect(can('admin', 'content:publish')).toBe(true);
  });
});
