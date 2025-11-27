import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { ArrowRight } from 'lucide-react';
import DinoDino from '../components/DinoDino';

const Setup: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useApp();
  const [step, setStep] = useState(1);
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [savingsPercentage, setSavingsPercentage] = useState(20);

  const handleContinue = () => {
    if (step === 1 && monthlyIncome) {
      setStep(2);
    } else if (step === 2) {
      setUser({
        email: 'user@dinflow.com',
        monthlyIncome: parseFloat(monthlyIncome),
        savingsPercentage,
      });
      navigate('/dashboard');
    }
  };

  const income = parseFloat(monthlyIncome) || 0;
  const savings = (income * savingsPercentage) / 100;
  const toSpend = income - savings;

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Step {step} of 2</span>
          <span className="text-sm text-gray-600">{step === 1 ? '50%' : '100%'}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 2) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-white rounded-3xl p-8 shadow-lg">
          {step === 1 ? (
            <>
              <div className="flex justify-center mb-6">
                <img 
                  src="/images/dino-welcome.png" 
                  alt="Welcome Dino" 
                  className="w-48 h-48"
                />
              </div>

              <h2 className="text-2xl font-bold text-center mb-2">What's your monthly income?</h2>
              <p className="text-gray-600 text-center mb-6">
                This helps us calculate your budget
              </p>

              <input
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                placeholder="Monthly Income (e.g $4000)"
                className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-primary text-center text-lg mb-6"
              />

              <button
                onClick={handleContinue}
                disabled={!monthlyIncome}
                className="w-full py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Continue
                <ArrowRight size={20} />
              </button>
            </>
          ) : (
            <>
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl">📈</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-center mb-2">Set your savings goal</h2>
              <p className="text-gray-600 text-center mb-8">
                What percentage would you like to save?
              </p>

              <div className="mb-6">
                <div className="text-center text-3xl font-bold text-gray-800 mb-4">
                  {savingsPercentage}
                </div>

                <div className="relative">
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={savingsPercentage}
                    onChange={(e) => setSavingsPercentage(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #1f2937 0%, #1f2937 ${((savingsPercentage - 5) / 45) * 100}%, #e5e7eb ${((savingsPercentage - 5) / 45) * 100}%, #e5e7eb 100%)`
                    }}
                  />
                </div>

                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>5%</span>
                  <span>50%</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monthly savings</span>
                  <span className="text-primary font-bold text-lg">${savings.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Available to spend</span>
                  <span className="text-blue-600 font-bold text-lg">${toSpend.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200"
                >
                  Back
                </button>
                <button
                  onClick={handleContinue}
                  className="flex-1 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800"
                >
                  Get Started
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Setup;
