import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";

function ExpenseItem({ description, amount, date }) {
  // Use hook for navigation
  const navigation = useNavigation();
  // Navigate to ManageExpenses screen after press on any expense
  function expensePressHandler() {
    navigation.navigate("ManageExpense");
  }

  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ExpenseItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  expenseItem: {
    padding: 12,
    marginVertical: 4,
    backgroundColor: GlobalStyles.colors.primary700,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray700,
    shadowRadius: 6,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 1,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: GlobalStyles.colors.primary50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 75,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});
