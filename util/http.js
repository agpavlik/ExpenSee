import axios from "axios";

export function storeExpense(expenseData) {
  axios.post(
    "https://expensee-1dc38-default-rtdb.firebaseio.com/expenses.json",
    expenseData
  );
}
