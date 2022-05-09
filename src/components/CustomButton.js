import React from "react";

import { Text, Pressable, StyleSheet } from "react-native";

function CustomButton({ func, title }) {
  return (
    <Pressable
      onPress={() => func(false)}
      style={styles.button}
      android_ripple={{ color: "#ffbb3d" }}
    >
      <Text style={{ color: "#fff", fontSize: 17, textAlign: "center" }}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 240,
    borderRadius: 6,
    backgroundColor: "orange",
    marginVertical: 10,
    paddingVertical: 12,
  },
});

export default CustomButton;
