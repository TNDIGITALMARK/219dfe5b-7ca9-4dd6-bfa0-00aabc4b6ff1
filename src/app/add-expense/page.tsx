'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CategoryType } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Utensils, Music, ShoppingBag, Car, MoreHorizontal } from 'lucide-react';

const categories = [
  { value: 'dining' as CategoryType, label: 'Dining', icon: Utensils, color: 'hsl(22, 100%, 63%)' },
  { value: 'entertainment' as CategoryType, label: 'Entertainment', icon: Music, color: 'hsl(283, 39%, 53%)' },
  { value: 'shopping' as CategoryType, label: 'Shopping', icon: ShoppingBag, color: 'hsl(204, 70%, 53%)' },
  { value: 'transportation' as CategoryType, label: 'Transportation', icon: Car, color: 'hsl(174, 63%, 49%)' },
  { value: 'miscellaneous' as CategoryType, label: 'Miscellaneous', icon: MoreHorizontal, color: 'hsl(200, 18%, 46%)' },
];

export default function AddExpensePage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [formData, setFormData] = useState({
    merchant: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategory) {
      toast.error('Please select a category');
      return;
    }

    if (!formData.merchant || !formData.amount) {
      toast.error('Please fill in all required fields');
      return;
    }

    // In a real app, this would save to a database
    toast.success('Expense added successfully!');

    // Reset form
    setFormData({
      merchant: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      notes: '',
    });
    setSelectedCategory(null);

    // Navigate back to dashboard
    setTimeout(() => {
      router.push('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Add New Expense</h1>
            <p className="text-muted-foreground mt-2">
              Quickly log a new expense to track your spending
            </p>
          </div>

          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category Selection */}
              <div className="space-y-3">
                <Label htmlFor="category" className="text-base font-semibold">
                  Category *
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    const isSelected = selectedCategory === category.value;
                    return (
                      <button
                        key={category.value}
                        type="button"
                        onClick={() => setSelectedCategory(category.value)}
                        className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                          isSelected
                            ? 'border-accent bg-accent/10'
                            : 'border-border bg-card hover:border-accent/50'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
                            style={{ backgroundColor: category.color }}
                          >
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="text-sm font-medium text-foreground">
                            {category.label}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Merchant Name */}
              <div className="space-y-2">
                <Label htmlFor="merchant" className="text-base font-semibold">
                  Merchant Name *
                </Label>
                <Input
                  id="merchant"
                  type="text"
                  placeholder="e.g., Starbucks, Target, Netflix"
                  value={formData.merchant}
                  onChange={(e) =>
                    setFormData({ ...formData, merchant: e.target.value })
                  }
                  className="text-base"
                  required
                />
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-base font-semibold">
                  Amount *
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">
                    $
                  </span>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    className="pl-7 text-base"
                    required
                  />
                </div>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label htmlFor="date" className="text-base font-semibold">
                  Date *
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="text-base"
                  required
                />
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-base font-semibold">
                  Notes (Optional)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Add any additional notes about this expense..."
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className="text-base resize-none"
                  rows={3}
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-accent hover:bg-accent/90 text-white"
                  size="lg"
                >
                  Add Expense
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/')}
                  size="lg"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
