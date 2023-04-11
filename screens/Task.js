import React, { useState, useContext, useEffect } from "react";
import { Header, Card, Background } from "../components/index";

import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Pressable,
  Image,
  Modal,
  Alert,
} from "react-native";
import { CheckBox } from "@rneui/themed";
import { Input } from "../components";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CustomButton } from "../components/Button";
import { first } from "../constants/assets";
import { useNavigation } from "@react-navigation/native";
import { Database } from "../constants/context";
import * as ImagePicker from "expo-image-picker";
import CustomModal from "../components/Modal";
const Task = ({ route }) => {
  const { item, index } = route.params || {
    item: { title: "", description: "", completed: false, imgUrl: first },
    index: undefined,
  };
  const tit = item.title;
  const { description, completed, imgUrl } = item;
  const [checked, setChecked] = useState(completed);
  const [title, setTitle] = useState(tit);
  const [desc, setDesc] = useState(description);
  const [uri, setUri] = useState(imgUrl);
  const [showmodal, setShowModal] = useState(false);
  const navigation = useNavigation();
  const { dispatch, colors } = useContext(Database);

  const setShowWarning = () => {
    setShowModal(true);
  };

  const handleCheck = () => {
    setChecked(!checked);
  };

  const submit = () => {
    if (title.length < 3 || desc.length < 10) {
      Alert.alert(
        "Warning❗",
        `Title should not be less than 3 characters \n\nDescription should not be less than 10 characters`,
        [{ text: "OK" }]
      );
      return;
    }
    const newtask = {
      title: title,
      description: desc,
      completed: checked,
      imgUrl: uri,
    };
    dispatch({
      type: index !== undefined ? "edit" : "add",
      payload: newtask,
      index: index,
    });
    navigation.navigate("Home");
  };

  const inputs = (value, name) => {
    if (name === "Title") {
      setTitle(value);
    } else if (name === "Description") {
      setDesc(value);
    }
  };

  const cameraLauncher = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (result.cancelled == false) {
        setShowModal(false);
        setUri({ uri: result.uri });
        setUpload(true);
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const imageLibraryLauncher = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (result.cancelled == false) {
        setShowModal(false);
        setUri({ uri: result.uri });
        setUpload(true);
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView
      style={{
        justifyContent: "center",
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <StatusBar
        backgroundColor={"#10264a"}
        translucent={true}
        barStyle="light-content"
      />
      <Background />
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
            func={{ funcA: cameraLauncher, funcB: imageLibraryLauncher }}
          />
        </View>
      </Modal>
      <View
        style={{
          flex: 1,
          width: "90%",
          elevation: 10,
          shadowColor: colors.shadowColor,
          backgroundColor: colors.bgc,
          margin: 16,
          marginTop: StatusBar.currentHeight + 16,
          borderRadius: 16,
          padding: 16,
        }}
      >
        <Input
          maxlength={25}
          name="Title"
          func={inputs}
          value={title}
          color={colors.textColor}
          borderColor={colors.borderColor}
        />
        <Input
          multiple={true}
          maxlength={100}
          name={"Description"}
          func={inputs}
          value={desc}
          color={colors.textColor}
          borderColor={colors.borderColor}
        />
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <CheckBox
            checked={checked}
            onPress={handleCheck}
            containerStyle={{
              marginLeft: 0,
              padding: 0,
            }}
            wrapperStyle={{
              backgroundColor: colors.bgc,
            }}
            checkedIcon={
              <Ionicons name="checkmark-circle" color={"green"} size={25} />
            }
            uncheckedIcon={
              <Ionicons name="remove-circle-outline" color={"red"} size={25} />
            }
          />
          <Text
            style={{
              color: checked ? "green" : "red",
              fontSize: 20,
              fontFamily: "regular",
            }}
            onPress={handleCheck}
          >
            Completed
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontFamily: "bold",
              fontSize: 16,
              marginVertical: 10,
              color: colors.textColor,
            }}
          >
            Choose Image
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
            <Image
              source={uri}
              resizeMode="cover"
              style={{ width: "100%", height: "100%" }}
            />
            <Ionicons
              name="image"
              size={45}
              color="gray"
              onPress={setShowWarning}
              style={{ position: "absolute" }}
            />
          </View>
          <CustomButton
            title="Save Task"
            func={submit}
            color={"#16b82e"}
            bgc={"green"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Task;
