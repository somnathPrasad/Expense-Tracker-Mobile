import { GestureResponderEvent, Pressable } from "react-native";
import { ThemedText } from "../ThemedText";
import { StyleSheet } from "react-native";

interface ChipProps {
  text: string;
  active?: boolean;
  color?: string;
  width?: number;
  onPressOut?: ((event: GestureResponderEvent) => void) | null | undefined;
}

export default function Chip({
  text,
  active,
  onPressOut,
  color,
  width,
}: ChipProps) {
  return (
    <Pressable
      className="rounded-full px-4 py-2 my-0.5 mx-1 items-center justify-center"
      onPressOut={onPressOut}
      style={[
        styles.chipContainer,
        active
          ? styles.activeChipContainer
          : { backgroundColor: color ?? "#E0E0E0", width: width ?? null },
      ]}
    >
      <ThemedText
        style={[styles.chipText, active ? styles.activeChipText : null]}
      >
        {text}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chipContainer: {
    backgroundColor: "#E0E0E0",
  },
  activeChipContainer: {
    backgroundColor: "#6200EE", // Active background color
  },
  chipText: {
    fontSize: 14,
    color: "#000",
  },
  activeChipText: {
    color: "#FFFFFF", // Active text color
  },
});
