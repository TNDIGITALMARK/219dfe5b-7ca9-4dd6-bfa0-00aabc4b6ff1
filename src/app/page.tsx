'use client';

import { Card } from '@/components/ui/card';
import { ExpenseCategoryCard } from '@/components/expense-category-card';
import { TransactionItem } from '@/components/transaction-item';
import { BudgetProgressCard } from '@/components/budget-progress-card';
import { SpendingChart } from '@/components/spending-chart';
import {
  mockCategoryData,
  mockTransactions,
  mockBudgets,
  mockTotalMonthlySpending,
} from '@/lib/mock-data';
import {
  Utensils,
  Music,
  ShoppingBag,
  Car,
  MoreHorizontal,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const iconMap = {
  Utensils,
  Music,
  ShoppingBag,
  Car,
  MoreHorizontal,
};

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section - Total Spending */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Take Control of Your Finances
          </h1>
          <p className="text-muted-foreground text-lg">
            Smart budgeting, effortless tracking, informed decisions
          </p>
        </div>

        {/* Total Monthly Spending Card */}
        <Card className="p-8 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
          <div className="text-center space-y-2">
            <p className="text-sm uppercase tracking-wider opacity-90">
              Total Monthly Spending
            </p>
            <p className="text-5xl md:text-6xl font-bold">
              ${mockTotalMonthlySpending.toLocaleString()}
            </p>
            <p className="text-sm opacity-75">March 2025</p>
          </div>
        </Card>

        {/* Category Breakdown */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            Spending by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockCategoryData.map((category) => {
              const IconComponent = iconMap[category.icon as keyof typeof iconMap];
              return (
                <ExpenseCategoryCard
                  key={category.category}
                  icon={IconComponent}
                  category={category.category}
                  amount={category.amount}
                  color={category.color}
                  onClick={() => router.push(`/category/${category.category}`)}
                />
              );
            })}
          </div>
        </div>

        {/* Chart and Recent Transactions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Spending Chart */}
          <SpendingChart data={mockCategoryData} />

          {/* Recent Transactions */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              Recent Transactions
            </h3>
            <div className="space-y-2">
              {mockTransactions.slice(0, 6).map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))}
            </div>
          </Card>
        </div>

        {/* Budget Progress */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            Budget Tracking
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockBudgets.map((budget) => (
              <BudgetProgressCard key={budget.category} budget={budget} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
