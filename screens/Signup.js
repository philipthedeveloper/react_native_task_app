import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  Modal,
} from "react-native";
import React, { useState, useContext } from "react";
import { Input } from "../components";
import { CustomButton } from "../components/Button";
import CustomModal from "../components/Modal";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Database } from "../constants/context";

const SignUp = ({ navigation }) => {
  const [showmodal, setShowModal] = useState(false);
  const [localUserName, setLocalUserName] = useState("");
  const [localPassword, setLocalPassword] = useState("");
  const [upload, setUpload] = useState(false);
  const {
    colors,
    inputValidator,
    uri,
    handleSubmit,
    imageLibraryLauncher,
    cameraLauncher,
  } = useContext(Database);

  const setShowWarning = () => {
    setShowModal(true);
  };

  const localCameraLauncher = async () => {
    try {
      const output = await cameraLauncher();
      setShowModal(output.showModal);
      setUpload(output.setUpload);
    } catch (error) {
      console.log(error);
    }
  };

  const localImageLibrarylauncher = async () => {
    try {
      const output = await imageLibraryLauncher();
      setShowModal(output.showModal);
      setUpload(output.setUpload);
    } catch (error) {
      console.log(error);
    }
  };

  const localInputValidator = (value, name) => {
    inputValidator(value, name);
    if (name === "Username") {
      setLocalUserName(value);
    } else {
      setLocalPassword(value);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        padding: 24,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: colors.bgc,
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
            setShowWarning={setShowWarning}
            func={{
              funcA: localCameraLauncher,
              funcB: localImageLibrarylauncher,
            }}
          />
        </View>
      </Modal>

      <Image
        source={require("../assets/logo.png")}
        resizeMode="contain"
        style={{ width: 120, height: 60 }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Text
          style={{ ...styles.textBtn, color: "blue" }}
          onPress={() => navigation.navigate("SignUp")}
        >
          Create an account
        </Text>
        <Text
          style={styles.textBtn}
          onPress={() => navigation.navigate("Login")}
        >
          Log in
        </Text>
      </View>
      <View style={{ width: "100%", marginVertical: 24 }}>
        <Input
          multiple={false}
          name={"Username"}
          maxlength={15}
          func={localInputValidator}
          value={localUserName}
          secure={false}
          color={colors.textColor}
          borderColor={colors.borderColor}
        />
        <Input
          multiple={false}
          name={"Password"}
          maxlength={20}
          func={localInputValidator}
          value={localPassword}
          secure={true}
          color={colors.textColor}
          borderColor={colors.borderColor}
        />
        <View>
          <Text
            style={{
              fontFamily: "bold",
              fontSize: 16,
              marginVertical: 16,
              color: colors.textColor,
            }}
          >
            Choose Profile Image
          </Text>
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 12,
              borderColor: "gray",
              backgroundColor: "#ced4d6",
              borderWidth: 1,
              marginVertical: 16,
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {upload ? (
              <Image
                source={uri}
                resizeMode="cover"
                style={{ width: "100%", height: "100%" }}
              />
            ) : null}
            <Ionicons
              name="image"
              size={45}
              color="gray"
              onPress={setShowWarning}
              style={{ position: "absolute" }}
            />
          </View>
        </View>
        <CustomButton
          title={"Create Account"}
          bgc={"#1685b8"}
          color={"#1d8ec2"}
          func={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textBtn: {
    color: "#1685b8",
    fontSize: 18,
    fontFamily: "regular",
    fontWeight: "900",
  },
});
export default SignUp;
