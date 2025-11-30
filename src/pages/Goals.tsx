//This is the page component for managing and tracking user savings goals.
import React from 'react';
import { useApp } from '../contexts/AppContext';
import { TrendingUp, Calendar, Lightbulb } from 'lucide-react';

const Goals: React.FC = () => {
  const { user, monthlySavings, remainingBudget, totalSpent } = useApp();

  if (!user) return null;

  const savingsProgress = Math.min((remainingBudget / (user.monthlyIncome - monthlySavings)) * 100, 100);
  const currentSavings = user.monthlyIncome - monthlySavings - totalSpent;

  const futureGoals = [
    { icon: '🛡️', name: 'Emergency Fund', current: 1200, target: 5000, progress: 24 },
    { icon: '✈️', name: 'Vacation', current: 450, target: 2000, progress: 23 },
    { icon: '💻', name: 'New Laptop', current: 800, target: 1500, progress: 53 },
  ];

  return (
    <div className="min-h-screen bg-background pb-24 max-w-md mx-auto">
      <div className="bg-primary rounded-b-3xl p-6 pb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
            <TrendingUp className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-white text-xl font-bold">Savings Goals</h1>
            <p className="text-white text-sm opacity-90">Track your financial targets</p>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-4">
        <div className="bg-green-50 rounded-2xl p-6 shadow-sm mb-6 border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-gray-600 mb-1">Monthly Savings Goal</div>
              <div className="text-3xl font-bold text-green-600">${monthlySavings.toFixed(0)}</div>
            </div>
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-green-600" size={28} />
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Progress this month</span>
              <span className="text-green-600 font-bold">{savingsProgress.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-green-200 rounded-full h-3">
              <div
                className="bg-gray-900 h-3 rounded-full transition-all"
                style={{ width: `${savingsProgress}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-600">Current Savings</div>
              <div className="text-lg font-bold text-green-600">
                ${Math.max(0, currentSavings).toFixed(2)}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-600">Remaining</div>
              <div className="text-lg font-bold text-gray-800">
                ${Math.max(0, monthlySavings - Math.max(0, currentSavings)).toFixed(2)}
              </div>
            </div>
          </div>

          {savingsProgress >= 100 && (
            <div className="mt-4 p-3 bg-green-100 rounded-lg">
              <p className="text-green-800 text-sm flex items-center gap-2">
                🎉 Congratulations! You've reached your monthly savings goal!
              </p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">This Month's Overview</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="text-blue-600" size={20} />
              </div>
              <div>
                <div className="text-xs text-gray-600">Income</div>
                <div className="font-bold text-gray-800">${user.monthlyIncome.toFixed(2)}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Calendar className="text-red-600" size={20} />
              </div>
              <div>
                <div className="text-xs text-gray-600">Spent</div>
                <div className="font-bold text-gray-800">${totalSpent.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Future Goals</h3>
            <button className="text-sm text-gray-600 flex items-center gap-1">
              <span>+</span> Add Goal
            </button>
          </div>

          <div className="space-y-4">
            {futureGoals.map((goal) => (
              <div key={goal.name} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                    {goal.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">{goal.name}</div>
                    <div className="text-xs text-gray-600">
                      ${goal.current} of ${goal.target}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-800">{goal.progress}%</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gray-900 h-2 rounded-full transition-all"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-purple-50 rounded-2xl p-5 shadow-sm border border-purple-200">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="text-purple-600" size={20} />
            <h3 className="font-semibold text-purple-900">Savings Tips</h3>
          </div>
          <ul className="space-y-2 text-sm text-purple-800">
            <li>• Review and cut unnecessary subscriptions</li>
            <li>• Use the 50/30/20 budgeting rule</li>
            <li>• Track your progress weekly to stay motivated</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Goals;
