import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { EXPENSE_CATEGORIES } from '../types';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({ isOpen, onClose }) => {
  const { addExpense } = useApp();
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!amount || !category) return;

    addExpense({
      amount: parseFloat(amount),
      category,
      description,
      date: new Date().toISOString(),
    });

    setAmount('');
    setCategory('');
    setDescription('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end max-w-md mx-auto">
      <div className="bg-white w-full rounded-t-3xl animate-slide-up">
        <div className="bg-primary p-4 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💸</span>
              </div>
              <div>
                <h2 className="text-white font-bold text-lg">Add Expense</h2>
                <p className="text-white text-sm opacity-90">Track your spending in seconds</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-20"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-gray-50 rounded-2xl p-6">
            <label className="text-sm text-gray-600 mb-2 block">How much did you spend?</label>
            <div className="flex items-center">
              <span className="text-4xl text-gray-400 mr-2">$</span>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="text-4xl font-light text-gray-800 bg-transparent outline-none w-full"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-gray-200">
            <label className="text-sm text-gray-700 font-medium mb-3 block">What category?</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg text-gray-800 outline-none focus:border-blue-500"
            >
              <option value="">Select Category</option>
              {EXPENSE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-gray-200">
            <label className="text-sm text-gray-700 font-medium mb-3 block">What was it for?</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Walmart"
              className="w-full p-3 border border-gray-200 rounded-lg text-gray-800 outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 py-4 px-6 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!amount || !category}
              className="flex-1 py-4 px-6 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Expense
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExpenseModal;
