import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  StatusBar,
} from "react-native";
import React, { useState, useContext } from "react";
import { Input } from "../components";
import { CustomButton } from "../components/Button";
import { Database } from "../constants/context";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {
    colors,
    username: user,
    password: pass,
    handleLogin,
  } = useContext(Database);

  const inputs = (value, name) => {
    if (name === "Username") {
      setUsername(value);
    } else if (name === "Password") {
      setPassword(value);
    }
  };

  const localLoginHandler = () => {
    handleLogin(username, password, user, pass);
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
          style={styles.textBtn}
          onPress={() => navigation.navigate("SignUp")}
        >
          {" "}
          Create an account
        </Text>
        <Text
          style={{ ...styles.textBtn, color: "blue" }}
          onPress={() => navigation.navigate("Login")}
        >
          {" "}
          Log in
        </Text>
      </View>
      <View style={{ width: "100%", marginVertical: 24 }}>
        <Input
          multiple={false}
          name={"Username"}
          maxlength={15}
          func={inputs}
          value={username}
          secure={false}
          color={colors.textColor}
          borderColor={colors.borderColor}
        />
        <Input
          multiple={false}
          name={"Password"}
          maxlength={20}
          func={inputs}
          value={password}
          secure={true}
          color={colors.textColor}
          borderColor={colors.borderColor}
        />
        <View
          style={{
            width: "100%",
            marginVertical: 16,
          }}
        >
          <Text
            style={{ ...styles.textBtn, color: "blue" }}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            {" "}
            Forgot Password?
          </Text>
        </View>

        <CustomButton
          title={"Login"}
          bgc={"#1685b8"}
          color={"#1d8ec2"}
          func={localLoginHandler}
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
export default Login;
