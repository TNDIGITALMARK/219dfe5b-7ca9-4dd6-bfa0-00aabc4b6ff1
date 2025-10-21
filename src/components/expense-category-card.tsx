'use client';

import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { CategoryType } from '@/lib/types';

interface ExpenseCategoryCardProps {
  icon: LucideIcon;
  category: CategoryType;
  amount: number;
  color: string;
  onClick?: () => void;
}

export function ExpenseCategoryCard({
  icon: Icon,
  category,
  amount,
  color,
  onClick
}: ExpenseCategoryCardProps) {
  const categoryNames = {
    dining: 'Dining',
    entertainment: 'Entertainment',
    shopping: 'Shopping',
    transportation: 'Transportation',
    miscellaneous: 'Miscellaneous',
  };

  return (
    <Card
      className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center text-white shrink-0"
          style={{ backgroundColor: color }}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-lg text-foreground">
            {categoryNames[category]}
          </h4>
          <p className="text-2xl font-bold text-foreground mt-1">
            ${amount.toLocaleString()}
          </p>
        </div>
      </div>
    </Card>
  );
}
