import { GestureResponderEvent, Pressable, View } from "react-native";
import { format } from "date-fns";
import { ExpenseItem as ExpenseItemType } from "@/types/expense.type";
import { ThemedText } from "../ThemedText";

interface ExpenseItemProps {
  item: ExpenseItemType;
  onLongPress: ((event: GestureResponderEvent) => void) | null | undefined;
}

export function ExpenseItem({ item, onLongPress }: ExpenseItemProps) {
  return (
    <View className="px-2 py-2">
      <Pressable
        onLongPress={onLongPress}
        className="flex-row justify-between items-center px-2 py-2 rounded-xl"
      >
        <View>
          <ThemedText className="text-xl">
            {item.title.toLowerCase()}
          </ThemedText>
          <ThemedText className="opacity-70 text-sm">
            {format(item.createdAt, "dd MMM yy")}
          </ThemedText>
        </View>
        <ThemedText className="text-xl font-medium">₹{item.amount}</ThemedText>
      </Pressable>
    </View>
  );
}
