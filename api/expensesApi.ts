import { db } from "@/db";
import {
  AddExpense,
  ExpenseItem,
  ExpenseUpdateByID,
} from "@/types/expense.type";

export async function fetchExpenses() {
  const result: ExpenseItem[] = await db.getAllAsync("SELECT * FROM expenses");
  return result;
}

export async function addExpense(expense: AddExpense) {
  const statement = await db.prepareAsync(
    "INSERT INTO expenses (title, amount, date, type) VALUES ($title, $amount, $date, $type)"
  );
  try {
    await statement.executeAsync({
      $title: expense.title,
      $amount: expense.amount,
      $date: expense.date,
      $type: expense.type,
    });

    const insertedId: any = await db.getFirstAsync(
      "SELECT id FROM expenses ORDER BY id DESC LIMIT 1;"
    );
    return { id: insertedId["id"] as number, ...expense };
  } catch (error) {
    console.log(error);
  } finally {
    await statement.finalizeAsync();
  }
}

export async function updateExpenseById(
  expense: ExpenseUpdateByID
): Promise<void> {
  const statement = await db.prepareAsync(
    "UPDATE expenses SET title = $title, amount = $amount, type = $type WHERE id = $id"
  );
  try {
    await statement.executeAsync({
      $id: expense.id,
      $title: expense.title,
      $amount: expense.amount,
      $type: expense.type,
    });
  } catch (error) {
    console.log(error);
  } finally {
    await statement.finalizeAsync();
  }
}

export async function getExpenseById(id: number) {
  const result: ExpenseItem | null = await db.getFirstAsync(
    `SELECT id, title, amount, date FROM expenses WHERE id = ${id}`
  );
  return result;
}

export async function deleteExpenseById(id: number): Promise<void> {
  try {
    await db.runAsync(`DELETE FROM expenses WHERE id = ${id}`);
  } catch (error) {
    console.log(error);
  }
}
