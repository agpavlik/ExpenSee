import axios from "axios";

const BACKEND_URL = "https://expensee-1dc38-default-rtdb.firebaseio.com";

// post request to Firebase
export function storeExpense(expenseData) {
  axios.post(BACKEND_URL + "/expenses.json", expenseData);
}

// fetch data from Firebase
export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");

  const expenses = [];

  // Firebase provided an object (key) with nested objects (amount, date, description)
  // Loop throught all the response keys
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}
