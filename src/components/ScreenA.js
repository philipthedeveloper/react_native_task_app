import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Modal, Image } from "react-native";
import CustomButton from "./CustomButton";
import CustomModal from "./CustomModal";

function ScreenA({ navigation }) {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleSubmit = () => {
    if (name.length > 3) {
      setSubmitted(!submitted);
    } else {
      if (submitted) {
        setSubmitted(!submitted);
      } else {
        setShowWarning(true);
      }
    }
  };

  const nav = () => {
    navigation.navigate("ScreenB");
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={showWarning}
        onRequestClose={() => setShowWarning(false)}
        transparent
        animationType="slide"
        hardwareAccelerated
      >
        <View style={styles.centered_view}>
          <CustomModal setShowWarning={setShowWarning} />
        </View>
      </Modal>
      <Text style={styles.text}>Please Enter Your Name</Text>
      <TextInput
        style={styles.textInput}
        placeholder="e.g Maxwell"
        onChangeText={(value) => setName(value)}
        maxLength={12}
      ></TextInput>
      <CustomButton
        func={handleSubmit}
        title={submitted ? "Clear" : "Submit"}
      />
      <CustomButton func={nav} title={"Go to Screen B"} />
      {submitted ? (
        <View>
          <Image
            source={require("../../assets/success.png")}
            style={styles.img}
            resizeMode="stretch"
          />
          <Text style={{ ...styles.text, marginTop: 0 }}>
            Your name is : {name}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 32,
  },

  text: {
    color: "#000",
    fontSize: 24,
    marginVertical: 20,
    textAlign: "center",
  },

  textInput: {
    borderWidth: 1,
    borderColor: "#000",
    width: 240,
    borderRadius: 6,
    textAlign: "center",
    color: "#000",
    fontSize: 16,
    padding: 8,
    marginBottom: 20,
  },

  button: {
    width: 240,
    borderRadius: 6,
    backgroundColor: "orange",
    marginVertical: 10,
    paddingVertical: 12,
  },

  centered_view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },

  img: {
    width: 50,
    height: 50,
    marginBottom: 16,
    alignSelf: "center",
  },
});

export default ScreenA;
