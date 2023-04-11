import React, { useContext } from "react";
import { View, Text, Image, Alert } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Database } from "../constants/context";

const Card = ({ title, description, imgUrl, completed }) => {
  const { dispatch, findItem, colors } = useContext(Database);
  const navigation = useNavigation();

  const handleEdit = () => {
    const { item, index } = findItem(title);
    navigation.navigate("Task", { item, index });
  };

  const handelDelete = () => {
    Alert.alert(
      "Confirmation🗑️",
      `Are you sure you want to delete this task: \n\n${title}`,
      [
        {
          text: "YES",
          onPress: () => dispatch({ type: "delete", payload: title }),
        },
        { text: "NO" },
      ]
    );
  };

  return (
    <View
      style={{
        margin: 16,
        backgroundColor: colors.bgc,
        padding: 10,
        elevation: 10,
        borderRadius: 10,
        shadowColor: colors.shadowColor,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 100,
            overflow: "hidden",
          }}
        >
          <Image
            source={imgUrl}
            resizeMode="cover"
            style={{ width: 100, height: 100 }}
          />
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text
            style={{
              fontFamily: "bold",
              marginBottom: 5,
              color: colors.textColor,
            }}
          >
            {title}
          </Text>
          <Text style={{ fontFamily: "regular", color: colors.textColor }}>
            {description}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
      >
        <Entypo
          name="edit"
          color={"blue"}
          size={22}
          style={{ marginRight: 10 }}
          onPress={handleEdit}
        />
        <Ionicons
          name="trash"
          color={"red"}
          size={22}
          style={{ marginRight: 10 }}
          onPress={handelDelete}
        />
        <View style={{ flexDirection: "row" }}>
          {completed ? (
            <Ionicons name="checkmark-circle" color={"green"} size={22} />
          ) : (
            <Ionicons
              name="checkmark-circle-outline"
              color={"green"}
              size={22}
            />
          )}
          <Text
            style={{
              textDecorationLine: completed ? "line-through" : "none",
              color: "green",
              marginLeft: 5,
            }}
          >
            Completed
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Card;
