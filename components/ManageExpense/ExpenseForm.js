import { StyleSheet, Text, View } from "react-native";

import Input from "./Input";

function ExpenseForm() {
  function amountChangedHandler() {}

  return (
    <View>
      <Text>Your Expense</Text>
      <View>
        <Input
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: amountChangedHandler, // this allows to point at a function that should be executed whenever a user enters a value here.
          }}
        />
        <Input
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: () => {},
          }}
        />
        <Input
          label="Description"
          textInputConfig={{
            multiline: true,
            // autoCapitalize: 'none'
            // autoCorrect: false // default is true
          }}
        />
      </View>
    </View>
  );
}

export default ExpenseForm;

// const newLocal = StyleSheet.create({
//   form: {
//     marginTop: 40,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "white",
//     marginVertical: 24,
//     textAlign: "center",
//   },
//   inputsRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   rowInput: {
//     flex: 1,
//   },
// });
// const styles = newLocal;
