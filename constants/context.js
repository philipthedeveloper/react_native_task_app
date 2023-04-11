import React, { useState, useReducer, createContext, useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const Database = createContext();

/* ---------------------------------------------------------------
------------------------------------------------------------------
Reducer Function

------------------------------------------------------------------
------------------------------------------------------------------  */

const reducer = (state, action) => {
  switch (action.type) {
    case "edit":
      const index = Number(action.index);
      const updatedTask = updater(index, state, action.payload);
      Alert.alert("Saved👌", "Task Succesfully Saved", [{ text: "OK" }]);
      syncData(updatedTask);
      return updatedTask;
    case "add":
      Alert.alert("Saved👌", "Task Succesfully Saved", [{ text: "OK" }]);
      const newTask = [...state, action.payload];
      syncData(newTask);
      return newTask;
    case "delete":
      const filteredTask = deleter(action.payload, state);
      Alert.alert("Deleted🗑️", "Task Deleted Succesfully", [{ text: "OK" }]);
      syncData(filteredTask);
      return filteredTask;
    case "fromdatabase":
      return action.payload;
  }
};

/* ---------------------------------------------------------------
------------------------------------------------------------------
Reducer Function Ends

------------------------------------------------------------------
------------------------------------------------------------------  */

/* ---------------------------------------------------------------
------------------------------------------------------------------
Reducer Controllers

------------------------------------------------------------------
------------------------------------------------------------------  */

const deleter = (title, state) => {
  const updatedTask = state.filter((item) => item.title !== title);
  return updatedTask;
};

const updater = (index, state, value) => {
  const updatedTask = state.map((item, i) => {
    if (index === i) {
      return value;
    } else {
      return item;
    }
  });
  return updatedTask;
};

const syncData = (value) => {
  (async function () {
    try {
      await AsyncStorage.mergeItem("User", JSON.stringify({ data: value }));
    } catch (error) {
      console.log(error);
    }
  })();
  return;
};

/* ---------------------------------------------------------------
------------------------------------------------------------------
Reducer Controllers End

------------------------------------------------------------------
------------------------------------------------------------------  */

/* ---------------------------------------------------------------
------------------------------------------------------------------
Context Component

------------------------------------------------------------------
------------------------------------------------------------------  */
const Context = ({ children }) => {
  {
    `---------------------------------------------------------------------------------------------
  -----------------------------------------------------------------------------------------------
      Hooks Start
  -----------------------------------------------------------------------------------------------
  -----------------------------------------------------------------------------------------------
  `;
  }
  const [databaseTask, setDatabaseTask] = useState([]);
  const [tasks, dispatch] = useReducer(reducer, databaseTask);
  const [search, setSearch] = useState([]);
  const [noSearch, setNoSearch] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [uri, setUri] = useState("");
  const navigation = useNavigation();
  const [colors, setColors] = useState({
    bgc: "#fff",
    textColor: "#000",
    specialButton: "#10264a",
    shadowColor: "#000",
    borderColor: "gray",
  });
  useEffect(() => {
    colorGetter();
    getUser();
  }, []);

  {
    `---------------------------------------------------------------------------------------------
  -----------------------------------------------------------------------------------------------
      Hooks End
  -----------------------------------------------------------------------------------------------
  -----------------------------------------------------------------------------------------------
  `;
  }

  const findItem = (title) => {
    const item = tasks.find((item) => item.title === title);
    const index = tasks.indexOf(item);
    return { item: item, index: index };
  };

  const getUser = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem("User"));
      const darkmode = await AsyncStorage.getItem("darkmode");
      if (user !== null) {
        setUsername(user.username);
        setPassword(user.password);
        setUri(user.img);
        dispatch({ type: "fromdatabase", payload: user.data });
        if (user.colors) {
          setColors(user.colors);
        }
        if (darkmode === "true") {
          setDarkModeEnabled(true);
        } else if (darkmode === "false") {
          setDarkModeEnabled(false);
        } else {
          return;
        }
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const colorGetter = async () => {
    const colorFromUser = JSON.parse(await AsyncStorage.getItem("colors"));
    try {
      if (colorFromUser !== null) {
        setColors(colorFromUser);
      } else {
        setColors({
          bgc: "#fff",
          textColor: "#000",
          specialButton: "#10264a",
          shadowColor: "#000",
          borderColor: "gray",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searcher = (value) => {
    if (value.length == 0) {
      setSearch([]);
      return;
    }
    const newTask = [...tasks].filter((item) => {
      if (item.title.toLowerCase().includes(value.toLowerCase())) {
        return item;
      } else {
        return;
      }
    });
    if (newTask.length > 0) {
      setNoSearch(false);
    } else {
      setNoSearch(true);
    }
    setSearch(newTask);
  };

  const handleBlur = (value) => {
    if (value.length == 0 || search.length == 0) {
      setNoSearch(false);
    }
  };

  const handleDarkMode = async (value) => {
    let colors;
    if (value) {
      setDarkModeEnabled(value);
      colors = {
        bgc: "#0D1117",
        textColor: "#fff",
        specialButton: "#fff",
        shadowColor: "#fff",
        borderColor: "#fff",
      };
      setColors(colors);
      try {
        await AsyncStorage.mergeItem(
          "User",
          JSON.stringify({ colors: colors })
        );
        await AsyncStorage.setItem("darkmode", JSON.stringify(value));
        return;
      } catch (error) {
        console.log(error);
        return;
      }
    } else {
      setDarkModeEnabled(value);
      colors = {
        bgc: "#fff",
        textColor: "#000",
        specialButton: "#10264a",
        shadowColor: "#000",
        borderColor: "gray",
      };
      setColors(colors);
      try {
        await AsyncStorage.mergeItem(
          "User",
          JSON.stringify({ colors: colors })
        );
        await AsyncStorage.setItem("darkmode", JSON.stringify(value));
        return;
      } catch (error) {
        console.log(error);
        return;
      }
    }
  };

  const handleUri = (value) => {
    setUri(value);
  };

  const inputValidator = (value, name) => {
    if (name === "Username") {
      setUsername(value);
    } else if (name === "Password") {
      setPassword(value);
    }
  };

  const handleSubmit = async () => {
    if (username.length == 0 || password.length < 5) {
      customAlert();
      return;
    } else {
      try {
        const newUser = {
          username,
          password,
          loginIn: false,
          img: uri,
          data: [],
          colors: {
            bgc: "#fff",
            textColor: "#000",
            specialButton: "#10264a",
            shadowColor: "#000",
            borderColor: "gray",
          },
        };
        await AsyncStorage.setItem("User", JSON.stringify(newUser));
        await AsyncStorage.setItem("darkmode", JSON.stringify(false));
        Alert.alert(
          "Success🤝",
          "Account Successfully created, you'll be redirected to login now.",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("Login");
                return;
              },
            },
          ]
        );
        return;
      } catch (error) {
        console.log(error);
        return;
      }
    }
  };

  const handleLogin = async (username, password, user, pass) => {
    if (username.length == 0 || password.length < 5) {
      customAlert();
      return;
    } else {
      if (user !== username || pass !== password) {
        Alert.alert(
          "Invalid details❗",
          "Username or password Incorrect, Please try again",
          [{ text: "OK" }]
        );
        return;
      } else {
        try {
          await AsyncStorage.mergeItem(
            "User",
            JSON.stringify({ loginIn: true })
          );
          navigation.reset({
            routes: [{ name: "Home" }],
          });
          return;
        } catch (error) {
          console.log(error);
          return;
        }
      }
    }
  };

  const customAlert = () => {
    Alert.alert(
      "Error❗",
      "Input fields cannot be empty and password cannot be less than 5 characters",
      [{ text: "OK" }]
    );
    return;
  };

  const cameraLauncher = async (value) => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (result.cancelled == false) {
        setUri({ uri: result.uri });
        if (value === true) {
          megger(result);
        }
        return { showModal: false, setUpload: true };
      } else {
        return { showModal: true, setUpload: false };
      }
    } catch (error) {
      console.log(error);
    }
  };

  const imageLibraryLauncher = async (value) => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (result.cancelled == false) {
        setUri({ uri: result.uri });
        if (value === true) {
          megger(result);
        }
        return { showModal: false, setUpload: true };
      } else {
        return { showModal: true, setUpload: false };
      }
    } catch (error) {
      console.log(error);
    }
  };

  const megger = async (result) => {
    try {
      await AsyncStorage.mergeItem(
        "User",
        JSON.stringify({ img: { uri: result.uri } })
      );
      getUser();
      console.log("Merge Successful");
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const handleProfileEdit = async ({ newusername, password }, location) => {
    try {
      if (!password) {
        await AsyncStorage.mergeItem(
          "User",
          JSON.stringify({ username: newusername })
        );
      } else {
        await AsyncStorage.mergeItem(
          "User",
          JSON.stringify({ username: newusername, password: password })
        );
      }
      getUser();
      navigation.navigate(location);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Database.Provider
      value={{
        tasks,
        dispatch,
        findItem,
        search,
        searcher,
        handleBlur,
        noSearch,
        colors,
        handleDarkMode,
        darkModeEnabled,
        handleUri,
        handleSubmit,
        handleLogin,
        inputValidator,
        username,
        password,
        uri,
        cameraLauncher,
        imageLibraryLauncher,
        handleProfileEdit,
      }}
    >
      {children}
    </Database.Provider>
  );
};

export default Context;

export { Database };
