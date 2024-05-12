import { useLayoutEffect } from "react";
import { Text } from "react-native";

function ManageExpense({ route, navigation }) {
  const editedExpenseId = route.params?.expenseId; // ? - safe way of drilling into an object which might be undefned.
  const isEditing = !!editedExpenseId; // !! - way to convert value into boolean

  // Wrap with useEffect to avoid that it's flickering initially,
  useLayoutEffect(() => {
    navigation.setOptions({
      // setOptions method takes an options object which allows to set values like a title.
      // If this is true - say Edit Expense, if this is false - say Add Expense.
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  return <Text>ManageExpense Screen</Text>;
}

export default ManageExpense;
