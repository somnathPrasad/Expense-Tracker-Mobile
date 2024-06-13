import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useExpenses } from "@/hooks/api/useExpenses";

export default function TabTwoScreen() {
  return (
    <ThemedView className="flex-1">
      <ThemedView className="p-5">
        <ThemedText className="text-xl">Total Expenses </ThemedText>
        {/* <ThemedText className="text-2xl"> ₹{}</ThemedText> */}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
