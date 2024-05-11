import { View, Text, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";

function ExpensesSummary({ expenses, periodName }) {
  // Reduce method allows to combine multiple values in an array into a single value.
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  // toFixed method ensures that output will be a number with two decimal places.
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 14,
    color: GlobalStyles.colors.primary800,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary800,
  },
});
