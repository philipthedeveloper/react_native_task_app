import React, { useEffect, useState, useContext } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  ImageBackground,
  View,
  StatusBar,
  Image,
  Modal,
  Text,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import CustomModal from "../components/Modal";
import * as ImagePicker from "expo-image-picker";
import { Switch } from "@rneui/themed";
import { Database } from "../constants/context";

const CustomDrawerContent = (props) => {
  const [showmodal, setShowModal] = useState(false);
  const navigation = props.navigation;
  const {
    colors,
    handleDarkMode,
    darkModeEnabled,
    uri,
    username,
    cameraLauncher,
    imageLibraryLauncher,
  } = useContext(Database);

  const setShowWarning = () => {
    setShowModal(true);
  };

  const localCameraLauncher = async () => {
    try {
      const output = await cameraLauncher(true);
      setShowModal(output.showModal);
    } catch (error) {
      console.log(error);
    }
  };

  const localImageLibrarylauncher = async () => {
    try {
      const output = await imageLibraryLauncher(true);
      setShowModal(output.showModal);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    await AsyncStorage.mergeItem("User", JSON.stringify({ loginIn: false }));
    navigation.reset({
      routes: [{ name: "Login" }],
    });
  };
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Modal
        transparent
        visible={showmodal}
        onRequestClose={() => {
          setShowModal(false);
        }}
        animationType={"slide"}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
        >
          <CustomModal
            func={{
              funcA: localCameraLauncher,
              funcB: localImageLibrarylauncher,
            }}
          />
        </View>
      </Modal>
      <DrawerContentScrollView
        contentContainerStyle={{
          // backgroundColor: "blue",
          paddingTop: 0,
          flex: 1,
        }}
      >
        <ImageBackground
          source={require("../assets/imageBackground.jpg")}
          style={{
            height: 250,
            paddingTop: StatusBar.currentHeight + 30,
            padding: 30,
          }}
          resizeMode="cover"
        >
          <View>
            <Text
              style={{
                fontFamily: "bold",
                fontSize: 16,
                marginBottom: 16,
                color: "#fff",
              }}
            >
              {username}
            </Text>
          </View>
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              alignSelf: "center",
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
                source={uri || require("../assets/avatar.png")}
                resizeMode="cover"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </View>
            <Entypo
              name="camera"
              color={"lightblue"}
              size={40}
              onPress={setShowWarning}
              style={{ position: "absolute", bottom: 0, right: -10 }}
            />
          </View>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: colors.bgc }}>
          <DrawerItemList {...props} />
        </View>
        <View
          style={{
            padding: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: colors.bgc,
          }}
        >
          <Text
            style={{
              color: colors.specialButton,
              fontSize: 18,
              fontFamily: "regular",
            }}
          >
            Dark Mode
          </Text>
          <Switch
            value={darkModeEnabled}
            onValueChange={(value) => handleDarkMode(value)}
          ></Switch>
        </View>
        <View
          style={{
            padding: 20,
            borderTopColor: "#10264a",
            borderTopWidth: 1,
            backgroundColor: colors.bgc,
          }}
        >
          <Pressable
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={logout}
          >
            <AntDesign name="logout" size={17} color={colors.specialButton} />
            <Text
              style={{
                color: colors.specialButton,
                fontSize: 17,
                fontFamily: "regular",
                marginLeft: 15,
              }}
            >
              Logout
            </Text>
          </Pressable>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawerContent;
