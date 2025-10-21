'use client';

import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CategoryBudget } from '@/lib/types';
import { getCategoryColor } from '@/lib/mock-data';

interface BudgetProgressCardProps {
  budget: CategoryBudget;
}

export function BudgetProgressCard({ budget }: BudgetProgressCardProps) {
  const categoryNames = {
    dining: 'Dining',
    entertainment: 'Entertainment',
    shopping: 'Shopping',
    transportation: 'Transportation',
    miscellaneous: 'Miscellaneous',
  };

  const isOverBudget = budget.percentUsed > 100;
  const categoryColor = getCategoryColor(budget.category);

  return (
    <Card className="p-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-foreground">
            {categoryNames[budget.category]}
          </h4>
          <span className="text-sm text-muted-foreground">
            ${budget.spent} / ${budget.budgeted}
          </span>
        </div>

        <Progress
          value={Math.min(budget.percentUsed, 100)}
          className="h-2"
          style={
            {
              '--progress-background': categoryColor,
            } as React.CSSProperties
          }
        />

        <div className="flex items-center justify-between text-sm">
          <span
            className={`font-medium ${
              isOverBudget ? 'text-destructive' : 'text-success'
            }`}
          >
            {isOverBudget ? 'Over budget' : `${budget.percentUsed}% used`}
          </span>
          <span
            className={
              isOverBudget ? 'text-destructive font-medium' : 'text-success font-medium'
            }
          >
            {isOverBudget ? `-$${Math.abs(budget.remaining)}` : `$${budget.remaining} left`}
          </span>
        </div>
      </div>
    </Card>
  );
}
