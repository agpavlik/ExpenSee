import { StyleSheet, Text, View } from "react-native";

import Input from "./Input";
import { useState } from "react";

function ExpenseForm() {
  // ---- Handle input
  const [inputValues, setInputValues] = useState({
    amount: "",
    date: "",
    description: "",
  });

  // Instead of creation of several handler for every input there is a solution for all the inputs
  // The 'enteredValue'- is automatic oparameter set by React. An additional parameter "inputIdentifier" allows to call the exact state.
  // The idea is to overwrite the exact value for the one input and keep all the states that have not changed
  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValues((curInputValues) => {
      return {
        ...curInputValues, // spread all the values
        [inputIdentifier]: enteredValue, // overwrite one value of amount/date/description
      };
    });
  }
  // ----

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"), // this allows to point at a function that should be executed whenever a user enters a value here. The second argument is "inputIdentifier"
            value: inputValues.amount,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputValues.date,
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          // autoCapitalize: 'none'
          // autoCorrect: false // default is true
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputValues.description,
        }}
      />
    </View>
  );
}

export default ExpenseForm;

const newLocal = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
});
const styles = newLocal;
