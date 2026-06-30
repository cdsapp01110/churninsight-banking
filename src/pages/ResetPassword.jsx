import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const token = new URLSearchParams(window.location.search).get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) { setError('Passwords do not match'); return; }
    setLoading(true); setError('');
    try {
      await base44.auth.resetPassword({ resetToken: token, newPassword: password });
      window.location.href = '/login';
    } catch (err) { setError(err.message || 'Reset failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-3xl font-bold text-white text-center">New Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <div><Label className="text-slate-300">New Password</Label><Input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="bg-slate-900 border-slate-700 text-white" /></div>
          <div><Label className="text-slate-300">Confirm Password</Label><Input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required className="bg-slate-900 border-slate-700 text-white" /></div>
          <Button type="submit" disabled={loading} className="w-full">{loading ? 'Resetting...' : 'Reset Password'}</Button>
        </form>
      </div>
    </div>
  );
}