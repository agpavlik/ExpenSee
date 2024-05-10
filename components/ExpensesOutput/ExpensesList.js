import { FlatList, Text } from "react-native";

// Get data
function renderExpenseItem(itemData) {
  return <Text>{itemData.item.description}</Text>;
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
