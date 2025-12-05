// This is the page component for the main dashboard displaying user financial overview and recent expenses.
import React from 'react';
import { useApp } from '../contexts/AppContext';
import { TrendingUp, Wallet, DollarSign, Trash2 } from 'lucide-react';
import { getCategoryIcon } from '../types';

const Dashboard: React.FC = () => {
  const { user, expenses, totalSpent, remainingBudget, monthlySavings, availableToSpend, deleteExpense } = useApp();

  if (!user) return null;

  // Calculate savings progress as a percentage of available budget
  const savingsProgress = monthlySavings > 0 ? Math.min((remainingBudget / availableToSpend) * 100, 100) : 0;

  return (
    <div className="min-h-screen bg-background pb-24 max-w-md mx-auto">
      <div className="bg-primary rounded-b-3xl p-6 pb-8">
        <div className="flex flex-col items-start gap-2 mb-6">
          <img
            src="/images/LogoSmaller.png"
            alt="DinFlow"
            className="w-29 h-24"
          />
          <div>
            <span className="text-white text-sm opacity-90">Total Budget</span>
            <h2 className="text-white text-3xl font-bold">${user.monthlyIncome.toFixed(2)}</h2>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="text-green-600" size={20} />
              </div>
              <div>
                <div className="text-xs text-gray-600">Savings</div>
                <div className="text-xs text-gray-600">Goal</div>
              </div>
            </div>
            <div className="text-2xl font-bold text-green-600">${monthlySavings.toFixed(0)}</div>
            <div className="text-xs text-gray-500 mt-1">{user.savingsPercentage}% of income</div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Wallet className="text-blue-600" size={20} />
              </div>
              <div className="text-xs text-gray-600">To Spend</div>
            </div>
            <div className="text-2xl font-bold text-blue-600">${availableToSpend.toFixed(0)}</div>
            <div className="text-xs text-gray-500 mt-1">Monthly budget</div>
          </div>
        </div>

        <div className={`rounded-2xl p-5 shadow-sm mb-4 ${remainingBudget < 0 ? 'bg-red-50 border border-red-200' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className={`text-sm ${remainingBudget < 0 ? 'text-red-600' : 'text-gray-600'}`}>Remaining This Month</span>
              <div className={`text-2xl font-bold ${remainingBudget < 0 ? 'text-red-600' : 'text-green-600'}`}>${remainingBudget.toFixed(2)}</div>
            </div>
            <div className="text-right">
              <span className="text-gray-600 text-sm">Spent</span>
              <div className="text-2xl font-bold text-gray-800">${totalSpent.toFixed(0)}</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${remainingBudget < 0 ? 'bg-red-600' : 'bg-gray-900'}`}
              style={{ width: `${availableToSpend > 0 ? Math.max(0, (remainingBudget / availableToSpend) * 100) : 0}%` }}
            />
          </div>
          {remainingBudget < 0 && (
            <div className="mt-3 p-2 bg-red-100 rounded-lg">
              <p className="text-red-800 text-xs font-medium">⚠️ You've exceeded your budget by ${Math.abs(remainingBudget).toFixed(2)}</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="text-green-600" size={20} />
              </div>
              <div>
                <div className="font-semibold text-gray-800">Savings Progress</div>
                <div className="text-xs text-gray-600">Keep it up!</div>
              </div>
            </div>
            <div className="text-primary font-bold text-lg">{savingsProgress.toFixed(0)}%</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gray-900 h-2 rounded-full transition-all"
              style={{ width: `${savingsProgress}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-800">Recent Expenses</h3>
            <span className="text-sm text-gray-500">{expenses.length} transactions</span>
          </div>

          {expenses.length === 0 ? (
            <div className="text-center py-8">
              <img
                src="/images/DinoGreatJob.png"
                alt="No expenses yet"
                className="w-32 h-32 mx-auto mb-3"
              />
              <p className="text-gray-600 text-sm">No expenses yet</p>
              <p className="text-gray-500 text-xs mt-1">Tap the + button to add one</p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Display only the 5 most recent expenses */}
              {expenses.slice(0, 5).map((expense) => (
                <div key={expense.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">{getCategoryIcon(expense.category)}</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{expense.description || expense.category}</div>
                      <div className="text-xs text-gray-500">{expense.category}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-semibold text-gray-800">${expense.amount.toFixed(2)}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(expense.date).toLocaleDateString()}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteExpense(expense.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      aria-label="Delete expense"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
