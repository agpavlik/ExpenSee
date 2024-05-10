import { View, Text } from "react-native";

function ExpensesSummary({ expenses, periodName }) {
  // Reduce method allows to combine multiple values in an array into a single value.
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  // toFixed method ensures that output will be a number with two decimal places.
  return (
    <View>
      <Text>{periodName}</Text>
      <Text>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}

export default ExpensesSummary;
