import React from "react";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native";

export default function App() {
  const [answerValue, setAnswerValue] = useState(0);
  const [readyToReplace, setReadyToReplace] = useState(true);
  const [memoryValue, setMemoryValue] = useState(0);
  const [operatorValue, setOperatorValue] = useState("");
  const [equations, setEquations] = useState("");

  // buttonPressed Function
  const buttonPressed = (value) => {
    // Check if button is All Clear
    if (value == "AC") {
      setAnswerValue(0);
      setMemoryValue(0);
      setOperatorValue("");
      setEquations("");
      setReadyToReplace(true);
    }
    // Check if button is Clear
    else if (value == "C") {
      setAnswerValue(0);
      // Update the equations row to discard the old value with "0"
      const updatedEquations = equations.replace(
        answerValue.toString(),
        parseInt(0)
      );
      setEquations(updatedEquations);
      setReadyToReplace(true);
    }
    // Check if button is "="
    else if (value == "=") {
      const result = calculateEquals();
      setAnswerValue(result.toString());
      setMemoryValue(result.toString());
      setOperatorValue("");
      setReadyToReplace(true);
      console.log("This is the result value", result);
      setEquations(`${equations} = ${result}`);
    }

    // Check if value is numbers
    else if (!isNaN(value)) {
      const newAnswerValue = readyToReplace
        ? handleNumber(value)
        : answerValue + value;

      setAnswerValue(parseInt(newAnswerValue));
      setReadyToReplace(false);
      // Numbers Pressed Alert
      Alert.alert("Button Pressed", `${value}`);
      // Concatenate Number value to equations string
      setEquations(equations + value);
    }
    // Check if '+/-' is pressed
    else if (value === "+/-") {
      const convertAnswer = parseFloat(answerValue) * -1;
      //Replace the old answerValue with the new Answer
      const updatedEquations = equations.replace(
        answerValue.toString(),
        convertAnswer.toString()
      );
      setAnswerValue(convertAnswer);
      // Concatenate UpdatedAnswer value to equations string
      setEquations(updatedEquations);
    }
    // Check if % is pressed
    else if (value == "%") {
      let PercentAnswer = parseFloat(answerValue) * 0.01;
      //Replace the old answerValue with the new Answer
      const updatedEquations = equations.replace(
        answerValue.toString(),
        PercentAnswer.toString()
      );
      setAnswerValue(PercentAnswer);
      // Concatenate UpdatedAnswer value to equations string
      setEquations(updatedEquations);
    }
    //Check if is value are operators
    else if (isOperator(value)) {
      const ChainResult = calculateEquals();

      setAnswerValue(ChainResult);
      setMemoryValue(ChainResult);
      setOperatorValue(value);
      setReadyToReplace(true);
      // Concatenate Operator value to equations string
      setEquations(equations + value);
    } else {
      setMemoryValue(answerValue);
      setOperatorValue(value);
      setReadyToReplace(true);
    }
  };

  // handleNumber Function
  const handleNumber = (value) => {
    if (readyToReplace || answerValue === "0") {
      return value;
    } else {
      return answerValue + value;
    }
  };

  //isOperator Function
  const isOperator = (value) => {
    return (
      value == "+" ||
      value == "-" ||
      value == "X" ||
      value == "÷" ||
      value == "." ||
      value !== "0"
    );
  };

  //Calculate Function when pressed '='
  const calculateEquals = () => {
    const previous = parseFloat(memoryValue);
    const current = parseFloat(answerValue);

    switch (operatorValue) {
      case "+":
        return previous + current;
        break;
      case "-":
        return previous - current;
        break;
      case "X":
        return previous * current;
        break;
      case "÷":
        return previous / current;
        break;
      case ".":
        return previous + current * 0.1;
        break;
      default:
        return current;
        break;
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, width: "100%", height: "100%" }}>
        {/* Results field Defaulted to 0 */}
        <View style={styles.container}>
          <View style={styles.displayContainer}>
            {/* Display previous stored values */}
            <Text style={styles.equationText}>{equations}</Text>
            {/* Display Stored Operator */}
            <Text style={styles.displayText}> {answerValue}</Text>
            {/* Set results field value to answerValue */}
            <Text style={styles.operatorText}>{operatorValue}</Text>
          </View>

          {/* Includes a row of buttons "AC", "+/-", "%" , "÷"*/}
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.button, styles.ClearButton]}
              onPress={() => buttonPressed("AC")}
            >
              <Text style={styles.TextinWhite}>AC</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonRow1}
              onPress={() => buttonPressed("+/-")}
            >
              <Text style={styles.buttonText}>+/-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonRow1}
              onPress={() => buttonPressed("%")}
            >
              <Text style={styles.buttonText}>%</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonRow1, styles.buttonOrange]}
              onPress={() => buttonPressed("÷")}
            >
              <Text style={[styles.buttonText]}>÷</Text>
            </TouchableOpacity>
          </View>

          {/* Includes a row of buttons "7", "8", "9", "x" */}
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => buttonPressed("7")}
            >
              <Text style={[styles.buttonText]}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => buttonPressed("8")}
            >
              <Text style={[styles.buttonText]}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => buttonPressed("9")}
            >
              <Text style={[styles.buttonText]}>9</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonOrange]}
              onPress={() => buttonPressed("X")}
            >
              <Text style={[styles.buttonText]}>x</Text>
            </TouchableOpacity>
          </View>

          {/* Includes a row of buttons "4", "5", "6", "-" */}
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => buttonPressed("4")}
            >
              <Text style={[styles.buttonText]}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => buttonPressed("5")}
            >
              <Text style={[styles.buttonText]}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => buttonPressed("6")}
            >
              <Text style={[styles.buttonText]}>6</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonOrange]}
              onPress={() => buttonPressed("-")}
            >
              <Text style={[styles.buttonText]}>-</Text>
            </TouchableOpacity>
          </View>

          {/* Includes a row of buttons "1", "2", "3", "+" */}
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => buttonPressed("1")}
            >
              <Text style={[styles.buttonText]}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => buttonPressed("2")}
            >
              <Text style={[styles.buttonText]}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => buttonPressed("3")}
            >
              <Text style={[styles.buttonText]}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonOrange]}
              onPress={() => buttonPressed("+")}
            >
              <Text style={[styles.buttonText]}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Includes a row of buttons "0", ".", "C", "=" */}
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.button, styles.ClearButton]}
              onPress={() => buttonPressed("C")}
            >
              <Text style={[styles.TextinWhite]}>C</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => buttonPressed("0")}
            >
              <Text style={[styles.buttonText]}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => buttonPressed(".")}
            >
              <Text style={[styles.buttonText]}>.</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.EqualsButton]}
              onPress={() => buttonPressed("=")}
            >
              <Text style={[styles.TextinWhite]}>=</Text>
            </TouchableOpacity>
          </View>
          <StatusBar style="light content" />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  displayContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: 16,
  },
  displayText: {
    fontSize: 60,
    color: "#fff",
  },
  equationText: {
    fontSize: 30,
    color: "#00ffff",
  },
  operatorText: {
    fontSize: 30,
    color: "red",
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFDAB9",
    marginHorizontal: 4,
    height: 80,
    width: 80,
    borderRadius: 20,
  },
  buttonRow1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A9A9A9",
    marginHorizontal: 4,
    height: 80,
    width: 80,
    borderRadius: 20,
  },
  EqualsButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
    height: 80,
    width: 80,
    borderRadius: 20,
    backgroundColor: "#228B22",
  },
  ClearButton: {
    backgroundColor: "#FF0000",
  },
  buttonOrange: {
    backgroundColor: "#FFA500",
  },
  buttonText: {
    fontSize: 38,
    color: "#000",
  },
  TextinWhite: {
    fontSize: 38,
    color: "#fff",
  },
  buttonTextSecondary: {
    color: "#888",
  },
});