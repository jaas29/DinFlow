import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { PieChart, Calendar } from 'lucide-react';

const Reports: React.FC = () => {
  const { expenses, totalSpent, availableToSpend, remainingBudget } = useApp();
  const [viewMode, setViewMode] = useState<'categories' | 'monthly'>('categories');

  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);

  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-pink-500',
    'bg-yellow-500',
  ];

  return (
    <div className="min-h-screen bg-background pb-24 max-w-md mx-auto">
      <div className="bg-primary rounded-b-3xl p-6 pb-8">
        <h1 className="text-white text-2xl font-bold mb-2">Financial Reports</h1>
        <p className="text-white text-sm opacity-90">Analyze your spending patterns</p>
      </div>

      <div className="px-4 -mt-4">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="text-xs text-gray-600 mb-1">This Month</div>
            <div className="text-xl font-bold text-purple-600">${totalSpent.toFixed(0)}</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="text-xs text-gray-600 mb-1">Budget</div>
            <div className="text-xl font-bold text-blue-600">${availableToSpend.toFixed(0)}</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="text-xs text-gray-600 mb-1">Remaining</div>
            <div className="text-xl font-bold text-green-600">${remainingBudget.toFixed(0)}</div>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setViewMode('categories')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium ${
              viewMode === 'categories'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-600'
            }`}
          >
            <PieChart size={18} />
            Categories
          </button>
          <button
            onClick={() => setViewMode('monthly')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium ${
              viewMode === 'monthly'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-600'
            }`}
          >
            <Calendar size={18} />
            Monthly
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-800 text-lg mb-6">Spending by Category</h3>

          {sortedCategories.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PieChart className="text-gray-400" size={32} />
              </div>
              <p className="text-gray-600">No expenses to display</p>
              <p className="text-gray-500 text-sm mt-1">Start adding expenses to see analytics</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center mb-8">
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {sortedCategories.map((_, index) => {
                      const total = sortedCategories.reduce((sum, [, amount]) => sum + amount, 0);
                      let startAngle = 0;
                      return sortedCategories.slice(0, index + 1).map(([cat, amount], i) => {
                        const percentage = (amount / total) * 100;
                        const angle = (percentage / 100) * 360;
                        const largeArcFlag = angle > 180 ? 1 : 0;
                        
                        const start = startAngle;
                        startAngle += angle;
                        
                        if (i < index) return null;
                        
                        const startRad = (start * Math.PI) / 180;
                        const endRad = (startAngle * Math.PI) / 180;
                        
                        const x1 = 50 + 40 * Math.cos(startRad);
                        const y1 = 50 + 40 * Math.sin(startRad);
                        const x2 = 50 + 40 * Math.cos(endRad);
                        const y2 = 50 + 40 * Math.sin(endRad);
                        
                        return (
                          <path
                            key={cat}
                            d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                            className={colors[i % colors.length].replace('bg-', 'fill-')}
                          />
                        );
                      });
                    })}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800">
                        {sortedCategories.length > 0 && sortedCategories[0][0] === 'Food & Dining' ? '🍔' : '100'}
                        {sortedCategories.length > 0 && sortedCategories[0][0] === 'Food & Dining' && ' 100'}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {sortedCategories.map(([category, amount], index) => {
                  const percentage = ((amount / totalSpent) * 100).toFixed(0);
                  return (
                    <div key={category} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]}`} />
                        <span className="text-gray-700 text-sm flex items-center gap-1">
                          {category === 'Food & Dining' && '🍔'} {category}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-800">${amount.toFixed(2)}</div>
                        <div className="text-xs text-gray-500">{percentage}%</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
