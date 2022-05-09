import react from "react";
import CustomButton from "./CustomButton";

import { View, Text, StyleSheet, Image } from "react-native";

function CustomModal({ setShowWarning }) {
  return (
    <View style={styles.warning_modal}>
      <View style={styles.modal_title}>
        <Text style={{ ...styles.text, color: "#fff", marginVertical: 0 }}>
          WARNING!
        </Text>
      </View>
      <View style={styles.modal_body}>
        <Image
          source={require("../../assets/error.png")}
          style={styles.img}
          resizeMode="stretch"
        />

        <Text style={{ fontSize: 16, textAlign: "center" }}>
          Name is required to continue and must be more than 3 characters..
        </Text>
      </View>
      <CustomButton func={setShowWarning} title="OK" />
    </View>
  );
}

const styles = StyleSheet.create({
  warning_modal: {
    width: 300,
    height: 300,
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
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
