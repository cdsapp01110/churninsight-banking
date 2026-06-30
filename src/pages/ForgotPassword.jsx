import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try { await base44.auth.resetPasswordRequest(email); } catch {}
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <h1 className="text-3xl font-bold text-white">Reset Password</h1>
        {sent ? (
          <p className="text-slate-400">If an account exists for {email}, you'll receive a reset link.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div><Label className="text-slate-300">Email</Label><Input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="bg-slate-900 border-slate-700 text-white" /></div>
            <Button type="submit" disabled={loading} className="w-full">{loading ? 'Sending...' : 'Send Reset Link'}</Button>
          </form>
        )}
        <Link to="/login" className="text-blue-400 text-sm hover:underline">Back to login</Link>
      </div>
    </div>
  );
}