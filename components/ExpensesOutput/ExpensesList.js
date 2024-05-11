import { FlatList, Text } from "react-native";

import ExpenseItem from "./ExpenseItem";

// Get data
function renderExpenseItem(itemData) {
  return <ExpenseItem {...itemData.item} />;
}

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id} // Unique identifier
    />
  );
}

export default ExpensesList;
