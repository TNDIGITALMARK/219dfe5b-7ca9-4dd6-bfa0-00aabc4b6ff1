'use client';

import { use } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TransactionItem } from '@/components/transaction-item';
import {
  mockTransactions,
  mockDiningTrends,
  getCategoryColor,
  formatCurrency,
} from '@/lib/mock-data';
import { ArrowLeft, TrendingUp, DollarSign, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CategoryType } from '@/lib/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: PageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const category = resolvedParams.slug as CategoryType;

  // Filter transactions for this category
  const categoryTransactions = mockTransactions.filter(
    (t) => t.category === category
  );

  // Calculate stats
  const totalSpent = categoryTransactions.reduce((sum, t) => sum + t.amount, 0);
  const averageTransaction =
    categoryTransactions.length > 0
      ? totalSpent / categoryTransactions.length
      : 0;
  const transactionCount = categoryTransactions.length;

  // Get category color
  const categoryColor = getCategoryColor(category);

  // Category names
  const categoryNames: Record<CategoryType, string> = {
    dining: 'Dining',
    entertainment: 'Entertainment',
    shopping: 'Shopping',
    transportation: 'Transportation',
    miscellaneous: 'Miscellaneous',
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push('/')}
            className="shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">
              {categoryNames[category]} Expenses
            </h1>
            <p className="text-muted-foreground">
              Detailed breakdown and insights for your {categoryNames[category].toLowerCase()}{' '}
              spending
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
                style={{ backgroundColor: categoryColor }}
              >
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(totalSpent)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
                style={{ backgroundColor: categoryColor }}
              >
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average Transaction</p>
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(averageTransaction)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
                style={{ backgroundColor: categoryColor }}
              >
                <ShoppingCart className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Transactions</p>
                <p className="text-2xl font-bold text-foreground">
                  {transactionCount}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Monthly Trend Chart */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-foreground">
            Monthly Spending Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockDiningTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="month"
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '0.875rem' }}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '0.875rem' }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                formatter={(value: number) => [`$${value}`, 'Spent']}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke={categoryColor}
                strokeWidth={3}
                dot={{ fill: categoryColor, r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Transaction History */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-foreground">
            Transaction History
          </h3>
          <div className="space-y-2">
            {categoryTransactions.length > 0 ? (
              categoryTransactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>No transactions found for this category</p>
              </div>
            )}
          </div>
        </Card>

        {/* Insights Card */}
        <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <h3 className="text-xl font-semibold mb-3 text-foreground">
            💡 Spending Insights
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              • Your {categoryNames[category].toLowerCase()} spending is{' '}
              <span className="font-semibold text-foreground">
                {formatCurrency(totalSpent)}
              </span>{' '}
              this month
            </p>
            <p>
              • You average{' '}
              <span className="font-semibold text-foreground">
                {formatCurrency(averageTransaction)}
              </span>{' '}
              per transaction
            </p>
            <p>
              • Most frequent merchant:{' '}
              <span className="font-semibold text-foreground">
                {categoryTransactions[0]?.merchant || 'N/A'}
              </span>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
