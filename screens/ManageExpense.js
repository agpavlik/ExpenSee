import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import LoadingOverlay from "../components/UI/LoadingOverlay";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";

function ManageExpense({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false); //spinner

  const expensesCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId; // ? - safe way of drilling into an object which might be undefned.
  const isEditing = !!editedExpenseId; // !! - way to convert value into boolean

  // fetch selected expense
  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  // Wrap with useEffect to avoid that it's flickering initially,
  useLayoutEffect(() => {
    navigation.setOptions({
      // setOptions method takes an options object which allows to set values like a title.
      // If this is true - say Edit Expense, if this is false - say Add Expense.
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  // Delete expense
  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    await deleteExpense(editedExpenseId);
    // setIsSubmitting(false);
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack(); // goBack method is equivalent of pressing a back button
  }

  function cancelHandler() {
    navigation.goBack();
  }

  // Edit expense
  async function confirmHandler(expenseData) {
    setIsSubmitting(true);
    if (isEditing) {
      expensesCtx.updateExpense(
        editedExpenseId,
        expenseData
        //   {
        //   description: "Test!!!!",
        //   amount: 29.99,
        //   date: new Date("2024-05-12"),
        // }
      );
      await updateExpense(editedExpenseId, expenseData);
    } else {
      const id = await storeExpense(expenseData); // post request
      expensesCtx.addExpense(
        { ...expenseData, id: id }
        //   {
        //   description: "Test",
        //   amount: 19.99,
        //   date: new Date("2024-05-11"),
        // }
      );
    }
    navigation.goBack();
  }

  //spinner
  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={28}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
