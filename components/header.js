import React, { useState, useContext, useEffect } from "react";
import { Database } from "../constants/context";

import {
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";

const Header = ({ username }) => {
  const navigation = useNavigation();
  const { searcher, handleBlur, colors, uri } = useContext(Database);
  const [searchInp, setSearchInp] = useState("");
  const drawer = () => {
    navigation.openDrawer();
  };

  const localSearcher = (value) => {
    setSearchInp(value);
    searcher(value);
    return;
  };

  return (
    <View
      style={{
        padding: 16,
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Image
          source={require("../assets/logo.png")}
          resizeMode="contain"
          style={{
            width: 100,
            height: 50,
          }}
        />
        <Pressable
          style={{
            borderColor: "lightblue",
            borderWidth: 2,
            width: 50,
            height: 50,
            overflow: "hidden",
            borderRadius: 25,
          }}
          onPress={drawer}
        >
          <Image
            source={uri || require("../assets/avatar.png")}
            resizeMode="cover"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Pressable>
      </View>
      <View>
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            fontFamily: "comfortaa",
            marginTop: -5,
            paddingLeft: 4,
          }}
        >
          {`Welcome ${username || "back!"}👋`}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#abb1ba",
          padding: 8,
          paddingHorizontal: 16,
          marginVertical: 10,
          borderRadius: 12,
          elevation: 20,
          shadowColor: "white",
        }}
      >
        <FontAwesome5 name="search" color="black" size={20} />
        <TextInput
          placeholder="Search task"
          style={{
            color: colors.textColor,
            marginLeft: 10,
            flex: 1,
            fontSize: 12,
            fontFamily: "comfortaa",
          }}
          value={searchInp}
          onChangeText={(value) => localSearcher(value)}
          onBlur={() => handleBlur(searchInp)}
        />
      </View>
    </View>
  );
};

export default Header;
