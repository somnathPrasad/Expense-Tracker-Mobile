import { format } from "date-fns";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { StyleSheet } from "react-native";

export default function HeaderRightDate() {
  const today = new Date();
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.date}>{format(today, "MMMM yyyy")}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingRight: 10,
  },
  date: {
    fontWeight: 800,
  },
});
