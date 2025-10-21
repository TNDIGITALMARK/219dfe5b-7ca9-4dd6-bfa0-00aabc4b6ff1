// Mock data for the expense dashboard

import { Transaction, CategoryBudget, CategoryData, MonthlyTrend, CategoryStats } from './types';

// Recent transactions
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    merchant: 'Starbucks Coffee',
    amount: 5.50,
    date: '2025-03-15',
    category: 'dining',
  },
  {
    id: '2',
    merchant: 'Netflix Subscription',
    amount: 15.99,
    date: '2025-03-14',
    category: 'entertainment',
  },
  {
    id: '3',
    merchant: 'Uber Ride',
    amount: 18.30,
    date: '2025-03-13',
    category: 'transportation',
  },
  {
    id: '4',
    merchant: 'Target Shopping',
    amount: 67.89,
    date: '2025-03-12',
    category: 'shopping',
  },
  {
    id: '5',
    merchant: 'Chipotle Mexican Grill',
    amount: 12.50,
    date: '2025-03-12',
    category: 'dining',
  },
  {
    id: '6',
    merchant: 'AMC Theaters',
    amount: 28.00,
    date: '2025-03-11',
    category: 'entertainment',
  },
  {
    id: '7',
    merchant: 'Shell Gas Station',
    amount: 45.00,
    date: '2025-03-10',
    category: 'transportation',
  },
  {
    id: '8',
    merchant: 'Amazon Purchase',
    amount: 89.99,
    date: '2025-03-10',
    category: 'shopping',
  },
];

// Category spending data
export const mockCategoryData: CategoryData[] = [
  {
    category: 'dining',
    amount: 892,
    color: 'hsl(22, 100%, 63%)', // Orange
    icon: 'Utensils',
  },
  {
    category: 'entertainment',
    amount: 445,
    color: 'hsl(283, 39%, 53%)', // Purple
    icon: 'Music',
  },
  {
    category: 'shopping',
    amount: 678,
    color: 'hsl(204, 70%, 53%)', // Blue
    icon: 'ShoppingBag',
  },
  {
    category: 'transportation',
    amount: 289,
    color: 'hsl(174, 63%, 49%)', // Teal
    icon: 'Car',
  },
  {
    category: 'miscellaneous',
    amount: 543,
    color: 'hsl(200, 18%, 46%)', // Gray
    icon: 'MoreHorizontal',
  },
];

// Budget tracking
export const mockBudgets: CategoryBudget[] = [
  {
    category: 'dining',
    budgeted: 1000,
    spent: 892,
    percentUsed: 89,
    remaining: 108,
  },
  {
    category: 'entertainment',
    budgeted: 600,
    spent: 445,
    percentUsed: 74,
    remaining: 155,
  },
  {
    category: 'shopping',
    budgeted: 600,
    spent: 678,
    percentUsed: 113,
    remaining: -78,
  },
  {
    category: 'transportation',
    budgeted: 400,
    spent: 289,
    percentUsed: 72,
    remaining: 111,
  },
  {
    category: 'miscellaneous',
    budgeted: 500,
    spent: 543,
    percentUsed: 109,
    remaining: -43,
  },
];

// Monthly trends for dining category
export const mockDiningTrends: MonthlyTrend[] = [
  { month: 'December', amount: 945 },
  { month: 'January', amount: 823 },
  { month: 'February', amount: 756 },
  { month: 'March', amount: 892 },
];

// Category statistics for dining
export const mockDiningStats: CategoryStats = {
  category: 'dining',
  transactions: mockTransactions.filter(t => t.category === 'dining'),
  monthlyTrends: mockDiningTrends,
  averageTransaction: 28.50,
  mostFrequentMerchant: 'Chipotle Mexican Grill',
  totalSpent: 892,
};

// Total monthly spending
export const mockTotalMonthlySpending = 2847;

// Helper function to get category color
export const getCategoryColor = (category: string): string => {
  const categoryItem = mockCategoryData.find(c => c.category === category);
  return categoryItem?.color || 'hsl(200, 18%, 46%)';
};

// Helper function to format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Helper function to format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
};
