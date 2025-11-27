export interface User {
  email: string;
  monthlyIncome: number;
  savingsPercentage: number;
}

export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface Income {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface AppState {
  user: User | null;
  expenses: Expense[];
  incomes: Income[];
  isOnboarded: boolean;
}

export type DinoState = 'welcome' | 'noSavings' | 'greatJob';

export const EXPENSE_CATEGORIES = [
  { name: 'Food & Dining', icon: '🍔' },
  { name: 'Transportation', icon: '🚗' },
  { name: 'Shopping', icon: '🛍️' },
  { name: 'Entertainment', icon: '🎬' },
  { name: 'Bills & Utilities', icon: '💡' },
  { name: 'Health & Fitness', icon: '🏥' },
  { name: 'Travel', icon: '✈️' },
  { name: 'Other', icon: '📦' },
] as const;

export type ExpenseCategory = typeof EXPENSE_CATEGORIES[number]['name'];

export const getCategoryIcon = (categoryName: string): string => {
  const category = EXPENSE_CATEGORIES.find(cat => cat.name === categoryName);
  return category?.icon || '📦';
};
