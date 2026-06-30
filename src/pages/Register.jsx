import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';

export default function Register() {
  const [step, setStep] = useState('register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirm) { setError('Passwords do not match'); return; }
    setLoading(true); setError('');
    try {
      await base44.auth.register({ email, password });
      setStep('otp');
    } catch (err) { setError(err.message || 'Registration failed'); }
    finally { setLoading(false); }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const { access_token } = await base44.auth.verifyOtp({ email, otpCode: otp });
      base44.auth.setToken(access_token);
      window.location.href = '/';
    } catch (err) { setError(err.message || 'Verification failed'); }
    finally { setLoading(false); }
  };

  const handleResend = async () => {
    try { await base44.auth.resendOtp(email); } catch {}
  };

  if (step === 'otp') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">Verify Email</h1>
            <p className="mt-2 text-slate-400">Enter the code sent to {email}</p>
          </div>
          <form onSubmit={handleVerify} className="space-y-4">
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <Input value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter OTP" required className="bg-slate-900 border-slate-700 text-white" />
            <Button type="submit" disabled={loading} className="w-full">{loading ? 'Verifying...' : 'Verify'}</Button>
            <button type="button" onClick={handleResend} className="text-blue-400 text-sm hover:underline w-full text-center">Resend code</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
        </div>
        <form onSubmit={handleRegister} className="space-y-4">
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <div><Label className="text-slate-300">Email</Label><Input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="bg-slate-900 border-slate-700 text-white" /></div>
          <div><Label className="text-slate-300">Password</Label><Input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="bg-slate-900 border-slate-700 text-white" /></div>
          <div><Label className="text-slate-300">Confirm Password</Label><Input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required className="bg-slate-900 border-slate-700 text-white" /></div>
          <Button type="submit" disabled={loading} className="w-full">{loading ? 'Creating...' : 'Create Account'}</Button>
          <Button type="button" variant="outline" onClick={() => base44.auth.loginWithProvider('google', '/')} className="w-full border-slate-700 text-slate-300 hover:bg-slate-800">Continue with Google</Button>
          <Link to="/login" className="text-blue-400 text-sm hover:underline block text-center">Already have an account? Sign in</Link>
        </form>
      </div>
    </div>
  );
}