import { axiosInstance } from "@/lib/axios";
import { ExpenseItem } from "@/types/expense.type";
import { useQuery } from "@tanstack/react-query";

export interface CreateExpense {
  title: string;
  category: string;
  amount: number;
}

const fetchExpenses = async () => {
  const response = await axiosInstance.get("/expenses");
  return response.data as ExpenseItem[];
};

export const createExpense = async (data: CreateExpense) => {
  const response = await axiosInstance.post("/expenses", data);
  return response.data;
};

export const deleteExpense = async (id: string) => {
  const response = await axiosInstance.delete(`/expenses/${id}`);
  return response.data;
};

export const useExpenses = () => {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: fetchExpenses,
    initialData: [],
  });
};
