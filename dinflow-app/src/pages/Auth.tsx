import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      navigate('/setup');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      <div className="p-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full bg-white rounded-3xl p-8 shadow-lg">
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl">🦕</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">DinFlow</h2>
          </div>

          <p className="text-center text-gray-600 mb-6">Sign in to continue your journey</p>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setIsSignIn(true)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium ${
                isSignIn ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-600'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignIn(false)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium ${
                !isSignIn ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-600'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-primary"
                required
              />
            </div>

            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-primary"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800"
            >
              Sign In
            </button>
          </form>

          {isSignIn && (
            <div className="text-center mt-4">
              <a href="#" className="text-blue-600 text-sm hover:underline">
                Forgot password?
              </a>
            </div>
          )}

          <p className="text-xs text-gray-500 text-center mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
