import { SafeAreaView, View, Text, StatusBar, Alert } from "react-native";
import React, { useState } from "react";
import { Database } from "../constants/context";
import { CustomButton } from "../components/Button";
import { Input } from "../components";

const ForgotPassword = () => {
  const { colors, username, handleProfileEdit } = React.useContext(Database);
  const [userName, setUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleUserName = (value) => {
    setUserName(value);
  };

  const handleNewPassword = (value) => {
    setNewPassword(value);
  };

  const handleConfirmNewPassword = (value) => {
    setConfirmNewPassword(value);
  };

  const localProfileEdit = () => {
    if (userName.length === 0) {
      Alert.alert("Warning⚠️", "Username field cannot be empty.", [
        { text: "OK" },
      ]);
      return;
    } else if (userName === username) {
      if (newPassword.length > 5 && confirmNewPassword.length > 5) {
        if (newPassword === confirmNewPassword) {
          Alert.alert(
            "Success🤝",
            "Account Successfully created, you'll be redirected to login now.",
            [{ text: "OK" }]
          );
          handleProfileEdit(
            { newusername: userName, password: newPassword },
            "Login"
          );
          return;
        } else {
          Alert.alert("Warning⚠️", "New password does not match.", [
            { text: "OK" },
          ]);
          return;
        }
      } else {
        Alert.alert("Warning⚠️", "Password cannot be less than 5 characters", [
          { text: "OK" },
        ]);
        return;
      }
    } else if (userName !== username) {
      Alert.alert("Warning⚠️", "Invalid username", [{ text: "OK" }]);
      return;
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
      <StatusBar barStyle="light-content" backgroundColor={colors.bgc} />
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Input
            multiple={false}
            name={"Edit Username"}
            maxlength={16}
            value={userName}
            color={colors.textColor}
            borderColor={colors.borderColor}
            secure={false}
            func={handleUserName}
          />

          <View>
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
        </View>
        <View style={{ marginTop: 20 }}>
          <CustomButton
            title={"Save Changes"}
            bgc={"blue"}
            color={"ligthblue"}
            func={localProfileEdit}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
