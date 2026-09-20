import React, { useState, useEffect} from 'react';
import { supabase } from '@/lib/supabaseClient';
import { 
  Search, 
  RefreshCw,
  MoreHorizontal
} from 'lucide-react';
import { toast } from 'sonner';

interface UserItem {
  id: string;
  email: string;
  role: 'admin' | 'educator' | 'resource_person' | 'none';
  created_at: string;
  last_sign_in_at: string | null;
  banned_until: string | null;
}

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('all');
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Menu State
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  // Password Reset State
  const [resetUserId, setResetUserId] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [isResetting, setIsResetting] = useState(false);

  // Delete State
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchUsers();
    
    // Global click handler to close menu
    const closeMenu = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.menu-wrap')) {
        setMenuOpenId(null);
      }
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('list-users');
      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || 'Failed to fetch users');
      setUsers(data.users || []);
    } catch (err: any) {
      toast.error(err.message || 'Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('admin-user-action', {
        body: { action: 'update_role', userId, role: newRole }
      });
      if (error) throw error;
      if (!data?.success) throw new Error(data?.error);
      
      toast.success('User role updated');
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole as any } : u));
    } catch (err: any) {
      toast.error(err.message || 'Failed to update role');
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetUserId || !newPassword) return;

    setIsResetting(true);
    try {
      const { data, error } = await supabase.functions.invoke('admin-user-action', {
        body: { action: 'update_password', userId: resetUserId, newPassword }
      });
      if (error) throw error;
      if (!data?.success) throw new Error(data?.error);

      toast.success('Password updated successfully');
      setResetUserId(null);
      setNewPassword('');
    } catch (err: any) {
      toast.error(err.message || 'Failed to reset password');
    } finally {
      setIsResetting(false);
    }
  };

  const handleToggleBan = async (userId: string, isCurrentlyBanned: boolean) => {
    setMenuOpenId(null);
    try {
      const { data, error } = await supabase.functions.invoke('admin-user-action', {
        body: { action: 'toggle_ban', userId, ban: !isCurrentlyBanned }
      });
      if (error) throw error;
      if (!data?.success) throw new Error(data?.error);

      toast.success(isCurrentlyBanned ? 'User unbanned' : 'User banned');
      await fetchUsers();
    } catch (err: any) {
      toast.error(err.message || 'Failed to toggle ban status');
    }
  };

  const handleDeleteUser = async () => {
    if (!deleteUserId) return;
    setIsDeleting(true);
    try {
      const { data, error } = await supabase.functions.invoke('admin-user-action', {
        body: { action: 'delete', userId: deleteUserId }
      });
      if (error) throw error;
      if (!data?.success) throw new Error(data?.error);

      toast.success('User account deleted');
      setUsers(prev => prev.filter(u => u.id !== deleteUserId));
      setDeleteUserId(null);
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete user');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRoleFilter === 'all' || u.role === selectedRoleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="flex flex-col gap-7 animate-in fade-in duration-300 w-full">
      <div className="page-head">
        <h1>People</h1>
        <span className="sub">Staff credentials and access roles</span>
        <div className="act">
          <span className="count-chip">{filteredUsers.length} accounts</span>
          <button className="btn btn-g btn-sm" onClick={fetchUsers} disabled={loading}>
            <RefreshCw className={`size-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </div>
      </div>

      <div className="toolbar">
        <div className="search">
          <Search />
          <input 
            type="text" 
            className="input" 
            placeholder="Search by email…" 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="seg">
          {(['all', 'admin', 'educator', 'none'] as const).map(roleOption => (
            <button
              key={roleOption}
              className={selectedRoleFilter === roleOption ? 'on' : ''}
              onClick={() => setSelectedRoleFilter(roleOption)}
            >
              {roleOption === 'none' ? 'Guest' : roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <table className="tbl">
          <thead>
            <tr>
              <th>Account email</th>
              <th style={{ width: '210px' }}>Role</th>
              <th style={{ width: '130px' }}>Status</th>
              <th style={{ width: '140px' }}>Joined</th>
              <th style={{ width: '60px' }}></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={{ textAlign: 'center' }}>Loading accounts...</td></tr>
            ) : filteredUsers.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center' }}>No accounts found.</td></tr>
            ) : (
              filteredUsers.map(userItem => {
                const isBanned = Boolean(userItem.banned_until);
                const isMenuOpen = menuOpenId === userItem.id;
                return (
                  <tr key={userItem.id}>
                    <td className="pri">{userItem.email}</td>
                    <td>
                      <select 
                        className="input" 
                        style={{ height: '36px', fontSize: '13px' }}
                        value={userItem.role}
                        onChange={e => handleRoleChange(userItem.id, e.target.value)}
                      >
                        <option value="admin">Admin</option>
                        <option value="educator">Educator</option>
                        <option value="resource_person">Resource Person</option>
                        <option value="none">None (Guest)</option>
                      </select>
                    </td>
                    <td>
                      {isBanned ? (
                        <span className="status-dot before:!bg-[oklch(var(--destructive))] text-[oklch(var(--destructive))]">Suspended</span>
                      ) : (
                        <span className="status-dot">Active</span>
                      )}
                    </td>
                    <td>{new Date(userItem.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                    <td>
                      <div className="menu-wrap" onClick={e => e.stopPropagation()}>
                        <button 
                          className="icon-btn" 
                          onClick={() => setMenuOpenId(isMenuOpen ? null : userItem.id)}
                        >
                          <MoreHorizontal className="size-4" />
                        </button>
                        <div className={`menu ${isMenuOpen ? 'on' : ''}`}>
                          <button onClick={() => { setResetUserId(userItem.id); setMenuOpenId(null); }}>
                            Reset password
                          </button>
                          <button onClick={() => handleToggleBan(userItem.id, isBanned)}>
                            {isBanned ? 'Restore access' : 'Revoke access'}
                          </button>
                          <hr />
                          <button className="dng" onClick={() => { setDeleteUserId(userItem.id); setMenuOpenId(null); }}>
                            Delete account
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Password Reset Modal */}
      {resetUserId && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handlePasswordReset} className="card card-pad measure w-full">
            <h3 style={{ marginBottom: '4px' }}>Update password</h3>
            <p className="small" style={{ marginBottom: '20px' }}>Set a new secure password for this user account.</p>
            <div className="field">
              <label>New password</label>
              <input 
                type="password" 
                className="input" 
                required 
                placeholder="••••••••" 
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
            </div>
            <div style={{ marginTop: '24px', display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn btn-p" disabled={isResetting}>
                {isResetting ? 'Updating...' : 'Set password'}
              </button>
              <button type="button" className="btn btn-g" onClick={() => { setResetUserId(null); setNewPassword(''); }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete User Confirmation Modal */}
      {deleteUserId && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card card-pad measure w-full border-destructive/30">
            <h3 style={{ marginBottom: '4px', color: 'oklch(var(--destructive))' }}>Delete Account Permanently</h3>
            <p className="small" style={{ marginBottom: '20px' }}>
              Are you sure you want to permanently delete this user account? This action cannot be undone and will revoke all associated access immediately.
            </p>
            <div style={{ marginTop: '24px', display: 'flex', gap: '10px' }}>
              <button type="button" className="btn btn-danger" style={{ height: '40px', padding: '0 18px' }} disabled={isDeleting} onClick={handleDeleteUser}>
                {isDeleting ? 'Deleting...' : 'Confirm delete'}
              </button>
              <button type="button" className="btn btn-g" onClick={() => setDeleteUserId(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
