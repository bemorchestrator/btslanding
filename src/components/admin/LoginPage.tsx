import { useState } from 'react';
import { LogIn } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import logoImage from '../../assets/images/logo-admin.png';

type LoginPageProps = {
  onLogin: (token: string, username: string) => void;
};

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        onLogin(data.token, data.user.username);
      } else {
        // Login failed
        setError(data.message || 'Invalid username or password');
      }
    } catch (err) {
      setError('Failed to connect to server. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
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
              <Label htmlFor="username" className="text-gray-300 mb-2 block">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-gray-500"
                required
                disabled={isLoading}
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
                disabled={isLoading}
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
              disabled={isLoading}
            >
              <LogIn size={20} className="mr-2" />
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          {/* Demo Credentials Info */}
          <div className="mt-6 pt-6 border-t border-[#2a2a2a]">
            <p className="text-gray-400 text-sm text-center mb-2">Demo Credentials:</p>
            <div className="bg-[#2a2a2a] rounded p-3 space-y-1">
              <p className="text-gray-300 text-sm">
                <span className="text-gray-500">Username:</span> admin
              </p>
              <p className="text-gray-300 text-sm">
                <span className="text-gray-500">Password:</span> REDACTED_PASSWORD
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
