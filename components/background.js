import { View, Text } from "react-native";
import React, { useContext } from "react";
import { Database } from "../constants/context";

const Background = () => {
  const { colors } = useContext(Database);

  return (
    <View
      style={{
        flex: 1,
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 0,
      }}
    >
      <View
        style={{ height: 300, backgroundColor: "#10264a", width: "100%" }}
      ></View>
      <View style={{ flex: 1, backgroundColor: colors.bgc }}></View>
    </View>
  );
};

export default Background;
