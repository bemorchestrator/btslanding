import { useState } from 'react';
import { LogIn } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import logoImage from 'figma:asset/49ad560cb46e058b928645a27bcd46f8ec9bf693.png';

type LoginPageProps = {
  onLogin: () => void;
};

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple mock authentication - in production, this would call an API
    if (email === 'admin@betterteaching.com' && password === 'admin123') {
      setError('');
      onLogin();
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={logoImage} alt="Better Teaching Solutions" className="w-12 h-12" />
            <div>
              <h1 className="text-white text-2xl">Better Teaching Solutions</h1>
              <p className="text-[#d4af37]">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-8">
          <h2 className="text-white text-xl mb-6">Administrator Login</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-300 mb-2 block">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@betterteaching.com"
                className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-500"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-300 mb-2 block">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-500"
                required
              />
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-900/50 rounded p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-[#d4af37] text-black hover:bg-[#c49d2f]"
            >
              <LogIn size={20} className="mr-2" />
              Sign In
            </Button>
          </form>

          {/* Demo Credentials Info */}
          <div className="mt-6 pt-6 border-t border-[#2a2a2a]">
            <p className="text-gray-400 text-sm text-center mb-2">Demo Credentials:</p>
            <div className="bg-[#2a2a2a] rounded p-3 space-y-1">
              <p className="text-gray-300 text-sm">
                <span className="text-gray-500">Email:</span> admin@betterteaching.com
              </p>
              <p className="text-gray-300 text-sm">
                <span className="text-gray-500">Password:</span> admin123
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-gray-600 text-sm text-center mt-6">
          © 2025 Better Teaching Solutions. All rights reserved.
        </p>
      </div>
    </div>
  );
}
