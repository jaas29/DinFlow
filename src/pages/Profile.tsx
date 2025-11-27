import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { UserCircle2, Calendar, TrendingUp, Receipt, Trash2, Settings as SettingsIcon } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, expenses, totalSpent, monthlySavings, resetApp, deleteAllExpenses } = useApp();
  const navigate = useNavigate();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  if (!user) return null;

  const daysSinceStart = 373; // Mock value
  const avgTransaction = expenses.length > 0 ? totalSpent / expenses.length : 0;

  const handleReset = () => {
    if (showResetConfirm) {
      resetApp();
      navigate('/');
    } else {
      setShowResetConfirm(true);
      setTimeout(() => setShowResetConfirm(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24 max-w-md mx-auto">
      <div className="bg-primary rounded-b-3xl p-6 pb-12">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-3">
            <UserCircle2 className="text-white" size={40} />
          </div>
          <h1 className="text-white text-2xl font-bold mb-1">Your Profile</h1>
          <p className="text-white text-sm opacity-90">Manage your account settings</p>
        </div>
      </div>

      <div className="px-4 -mt-8">
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
          <h3 className="font-bold text-gray-800 mb-4">Financial Overview</h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="text-blue-600" size={20} />
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-600">Monthly Income</div>
                <div className="font-bold text-gray-800">${user.monthlyIncome.toFixed(2)}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-green-600" size={20} />
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-600">Savings Goal</div>
                <div className="font-bold text-gray-800">
                  {user.savingsPercentage}% (${monthlySavings.toFixed(2)})
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
          <h3 className="font-bold text-gray-800 mb-4">Your Statistics</h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-purple-50 rounded-xl p-4">
              <div className="text-3xl font-bold text-purple-600">{expenses.length}</div>
              <div className="text-xs text-gray-600 mt-1">Total Transactions</div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4">
              <div className="text-3xl font-bold text-blue-600">${totalSpent.toFixed(0)}</div>
              <div className="text-xs text-gray-600 mt-1">Total Spent</div>
            </div>

            <div className="bg-green-50 rounded-xl p-4">
              <div className="text-3xl font-bold text-green-600">{daysSinceStart}</div>
              <div className="text-xs text-gray-600 mt-1">Days Tracking</div>
            </div>

            <div className="bg-orange-50 rounded-xl p-4">
              <div className="text-3xl font-bold text-orange-600">${avgTransaction.toFixed(0)}</div>
              <div className="text-xs text-gray-600 mt-1">Avg. Transaction</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
          <h3 className="font-bold text-gray-800 mb-4">Settings</h3>

          <div className="space-y-2">
            <div className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 opacity-60 cursor-not-allowed">
              <div className="flex items-center gap-3">
                <SettingsIcon className="text-gray-400" size={20} />
                <span className="text-gray-500">Manage Categories</span>
              </div>
              <span className="text-gray-300">›</span>
            </div>

            <button
              onClick={() => navigate('/setup')}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3">
                <Receipt className="text-gray-600" size={20} />
                <span className="text-gray-700">Update Budget</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-red-200">
          <h3 className="font-bold text-red-600 mb-2">Danger Zone</h3>
          <p className="text-sm text-gray-600 mb-4">
            This will delete all your data and reset the app
          </p>

          <button
            onClick={handleReset}
            className={`w-full py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors ${
              showResetConfirm
                ? 'bg-red-600 text-white'
                : 'bg-red-50 text-red-600 hover:bg-red-100'
            }`}
          >
            <Trash2 size={18} />
            {showResetConfirm ? 'Click again to confirm' : 'Reset All Data'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
