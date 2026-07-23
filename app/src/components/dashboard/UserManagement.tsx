import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Search, 
  Trash2, 
  KeyRound, 
  Ban, 
  CheckCircle, 
  RefreshCw
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
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('all');
  
  // Password Reset State
  const [resetUserId, setResetUserId] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [isResetting, setIsResetting] = useState(false);

  // Delete State
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchUsers();
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
    try {
      const { data, error } = await supabase.functions.invoke('admin-user-action', {
        body: { action: 'toggle_ban', userId, ban: !isCurrentlyBanned }
      });
      if (error) throw error;
      if (!data?.success) throw new Error(data?.error);

      toast.success(isCurrentlyBanned ? 'User unbanned' : 'User banned');
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, banned_until: !isCurrentlyBanned ? new Date(9999, 11, 31).toISOString() : null } : u));
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
    <div className="space-y-6 text-left font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h2 className="font-heading text-2xl font-light text-foreground flex items-center gap-2">
            <Users className="size-5 text-primary" />
            User Management & Credentials
          </h2>
          <p className="font-sans text-xs text-muted-foreground mt-1">
            Full administrative access to inspect, update roles, reset credentials, or revoke access for all accounts.
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={fetchUsers} 
          disabled={loading}
          className="rounded-none border-border hover:bg-muted/20 text-xs gap-2"
        >
          <RefreshCw className={`size-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh Accounts
        </Button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder="Search by email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-9 bg-background border-border rounded-none text-xs focus:ring-0"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto">
          {(['all', 'admin', 'educator', 'resource_person', 'none'] as const).map(roleOption => (
            <button
              key={roleOption}
              onClick={() => setSelectedRoleFilter(roleOption)}
              className={`px-3 py-1.5 text-xs font-sans capitalize transition-colors border rounded-none whitespace-nowrap ${
                selectedRoleFilter === roleOption 
                  ? 'bg-foreground text-background border-foreground font-medium' 
                  : 'bg-background text-muted-foreground border-border hover:text-foreground'
              }`}
            >
              {roleOption.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="border border-border bg-card rounded-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/30 border-b border-border text-muted-foreground font-medium">
              <tr>
                <th className="p-3 pl-4">Account Email</th>
                <th className="p-3">Assigned Role</th>
                <th className="p-3">Status</th>
                <th className="p-3">Joined Date</th>
                <th className="p-3 text-right pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    Loading accounts from database...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    No accounts found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map(userItem => {
                  const isBanned = Boolean(userItem.banned_until);
                  return (
                    <tr key={userItem.id} className="hover:bg-muted/10 transition-colors">
                      <td className="p-3 pl-4 font-mono font-medium text-foreground">
                        {userItem.email}
                      </td>
                      <td className="p-3">
                        <select
                          value={userItem.role}
                          onChange={e => handleRoleChange(userItem.id, e.target.value)}
                          className="bg-background border border-border text-foreground text-xs px-2 py-1 outline-none rounded-none focus:border-foreground transition-colors cursor-pointer"
                        >
                          <option value="admin">Admin</option>
                          <option value="educator">Educator</option>
                          <option value="resource_person">Resource Person</option>
                          <option value="none">None (Guest)</option>
                        </select>
                      </td>
                      <td className="p-3">
                        {isBanned ? (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-destructive/10 text-destructive border border-destructive/20 px-2 py-0.5 font-medium">
                            <Ban className="size-3" /> Banned
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 font-medium">
                            <CheckCircle className="size-3" /> Active
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {new Date(userItem.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
                      <td className="p-3 text-right pr-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setResetUserId(userItem.id)}
                            title="Reset Credentials"
                            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
                          >
                            <KeyRound className="size-4" />
                          </button>

                          <button
                            onClick={() => handleToggleBan(userItem.id, isBanned)}
                            title={isBanned ? "Unban Account" : "Ban Account"}
                            className={`p-1.5 transition-colors ${isBanned ? 'text-primary hover:bg-primary/10' : 'text-muted-foreground hover:text-destructive hover:bg-destructive/10'}`}
                          >
                            <Ban className="size-4" />
                          </button>

                          <button
                            onClick={() => setDeleteUserId(userItem.id)}
                            title="Delete Account"
                            className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Password Reset Modal */}
      {resetUserId && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border p-6 max-w-md w-full rounded-none space-y-4 shadow-lg text-left">
            <h3 className="font-heading text-lg font-light text-foreground flex items-center gap-2">
              <KeyRound className="size-4 text-primary" /> Reset User Credentials
            </h3>
            <p className="text-xs text-muted-foreground">
              Set a new secure password for this user account. They will be required to use this password on their next sign in.
            </p>
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <Input 
                type="password"
                required
                placeholder="New Password (min 6 characters)"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className="bg-background border-border rounded-none text-xs"
              />
              <div className="flex justify-end gap-3 pt-2">
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => { setResetUserId(null); setNewPassword(''); }}
                  className="rounded-none text-xs"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isResetting}
                  className="rounded-none bg-foreground text-background text-xs px-5"
                >
                  {isResetting ? 'Updating...' : 'Set Password'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete User Confirmation Modal */}
      {deleteUserId && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-destructive/40 p-6 max-w-md w-full rounded-none space-y-4 shadow-lg text-left">
            <h3 className="font-heading text-lg font-light text-destructive flex items-center gap-2">
              <Trash2 className="size-4" /> Delete Account Permanently
            </h3>
            <p className="text-xs text-muted-foreground">
              Are you sure you want to permanently delete this user account? This action cannot be undone and will revoke all associated access immediately.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setDeleteUserId(null)}
                className="rounded-none text-xs"
              >
                Cancel
              </Button>
              <Button 
                type="button" 
                disabled={isDeleting}
                onClick={handleDeleteUser}
                className="rounded-none bg-destructive text-destructive-foreground text-xs px-5 hover:bg-destructive/90"
              >
                {isDeleting ? 'Deleting...' : 'Confirm Delete'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
