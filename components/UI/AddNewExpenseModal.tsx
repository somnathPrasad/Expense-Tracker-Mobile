import {
  Modal,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { NewExpenseItem } from "@/types/expense.type";
import Chip from "./Chip";
import { useState } from "react";

interface AddNewExpenseModalProps {
  visible: boolean;
  onRequestClose: ((event: NativeSyntheticEvent<any>) => void) | undefined;
  newExpenseItem: NewExpenseItem;
  setNewExpenseItem: React.Dispatch<React.SetStateAction<NewExpenseItem>>;
  onAdd: () => Promise<void>;
}

export default function AddNewExpenseModal({
  visible,
  onRequestClose,
  newExpenseItem,
  setNewExpenseItem,
  onAdd,
}: AddNewExpenseModalProps) {
  const minHeight = 27,
    maxHeight = 200;
  const [height, setHeight] = useState(minHeight);

  const handleContentSizeChange = (event: any) => {
    const newHeight = Math.min(
      maxHeight,
      Math.max(minHeight, event.nativeEvent.contentSize.height)
    );
    setHeight(newHeight);
  };

  return (
    <Modal
      animationType="none"
      transparent
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <Pressable
        className="flex-1 justify-center items-center px-4"
        // onPressOut={onRequestClose}
        style={styles.modelContainer}
      >
        <View
          style={styles.container}
          className="bg-white rounded-xl items-start p-5 w-full"
        >
          <View className="flex-row mb-4 items-center gap-2 flex-wrap">
            <Chip
              onPressOut={() => {
                setNewExpenseItem({
                  ...newExpenseItem,
                  type: "Sent to someone 🧑",
                });
              }}
              text="Sent to someone 🧑"
              active={newExpenseItem.type === "Sent to someone 🧑"}
            />
            <Chip
              onPressOut={() => {
                setNewExpenseItem({ ...newExpenseItem, type: "Other" });
              }}
              text="Other"
              active={newExpenseItem.type === "Other"}
            />
            <Chip
              onPressOut={() => {
                setNewExpenseItem({
                  ...newExpenseItem,
                  type: "Spent on something 📦",
                });
              }}
              text="Spent on something 📦"
              active={newExpenseItem.type === "Spent on something 📦"}
            />
          </View>

          {newExpenseItem.type === "Spent on something 📦" ? (
            <View className="flex-row flex-wrap items-center">
              <Text className="text-lg">Spent ₹ </Text>
              <TextInput
                style={[{ height: minHeight }]}
                className="border-b w-14 text-xl"
                placeholder="100"
                onChangeText={(text) =>
                  setNewExpenseItem({ ...newExpenseItem, amount: text })
                }
              />
              <Text className="text-2xl"> ,</Text>
              <View className="flex-row flex-wrap items-center pt-2">
                <Text className="text-lg">On </Text>
                <TextInput
                  className="border-b w-44 text-xl"
                  placeholder="Vegetables"
                  multiline
                  style={[styles.input, { height }]}
                  onContentSizeChange={handleContentSizeChange}
                  onChangeText={(text) =>
                    setNewExpenseItem({
                      ...newExpenseItem,
                      title: "Spent on " + text,
                      category: text,
                    })
                  }
                />
                <Text className="text-2xl"> .</Text>
              </View>
            </View>
          ) : newExpenseItem.type === "Sent to someone 🧑" ? (
            <View className="flex-row flex-wrap items-center">
              <Text className="text-lg">Sent ₹ </Text>
              <TextInput
                style={[{ height: minHeight }]}
                className="border-b w-14 text-xl"
                placeholder="100"
                onChangeText={(text) =>
                  setNewExpenseItem({ ...newExpenseItem, amount: text })
                }
              />
              <Text className="text-2xl"> ,</Text>
              <View className="flex-row flex-wrap items-center pt-2">
                <Text className="text-lg">to </Text>
                <TextInput
                  className="border-b w-44 text-xl"
                  placeholder="Brother"
                  multiline
                  style={[styles.input, { height }]}
                  onContentSizeChange={handleContentSizeChange}
                  onChangeText={(text) =>
                    setNewExpenseItem({
                      ...newExpenseItem,
                      title: "Sent to " + text,
                      category: text,
                    })
                  }
                />
                <Text className="text-2xl"> .</Text>
              </View>
            </View>
          ) : (
            <View className="w-full">
              <TextInput
                onChangeText={(text) =>
                  setNewExpenseItem({ ...newExpenseItem, amount: text })
                }
                className="border rounded-md px-5 py-2 w-full"
                placeholder="Amount"
                keyboardType="numeric"
              />
              <TextInput
                onChangeText={(text) =>
                  setNewExpenseItem({ ...newExpenseItem, title: text })
                }
                className="border rounded-md px-5 py-2 w-full mt-2"
                placeholder="Title"
              />
              <TextInput
                onChangeText={(text) =>
                  setNewExpenseItem({ ...newExpenseItem, category: text })
                }
                className="border rounded-md px-5 py-2 w-full mt-2"
                placeholder="Category"
              />
            </View>
          )}

          <View className="flex flex-row justify-between w-full items-center mt-4">
            <Pressable onPressOut={onRequestClose}>
              <Text>Cancel</Text>
            </Pressable>
            <Pressable
              onPressOut={onAdd}
              className="bg-black px-7 py-2 rounded-full"
            >
              <Text className="text-white text-base font-semibold">Add</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modelContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    elevation: 50,
  },
  input: {
    textAlignVertical: "top", // For Android
  },
});
