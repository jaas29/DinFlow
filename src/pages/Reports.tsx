//This is the Reports page component for visualizing financial data.
import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { PieChart, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getCategoryIcon } from '../types';


const Reports: React.FC = () => {
  const { expenses, totalSpent, availableToSpend, remainingBudget } = useApp();
  const [viewMode, setViewMode] = useState<'categories' | 'monthly'>('categories');
  
  // Group expenses by category and sum amounts for each
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  // Sort categories by spending amount (highest first)
  const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);

  const colors = [
    '#3B82F6', // blue
    '#10B981', // green
    '#8B5CF6', // purple
    '#F59E0B', // orange
    '#EC4899', // pink
    '#EAB308', // yellow
  ];

  // Create a consistent color mapping for each category (sorted alphabetically for consistency)
  const categoryColorMap: Record<string, string> = {};
  Object.keys(categoryTotals)
    .sort()
    .forEach((category, index) => {
      categoryColorMap[category] = colors[index % colors.length];
    });

  // Transform category data for bar chart visualization
  const barChartData = sortedCategories.map(([category, amount]) => ({
    name: category.split(' ')[0], // Shorter names for bars
    amount: amount,
    fullName: category,
  }));

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
          {viewMode === 'categories' ? (
            <>
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
                  <div className="flex items-center justify-center mb-8 relative">
                    <div className="relative w-64 h-64">
                      {/* SVG Pie Chart */}
                      {/* SVG Pie Chart - Renders pie slices based on spending percentages */}
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        {(() => {
                          let startAngle = 0;
                          return sortedCategories.map(([category, amount]) => {
                            const percentage = (amount / totalSpent) * 100;
                            const angle = (percentage / 100) * 360;
                            const largeArcFlag = angle > 180 ? 1 : 0;

                            const startRad = (startAngle * Math.PI) / 180;
                            const endRad = ((startAngle + angle) * Math.PI) / 180;

                            const x1 = 50 + 40 * Math.cos(startRad);
                            const y1 = 50 + 40 * Math.sin(startRad);
                            const x2 = 50 + 40 * Math.cos(endRad);
                            const y2 = 50 + 40 * Math.sin(endRad);

                            // Handle 360-degree case (single expense = 100%)
                            let path: string;
                            if (angle === 360) {
                              // Draw a full circle using two semicircles
                              path = `M 50 10 A 40 40 0 1 1 50 90 A 40 40 0 1 1 50 10 Z`;
                            } else {
                              path = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
                            }

                            startAngle += angle;

                            return (
                              <path
                                key={category}
                                d={path}
                                fill={categoryColorMap[category]}
                              />
                            );
                          });
                        })()}
                      </svg>

                      {/* Percentage Labels Around Chart */}
                      {(() => {
                        let startAngle = 0;
                        return sortedCategories.map(([category, amount]) => {
                          const percentage = (amount / totalSpent) * 100;
                          const angle = (percentage / 100) * 360;
                          const middleAngle = startAngle + angle / 2;
                          
                          // Calculate position for label (outside the circle)
                          const labelRadius = 55; // Distance from center
                          const labelAngle = (middleAngle - 90) * (Math.PI / 180); // -90 to account for SVG rotation
                          const x = 50 + labelRadius * Math.cos(labelAngle);
                          const y = 50 + labelRadius * Math.sin(labelAngle);
                          
                          startAngle += angle;
                          
                          return (
                            <div
                              key={`label-${category}`}
                              className="absolute flex items-center gap-1"
                              style={{
                                left: `${x}%`,
                                top: `${y}%`,
                                transform: 'translate(-50%, -50%)',
                              }}
                            >
                              <span className="text-lg">{getCategoryIcon(category)}</span>
                              <span
                                className="font-bold text-sm whitespace-nowrap"
                                style={{ color: categoryColorMap[category] }}
                              >
                                {percentage.toFixed(0)}%
                              </span>
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {sortedCategories.map(([category, amount]) => {
                      const percentage = ((amount / totalSpent) * 100).toFixed(0);
                      return (
                        <div key={category} className="flex items-center justify-between py-2"> 
                          <div className="flex items-center gap-3">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: categoryColorMap[category] }}
                            />
                            <span className="text-gray-700 text-sm flex items-center gap-2">
                              <span className="text-base">{getCategoryIcon(category)}</span>
                              {category}
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
            </>
          ) : (
            <>
              <h3 className="font-bold text-gray-800 text-lg mb-6">Monthly Expenses by Category</h3>

              {sortedCategories.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="text-gray-400" size={32} />
                  </div>
                  <p className="text-gray-600">No expenses to display</p>
                  <p className="text-gray-500 text-sm mt-1">Start adding expenses to see monthly breakdown</p>
                </div>
              ) : (
                <>
                  <div className="mb-8" style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                          dataKey="name" 
                          tick={{ fill: '#6B7280', fontSize: 12 }}
                          angle={-45}
                          textAnchor="end"
                          height={80}
                        />
                        <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#fff', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px'
                          }}
                          formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
                          labelFormatter={(label, payload) => {
                            if (payload && payload.length > 0) {
                              return payload[0].payload.fullName;
                            }
                            return label;
                          }}
                        />
                        <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                          {barChartData.map((data) => (
                            <Cell key={`cell-${data.fullName}`} fill={categoryColorMap[data.fullName]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-3">
                    {sortedCategories.map(([category, amount]) => (
                      <div key={category} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: categoryColorMap[category] }}
                          />
                          <span className="text-gray-700 text-sm flex items-center gap-2">
                            <span className="text-base">{getCategoryIcon(category)}</span>
                            {category}
                          </span>
                        </div>
                        <div className="font-semibold text-gray-800">${amount.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
