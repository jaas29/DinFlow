//this is the welcome page component
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, PieChart, Shield } from 'lucide-react';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-between p-6 max-w-md mx-auto">
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="mb-3 flex items-center justify-center">
          <img 
            src="/images/dinflow-logo.png" 
            alt="DinFlow Logo" 
            className="w-72 h-72"
          />
        </div>

        <p className="text-white text-xl mb-12 text-center opacity-90">
          Smart expense tracking made simple
        </p>

        <div className="w-full space-y-4 mb-8">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-4 flex items-start gap-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Target className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">Set Savings Goals</h3>
              <p className="text-white text-sm opacity-80">Track your financial targets</p>
            </div>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-4 flex items-start gap-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center flex-shrink-0">
              <PieChart className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">Smart Analytics</h3>
              <p className="text-white text-sm opacity-80">Understand your spending</p>
            </div>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-4 flex items-start gap-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">Secure & Private</h3>
              <p className="text-white text-sm opacity-80">Your data stays on your device</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full space-y-4">
        <button
          onClick={() => navigate('/auth')}
          className="w-full py-4 bg-white text-primary font-bold rounded-xl text-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          Get Started
        </button>
        <p className="text-white text-sm text-center opacity-80">
          No account required • Free forever
        </p>
      </div>
    </div>
  );
};

export default Welcome;
