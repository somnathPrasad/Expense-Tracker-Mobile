import { GestureResponderEvent, Pressable, StyleSheet } from "react-native";
import { TabBarIcon } from "../navigation/TabBarIcon";
import { ComponentProps } from "react";
import { Ionicons } from "@expo/vector-icons";

interface FloatingButtonProps {
  onPressOut: ((event: GestureResponderEvent) => void) | null | undefined;
  icon: ComponentProps<typeof Ionicons>["name"];
}

export default function FloatingButton(props: FloatingButtonProps) {
  return (
    <Pressable
      style={styles.floatingButton}
      className="bg-white absolute bottom-2 right-4 p-3 rounded-2xl"
      onPressOut={props.onPressOut}
    >
      <TabBarIcon name={props.icon} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    elevation: 10,
    shadowOpacity: 10,
    shadowOffset: { width: 10, height: 30 },
  },
});
