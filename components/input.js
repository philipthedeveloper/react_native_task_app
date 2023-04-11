import { View, Text, TextInput } from "react-native";
import React from "react";

const Input = ({
  multiple,
  name,
  maxlength,
  func,
  value,
  secure,
  color,
  borderColor,
}) => {
  return (
    <View>
      <Text
        style={{
          fontFamily: "bold",
          fontSize: 16,
          marginVertical: 10,
          color: color,
        }}
      >
        {name}
      </Text>
      <TextInput
        placeholder={name.toLowerCase()}
        style={{
          borderColor: borderColor,
          padding: 8,
          paddingHorizontal: 16,
          borderWidth: 1,
          borderRadius: 10,
          fontFamily: "regular",
          color: color,
        }}
        multiline={multiple}
        maxLength={maxlength}
        onChangeText={(value) => func(value, name)}
        value={value}
        secureTextEntry={secure}
      />
    </View>
  );
};

export default Input;
