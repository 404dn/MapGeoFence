import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  TextInput,
  Image,
} from "react-native";
import { USER_NAME, PASSWORD } from "@env";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTranslation } from "react-i18next";
import { useLanguage } from "../services/LanguageContext";

function LogInScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleContinuePress = () => {
    if (username === USER_NAME && password === PASSWORD) {
      navigation.navigate("Menu");
    } else {
      console.log("Login Failed");
    }
  };
  const [active, toggleLanguage] = useLanguage();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.imgView}>
          <Image
            style={styles.img}
            source={require("../../assets/location.png")}
          />
        </View>
        <View style={styles.fieldContainer}>
          <TextInput
            style={styles.Textfield}
            placeholder={t("Username")}
            placeholderTextColor="#888"
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            style={styles.Textfield}
            placeholder={t("Password")}
            secureTextEntry={true}
            placeholderTextColor="#888"
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles.btnContaier}>
          <TouchableOpacity style={styles.btn} onPress={handleContinuePress}>
            <Text style={styles.btnText}>{t("Continue")}</Text>
          </TouchableOpacity>
          <View style={styles.SwitchView}>
            <Text style={styles.switchText}>AR</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#767577" }}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleLanguage}
              value={active}
              style={styles.switch}
            />
            <Text style={styles.switchText}>EN</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161616",
  },
  img: {
    marginTop: "20%",
  },
  SwitchView: {
    flexDirection: "row",
    marginTop: 50,
  },
  Textfield: {
    margin: 10,
    borderColor: "rgba(255, 255, 255, 0.4)",
    borderWidth: 3,
    borderRadius: 20,
    width: "75%",
    height: "17%",
    paddingLeft: 10,
    paddingRight: 10,
    color: "#FFFFFF",
    backgroundColor: "#444444",
  },
  switch: {
    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
    alignSelf: "center",
  },
  switchText: {
    marginHorizontal: 20,
    fontSize: 20,
    color: "rgba(255, 255, 255, 1)",
    fontWeight: "bold",
  },
  safeArea: {
    flex: 1,
  },
  imgView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnContaier: {
    justifyContent: "center",
    alignItems: "center",
  },
  fieldContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
  },
  btn: {
    borderColor: "rgba(255, 255, 255, 0.4 )",
    borderWidth: 3,
    borderRadius: 30,
    backgroundColor: "#444444",
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
    height: "20%",
  },
  btnText: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default LogInScreen;
