import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Expense, Income, AppState } from '../types';

interface AppContextType extends AppState {
  setUser: (user: User) => void;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  addIncome: (income: Omit<Income, 'id'>) => void;
  deleteExpense: (id: string) => void;
  deleteAllExpenses: () => void;
  resetApp: () => void;
  updateUserSettings: (settings: Partial<User>) => void;
  totalSpent: number;
  totalIncome: number;
  remainingBudget: number;
  monthlySavings: number;
  availableToSpend: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'dinflow_data';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from localStorage on first render
  const [state, setState] = useState<AppState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Ensure incomes array exists for backward compatibility
        return {
          ...parsed,
          incomes: parsed.incomes || []
        };
      } catch {
        return { user: null, expenses: [], incomes: [], isOnboarded: false };
      }
    }
    return { user: null, expenses: [], incomes: [], isOnboarded: false };
  });

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setUser = (user: User) => {
    setState((prev) => ({ ...prev, user, isOnboarded: true }));
  };

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    // Generate unique ID and add expense to the beginning of the list
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
    };
    setState((prev) => ({
      ...prev,
      expenses: [newExpense, ...prev.expenses],
    }));
  };

  const addIncome = (income: Omit<Income, 'id'>) => {
    // Generate unique ID and add income to the beginning of the list
    const newIncome: Income = {
      ...income,
      id: Date.now().toString(),
    };
    setState((prev) => ({
      ...prev,
      incomes: [newIncome, ...prev.incomes],
    }));
  };

  const deleteExpense = (id: string) => {
    setState((prev) => ({
      ...prev,
      expenses: prev.expenses.filter((expense) => expense.id !== id),
    }));
  };

  const deleteAllExpenses = () => {
    setState((prev) => ({ ...prev, expenses: [] }));
  };

  const resetApp = () => {
    setState({ user: null, expenses: [], incomes: [], isOnboarded: false });
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateUserSettings = (settings: Partial<User>) => {
    setState((prev) => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...settings } : null,
    }));
  };

  // Calculate financial metrics from state
  const totalSpent = state.expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalIncome = state.incomes.reduce((sum, inc) => sum + inc.amount, 0);
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
        addIncome,
        deleteExpense,
        deleteAllExpenses,
        resetApp,
        updateUserSettings,
        totalSpent,
        totalIncome,
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
