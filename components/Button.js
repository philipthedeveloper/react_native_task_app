import React from "react";
import { Text, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

function CustomButton({ func, title, color, bgc }) {
  return (
    <Pressable
      onPress={() => func(false)}
      style={{ ...styles.button, backgroundColor: bgc || "orange" }}
      android_ripple={{ color: color || "#ffbb3d" }}
    >
      <Text style={{ color: "#fff", fontSize: 17, textAlign: "center" }}>
        {title}
      </Text>
    </Pressable>
  );
}

const AddTask = () => {
  const navigation = useNavigation();
  const toDetails = () => {
    navigation.navigate("Task");
  };

  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        bottom: 0,
        zIndex: 4,
        margin: 16,
        alignSelf: "center",
        borderRadius: 50,
        elevation: 15,
      }}
      activeOpacity={0.8}
      onPress={toDetails}
    >
      <Ionicons
        name="add-circle"
        size={65}
        color={"#10264a"}
        style={{ margin: 0, padding: 0 }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 6,
    backgroundColor: "green",
    marginVertical: 15,
    paddingVertical: 12,
  },
});

export { CustomButton, AddTask };
