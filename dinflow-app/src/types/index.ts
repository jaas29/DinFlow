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

export interface AppState {
  user: User | null;
  expenses: Expense[];
  isOnboarded: boolean;
}

export type DinoState = 'welcome' | 'noSavings' | 'greatJob';

export const EXPENSE_CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Health & Fitness',
  'Travel',
  'Other',
] as const;

export type ExpenseCategory = typeof EXPENSE_CATEGORIES[number];
