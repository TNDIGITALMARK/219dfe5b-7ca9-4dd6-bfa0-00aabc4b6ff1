// Type definitions for the expense dashboard

export type CategoryType = 'dining' | 'entertainment' | 'shopping' | 'transportation' | 'miscellaneous';

export interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  date: string;
  category: CategoryType;
  notes?: string;
}

export interface CategoryBudget {
  category: CategoryType;
  budgeted: number;
  spent: number;
  percentUsed: number;
  remaining: number;
}

export interface CategoryData {
  category: CategoryType;
  amount: number;
  color: string;
  icon: string;
}

export interface MonthlyTrend {
  month: string;
  amount: number;
}

export interface CategoryStats {
  category: CategoryType;
  transactions: Transaction[];
  monthlyTrends: MonthlyTrend[];
  averageTransaction: number;
  mostFrequentMerchant: string;
  totalSpent: number;
}
