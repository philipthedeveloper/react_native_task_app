import React from "react";
import { View, StyleSheet, Text } from "react-native";
import CustomButton from "./CustomButton";

function ScreenB({ navigation }) {
  const goA = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.view}>
      <Text style={styles.text}>Screen B</Text>
      <CustomButton title={"Go Home"} func={goA} />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  text: {
    color: "black",
    fontSize: 17,
    textAlign: "center",
    marginVertical: 8,
  },
});

export default ScreenB;
