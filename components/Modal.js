import React, { useContext } from "react";
import { CustomButton } from "./Button";

import { View, Text, StyleSheet, Image } from "react-native";
import { Database } from "../constants/context";

function CustomModal({ func: { funcA, funcB } }) {
  const { colors } = useContext(Database);

  return (
    <View
      style={{
        ...styles.warning_modal,
        backgroundColor: colors.bgc,
        elevation: 10,
        shadowColor: colors.shadowColor,
      }}
    >
      <View
        style={{
          marginVertical: 24,
        }}
      >
        <Text
          style={{ fontFamily: "bold", color: "#1685b8", textAlign: "center" }}
        >
          Pick an Image
        </Text>
      </View>

      <View>
        <CustomButton title={"Take Photo..."} func={funcA} />
        <CustomButton title={"Choose from Library..."} func={funcB} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  warning_modal: {
    width: 300,
    height: 300,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
  },

  modal_title: {
    backgroundColor: "orange",
    borderRadius: 16,
    paddingVertical: 8,
    alignSelf: "stretch",
  },

  text: {
    color: "#000",
    fontSize: 24,
    marginVertical: 20,
    textAlign: "center",
  },

  modal_body: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },

  img: {
    width: 50,
    height: 50,
    marginBottom: 16,
    alignSelf: "center",
  },
});

export default CustomModal;
