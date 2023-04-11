import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  Modal,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Database } from "../constants/context";
import Entypo from "react-native-vector-icons/Entypo";
import CustomModal from "../components/Modal";
import { Input } from "../components";
import { CustomButton } from "../components/Button";

const Profile = () => {
  const {
    colors,
    uri,
    cameraLauncher,
    imageLibraryLauncher,
    username,
    password,
    handleProfileEdit,
  } = React.useContext(Database);
  const [showmodal, setShowModal] = useState(false);
  const [newUserName, setNewUserName] = useState(username);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  // const [changePassword, setChangePassword] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleNewUserName = (value) => {
    setNewUserName(value);
  };

  const handleCurrentPassword = (value) => {
    setCurrentPassword(value);
  };

  const handleNewPassword = (value) => {
    setNewPassword(value);
  };

  const handleConfirmNewPassword = (value) => {
    setConfirmNewPassword(value);
  };

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

  const localProfileEdit = () => {
    if (newUserName.length === 0) {
      Alert.alert("Warning⚠️", "Username field cannot be empty.", [
        { text: "OK" },
      ]);
      return;
    } else if (
      currentPassword.length === 0 &&
      newPassword.length > 0 &&
      confirmNewPassword.length > 0
    ) {
      Alert.alert("Warning⚠️", "Please enter current password.", [
        { text: "OK" },
      ]);
      return;
    } else if (
      currentPassword === password &&
      newPassword !== confirmNewPassword
    ) {
      Alert.alert("Warning⚠️", "New password does not match.", [
        { text: "OK" },
      ]);
      return;
    } else if (currentPassword.length > 0 && currentPassword !== password) {
      Alert.alert("Warning⚠️", "Current Password Incorrect.", [{ text: "OK" }]);
      return;
    } else if (newUserName.length > 0) {
      const updatedProfile = { newusername: newUserName };
      if (currentPassword === password && newPassword === confirmNewPassword) {
        if (newPassword.length > 5) {
          updatedProfile.password = newPassword;
          handleProfileEdit(updatedProfile, "First");
          return;
        } else {
          Alert.alert(
            "Warning⚠️",
            "Password cannot be less than 5 characters",
            [{ text: "OK" }]
          );
          return;
        }
      } else {
        handleProfileEdit(updatedProfile, "First");
        return;
      }
    }
    return;
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 24,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: colors.bgc,
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor={"#10264a"} />
      <ScrollView style={{ flex: 1 }}>
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

        <View>
          <Text
            style={{
              fontFamily: "bold",
              fontSize: 16,
              marginVertical: 16,
              color: "#fff",
            }}
          >
            Edit Profile Image:
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
        <View style={{ flex: 1 }}>
          <Input
            multiple={false}
            name={"Edit Username"}
            maxlength={16}
            value={newUserName}
            color={colors.textColor}
            borderColor={colors.borderColor}
            secure={false}
            func={handleNewUserName}
          />

          <View
            style={{
              marginVertical: 16,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontFamily: "bold",
                fontSize: 16,
                color: colors.textColor,
              }}
            >
              Edit Password
            </Text>
            <Entypo
              name="edit"
              color={"blue"}
              size={22}
              onPress={() => setEdit(true)}
            />
          </View>
          {edit && (
            <View>
              <Input
                multiple={false}
                name={"Current Password"}
                maxlength={16}
                value={currentPassword}
                color={colors.textColor}
                borderColor={colors.borderColor}
                secure={true}
                func={handleCurrentPassword}
              />

              <Input
                multiple={false}
                name={"New Password"}
                maxlength={16}
                value={newPassword}
                color={colors.textColor}
                borderColor={colors.borderColor}
                secure={true}
                func={handleNewPassword}
              />

              <Input
                multiple={false}
                name={"Confirm New Password"}
                maxlength={16}
                value={confirmNewPassword}
                color={colors.textColor}
                borderColor={colors.borderColor}
                secure={true}
                func={handleConfirmNewPassword}
              />
            </View>
          )}
        </View>
        <View style={{ marginTop: 20 }}>
          <CustomButton
            title={"Save Changes"}
            bgc={"blue"}
            color={"ligthblue"}
            func={localProfileEdit}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
