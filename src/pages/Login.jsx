import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await base44.auth.loginViaEmailPassword(email, password);
      window.location.href = '/';
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    base44.auth.loginWithProvider('google', '/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Sign In</h1>
          <p className="mt-2 text-slate-400">Access your churn analysis dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <div>
            <Label className="text-slate-300">Email</Label>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="bg-slate-900 border-slate-700 text-white" />
          </div>
          <div>
            <Label className="text-slate-300">Password</Label>
            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="bg-slate-900 border-slate-700 text-white" />
          </div>
          <Button type="submit" disabled={loading} className="w-full">{loading ? 'Signing in...' : 'Sign In'}</Button>
          <Button type="button" variant="outline" onClick={handleGoogleLogin} className="w-full border-slate-700 text-slate-300 hover:bg-slate-800">
            Continue with Google
          </Button>
          <div className="flex justify-between text-sm">
            <Link to="/register" className="text-blue-400 hover:underline">Create account</Link>
            <Link to="/forgot-password" className="text-blue-400 hover:underline">Forgot password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}