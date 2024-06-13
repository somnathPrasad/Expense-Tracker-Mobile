import { ListSeparator } from "@/components/ListSeparator";
import { useMemo, useState } from "react";
import {
  ExpenseItem as ExpenseItemType,
  NewExpenseItem,
} from "@/types/expense.type";
import { ExpenseItem } from "@/components/UI/ExpenseItem";
import { FlatList } from "react-native";
import AddNewExpenseModal from "@/components/UI/AddNewExpenseModal";
import FloatingButton from "@/components/UI/FloatingButton";
import {
  createExpense,
  deleteExpense,
  useExpenses,
} from "@/hooks/api/useExpenses";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function HomeScreen() {
  const { data } = useExpenses();

  const total = useMemo(
    () => data.reduce((accumulator, curr) => accumulator + curr.amount, 0),
    [data]
  );

  const { mutate: createNewExpense } = useMutation({
    mutationFn: createExpense,
    onSuccess: (data) => {
      queryClient.setQueryData(["expenses"], (oldData: []) =>
        oldData ? [...oldData, data] : [data]
      );
    },
  });

  const { mutate: deleteExpenseById } = useMutation({
    mutationFn: deleteExpense,
    onSuccess: (data, id) => {
      queryClient.setQueryData(["expenses"], (oldData: ExpenseItemType[]) =>
        oldData.filter((item) => item._id !== id)
      );
    },
  });

  const [showAddItemModal, setShowItemModal] = useState(false);
  const [newItem, setNewItem] = useState<NewExpenseItem>({
    amount: "",
    title: "",
    type: "Spent on something 📦",
    category: "",
  });

  const handleOnAdd = async () => {
    const newExpense = {
      amount: parseInt(newItem.amount),
      title: newItem.title,
      category: newItem.category,
    };
    createNewExpense(newExpense);
    setShowItemModal(false);
  };

  const handleOnItemLongPress = (id: string) => {
    deleteExpenseById(id); // call api
  };

  const renderSeparator = () => {
    return <ListSeparator />;
  };

  const renderListItem = ({ item }: any) => {
    return (
      <ExpenseItem
        onLongPress={() => handleOnItemLongPress(item._id)}
        item={item}
      />
    );
  };

  return (
    <>
      <FlatList
        data={data}
        renderItem={renderListItem}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={renderSeparator}
      />

      <AddNewExpenseModal
        newExpenseItem={newItem}
        onAdd={handleOnAdd}
        onRequestClose={() => setShowItemModal(false)}
        setNewExpenseItem={setNewItem}
        visible={showAddItemModal}
      />

      <ThemedView className="py-4 px-3">
        <ThemedText className="text-xl">Total: ₹{total}</ThemedText>
      </ThemedView>

      <FloatingButton icon="add" onPressOut={() => setShowItemModal(true)} />
    </>
  );
}
