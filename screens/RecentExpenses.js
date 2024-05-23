import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true); // add spinner
  const [error, setError] = useState();

  const expensesCtx = useContext(ExpensesContext);
  // useContext to update data offline in addition to sending the data to the backend.
  // Therefore it is not necessary to fetch this data again.

  // Fetch data
  // useEffect allows to execute code whenever the component re-renders.
  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true); // start fetching
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch expenses!");
      }

      setIsFetching(false); // stop after fetching done
    }

    getExpenses();
  }, []);
  // ----

  // Check error
  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  // spinner
  if (isFetching) {
    return <LoadingOverlay />;
  }

  // ---- Filter expenses to return only last 7 days expenses
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    // return true if an expense has its state in that range of dates
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  // ----

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;
