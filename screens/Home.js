import React, { useState, useContext, useEffect } from "react";
import { View, FlatList, StatusBar, Alert, Text } from "react-native";
import { Header, Card, Background } from "../components/index";
import { AddTask } from "../components/Button";
import { Database } from "../constants/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({ navigation }) => {
  const { tasks, search, noSearch, username, colors } = useContext(Database);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={"#10264a"}
        translucent={true}
        barStyle="light-content"
      />
      <Background />
      <Header username={username} />
      {noSearch ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              fontFamily: "regular",
              fontSize: 20,
              textAlign: "center",
              color: colors.textColor,
            }}
          >
            {`❌ \n\n No Result Found!`}
          </Text>
        </View>
      ) : (
        <FlatList
          data={search.length == 0 ? tasks : search}
          keyExtractor={(data, i) => i.toString()}
          renderItem={({ item }) => <Card {...item} />}
          style={{ marginBottom: 65 }}
          showsVerticalScrollIndicator={false}
        />
      )}
      <AddTask />
    </View>
  );
};

export default Home;
