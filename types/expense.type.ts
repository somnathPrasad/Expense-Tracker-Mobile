export type ExpenseItem = {
  _id: string;
  title: string;
  createdAt: Date;
  amount: number;
};

export type NewExpenseItem = {
  title: string;
  amount: string;
  type: ExpenseType;
  category: string;
};

export type AddExpense = {
  title: string;
  date: string;
  amount: number;
  type: ExpenseType;
};

export type ExpenseUpdateByID = {
  id: number;
  title: string;
  date: string;
  amount: number;
  type: ExpenseType;
};

export type ExpenseType =
  | "Sent to someone 🧑"
  | "Spent on something 📦"
  | "Other";
