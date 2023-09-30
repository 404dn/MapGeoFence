import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  TextInput,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTranslation } from "react-i18next";

function MenuScreen({ navigation }) {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.viewsView}>
          <View style={styles.imgView}>
            <Image
              style={styles.img}
              source={require("../../assets/location.png")}
            />
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                navigation.navigate("MapScreen");
              }}
            >
              <View style={styles.imgBtnView}>
                <Image
                  style={{
                    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
                  }}
                  source={require("../../assets/Vector.png")}
                />
                <Text style={styles.btnText}>{t("Map")}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                navigation.navigate("Geofence");
              }}
            >
              <View style={styles.imgBtnView}>
                <Image
                  style={{
                    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
                  }}
                  source={require("../../assets/pin.png")}
                />
                <Text style={styles.btnText}>{t("Geofence")}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("LogScreen");
              }}
              style={styles.btn}
            >
              <View style={styles.imgBtnView}>
                <Image
                  style={{
                    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
                  }}
                  source={require("../../assets/Document.png")}
                />
                <Text style={styles.btnText}>{t("Report")}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn}>
              <View style={styles.imgBtnView}>
                <Image
                  style={{
                    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
                  }}
                  source={require("../../assets/Settings.png")}
                />
                <Text style={styles.btnText}>{t("Settings")}</Text>
              </View>
            </TouchableOpacity>
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
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    borderTopColor: "rgba(255, 255, 255, 0.4 )",
    borderRightColor: "rgba(255, 255, 255, 0.4 )",
    borderTopWidth: 2,
    borderRightWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 1,
    width: "45%",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: "#444444",
  },
  imgView: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  safeArea: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
  },
  viewsView: {
    justifyContent: "center",
    alignItems: "center",
    bottom: "10%",
  },
  imgBtnView: {
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default MenuScreen;
