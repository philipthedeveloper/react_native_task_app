import { View, Text, Image } from "react-native";
import React, { useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = ({ navigation }) => {
  useEffect(() => {
    const dura = setTimeout(getUser, 2000);
    return () => {
      clearTimeout(dura);
    };
  }, []);

  const getUser = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem("User"));
      if (user === null) {
        navigation.reset({
          routes: [{ name: "SignUp" }],
        });
      } else if (user.loginIn) {
        navigation.reset({
          routes: [{ name: "Home" }],
        });
      } else {
        navigation.reset({
          routes: [{ name: "SignUp" }],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#3f3dbf",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../assets/splashi.png")}
        resizeMode="contain"
        style={{ width: 300, height: 300 }}
      />
      <Image
        source={require("../assets/logo.png")}
        resizeMode="contain"
        style={{ width: 150, height: 60 }}
      />
    </View>
  );
};

export default Splash;
