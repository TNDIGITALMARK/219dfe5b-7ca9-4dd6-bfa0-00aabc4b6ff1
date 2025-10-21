'use client';

import { Transaction } from '@/lib/types';
import { formatDate, getCategoryColor } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';

interface TransactionItemProps {
  transaction: Transaction;
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const categoryColor = getCategoryColor(transaction.category);

  return (
    <div className="flex items-center justify-between p-4 hover:bg-muted/50 rounded-lg transition-colors">
      <div className="flex items-center gap-4 flex-1">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold"
          style={{ backgroundColor: categoryColor }}
        >
          {transaction.merchant.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-foreground">{transaction.merchant}</p>
          <p className="text-sm text-muted-foreground">
            {formatDate(transaction.date)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge
          variant="secondary"
          className="capitalize"
          style={{
            backgroundColor: `${categoryColor}20`,
            color: categoryColor,
            borderColor: categoryColor,
          }}
        >
          {transaction.category}
        </Badge>
        <p className="font-semibold text-foreground text-lg">
          ${transaction.amount.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
