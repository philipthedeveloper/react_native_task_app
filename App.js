import React from "react";
import { SafeAreaView } from "react-native";
import {
  Home,
  Task,
  Login,
  Splash,
  SignUp,
  Profile,
  ForgotPassword,
} from "./screens/index";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Context from "./constants/context";
import { CustomDrawerContent } from "./components";
import Ionicons from "react-native-vector-icons/Ionicons";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer({ route }) {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#10264a",
        drawerInactiveBackgroundColor: "lightblue",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#10264a",
        drawerItemStyle: { borderRadius: 10, marginTop: 15 },
        drawerLabelStyle: {
          fontSize: 16,
          marginLeft: -10,
          fontFamily: "regular",
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      useLegacyImplementation={true}
    >
      <Drawer.Screen
        name="First"
        component={Home}
        options={{
          drawerLabel: "Home",
          drawerIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Tasks"
        component={Task}
        options={{
          drawerLabel: "Add Task",
          drawerIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "add-circle" : "add-circle-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerLabel: "Edit Profile",
          drawerIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "person-circle" : "person-circle-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [loaded, error] = useFonts({
    regular: require("./assets/fonts/Abel-Regular.ttf"),
    medium: require("./assets/fonts/Comfortaa-Medium.ttf"),
    bold: require("./assets/fonts/Comfortaa-Bold.ttf"),
    comfortaa: require("./assets/fonts/Comfortaa-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Context>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{ title: null, headerShown: false }}
          >
            <Stack.Screen name="Home" component={MyDrawer} />
            <Stack.Screen name="Task" component={Task} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          </Stack.Navigator>
        </Context>
      </NavigationContainer>
    </SafeAreaView>
  );
}
