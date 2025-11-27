import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Expense, AppState } from '../types';

interface AppContextType extends AppState {
  setUser: (user: User) => void;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  deleteAllExpenses: () => void;
  resetApp: () => void;
  updateUserSettings: (settings: Partial<User>) => void;
  totalSpent: number;
  remainingBudget: number;
  monthlySavings: number;
  availableToSpend: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'dinflow_data';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return { user: null, expenses: [], isOnboarded: false };
      }
    }
    return { user: null, expenses: [], isOnboarded: false };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setUser = (user: User) => {
    setState((prev) => ({ ...prev, user, isOnboarded: true }));
  };

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
    };
    setState((prev) => ({
      ...prev,
      expenses: [newExpense, ...prev.expenses],
    }));
  };

  const deleteAllExpenses = () => {
    setState((prev) => ({ ...prev, expenses: [] }));
  };

  const resetApp = () => {
    setState({ user: null, expenses: [], isOnboarded: false });
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateUserSettings = (settings: Partial<User>) => {
    setState((prev) => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...settings } : null,
    }));
  };

  const totalSpent = state.expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const monthlySavings = state.user
    ? (state.user.monthlyIncome * state.user.savingsPercentage) / 100
    : 0;
  const availableToSpend = state.user ? state.user.monthlyIncome - monthlySavings : 0;
  const remainingBudget = availableToSpend - totalSpent;

  return (
    <AppContext.Provider
      value={{
        ...state,
        setUser,
        addExpense,
        deleteAllExpenses,
        resetApp,
        updateUserSettings,
        totalSpent,
        remainingBudget,
        monthlySavings,
        availableToSpend,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
