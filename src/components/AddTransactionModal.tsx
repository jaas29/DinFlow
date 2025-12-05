// A modal component for adding a new expense or income transaction.
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { EXPENSE_CATEGORIES } from '../types';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const INCOME_CATEGORIES = [
  { name: 'Salary', icon: '🏢' },
  { name: 'Freelance', icon: '💼' },
  { name: 'Investment', icon: '📈' },
  { name: 'Gift', icon: '🎁' },
  { name: 'Other', icon: '💰' },
] as const;

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { addExpense, addIncome } = useApp();
  const [transactionType, setTransactionType] = useState<'expense' | 'income'>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    const parsedAmount = parseFloat(amount);
    // Validate that amount is positive and category is selected
    if (!amount || parsedAmount <= 0 || !category) return;

    // Add either expense or income based on transaction type
    if (transactionType === 'expense') {
      addExpense({
        amount: parsedAmount,
        category,
        description,
        date: new Date().toISOString(),
      });
    } else {
      addIncome({
        amount: parsedAmount,
        category,
        description,
        date: new Date().toISOString(),
      });
    }

    // Clear form and close modal
    setAmount('');
    setCategory('');
    setDescription('');
    onClose();
    onSuccess();
  };

  const handleTypeChange = (type: 'expense' | 'income') => {
    setTransactionType(type);
    setCategory(''); // Reset category when switching
  };

  if (!isOpen) return null;

  const isExpense = transactionType === 'expense';
  const categories = isExpense ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  return (
    <div className="fixed inset-0 z-50 max-w-md mx-auto flex flex-col">
      {/* Header with tabs */}
      <div className={`${isExpense ? 'bg-orange-600' : 'bg-green-600'} px-6 pt-12 pb-2`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">{isExpense ? '💸' : '💰'}</span>
            </div>
            <div>
              <h2 className="text-white font-bold text-xl">
                {isExpense ? 'Add Expense' : 'Add Income'}
              </h2>
              <p className="text-white text-sm opacity-90">
                {isExpense ? 'Track your spending in seconds' : 'Record your earnings'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Type Toggle Tabs */}
        <div className="flex gap-2 pb-4">
          <button
            onClick={() => handleTypeChange('expense')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
              isExpense
                ? 'bg-white text-orange-600 shadow-md'
                : 'bg-white bg-opacity-20 text-white'
            }`}
          >
            💸 Expense
          </button>
          <button
            onClick={() => handleTypeChange('income')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
              !isExpense
                ? 'bg-white text-green-600 shadow-md'
                : 'bg-white bg-opacity-20 text-white'
            }`}
          >
            💰 Income
          </button>
        </div>
      </div>

      {/* White Content Area */}
      <div className="flex-1 px-6 py-8 space-y-6 bg-background overflow-y-auto">
        {/* Amount Input */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <label className="text-sm text-gray-600 mb-3 block">
            {isExpense ? 'How much did you spend?' : 'How much did you earn?'}
          </label>
          <div className="flex items-baseline">
            <span className="text-5xl text-gray-300 mr-2">$</span>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="text-5xl font-light text-gray-800 bg-transparent outline-none w-full"
              autoFocus
            />
          </div>
        </div>

        {/* Category Selector */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <label className="text-sm text-gray-700 font-medium mb-4 block">What category?</label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                backgroundColor: 'white',
                color: category ? '#1f2937' : '#9ca3af',
              }}
              className="w-full p-4 pr-10 border border-gray-300 rounded-xl bg-white outline-none focus:border-blue-500 appearance-none cursor-pointer text-base"
            >
              <option value="" style={{ color: '#9ca3af' }}>Select a category</option>
              {categories.map((cat) => (
                <option 
                  key={cat.name} 
                  value={cat.name}
                  style={{ 
                    backgroundColor: 'white',
                    color: '#1f2937',
                    padding: '12px'
                  }}
                >
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Description Input */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <label className="text-sm text-gray-700 font-medium mb-4 block">What was it for?</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={isExpense ? 'e.g., Walmart' : 'e.g., Monthly salary, Freelance project'}
            className="w-full p-4 border border-gray-200 rounded-xl text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Bottom Buttons - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white p-6 border-t border-gray-100">
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-4 px-6 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!amount || !category}
            className={`flex-1 py-4 px-6 ${
              isExpense ? 'bg-orange-600' : 'bg-green-600'
            } text-white rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
          >
            Add {isExpense ? 'Expense' : 'Income'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionModal;
