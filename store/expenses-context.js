import { createContext, useReducer } from "react";
// createContext lets to create a context that components can provide or read.
// SomeContext.Provider lets to provide the context value to components.
// We can use useContext to pull in the value without having to have passed it down through props.

// const EXPENSES_DATA = [
//   {
//     id: "e1",
//     description: "A pair of shoes",
//     amount: 59.99,
//     date: new Date("2023-12-19"),
//   },
//   {
//     id: "e2",
//     description: "A pair of trousers",
//     amount: 89.29,
//     date: new Date("2024-01-05"),
//   },
//   {
//     id: "e3",
//     description: "Some bananas",
//     amount: 5.99,
//     date: new Date("2023-12-01"),
//   },
//   {
//     id: "e4",
//     description: "A book",
//     amount: 14.99,
//     date: new Date("2024-02-19"),
//   },
//   {
//     id: "e5",
//     description: "Another book",
//     amount: 18.59,
//     date: new Date("2024-02-18"),
//   },
//   {
//     id: "e6",
//     description: "A pair of trousers",
//     amount: 89.29,
//     date: new Date("2024-01-05"),
//   },
//   {
//     id: "e7",
//     description: "Some bananas",
//     amount: 5.99,
//     date: new Date("2023-12-01"),
//   },
//   {
//     id: "e8",
//     description: "A book",
//     amount: 14.99,
//     date: new Date("2024-02-19"),
//   },
//   {
//     id: "e9",
//     description: "Another book",
//     amount: 18.59,
//     date: new Date("2024-05-11"),
//   },
// ];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {}, // set expenses to the context and then work with set and fetched expenses
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      // generate id and add it to the state along with payload
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "SET":
      // In fact action.payload will be expected array of expenses
      return action.payload;
    case "UPDATE":
      // Find expense which we want to update. This gives us index.
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      // Reach current value
      const updatableExpense = state[updatableExpenseIndex];
      // Update value
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      // Reach current state
      const updatedExpenses = [...state];
      // Update current value in state with a new value
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      // return state with all the value which is not equal exact id
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  // Bundle all the data together to expose to all the interested components
  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    setExpenses: setExpenses,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
