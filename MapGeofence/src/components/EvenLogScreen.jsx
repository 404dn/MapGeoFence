import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useGeofenceActivity } from "../services/GeoFenceActivityContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

function EventLogScreen({ navigation }) {
  const { activityLog } = useGeofenceActivity();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safearea}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>{t("Back")}</Text>
          </TouchableOpacity>
          <Text style={styles.header}>{t("Geofence Events Log")}</Text>
        </View>
        <View style={styles.flatlistView}>
          <FlatList
            style={styles.list}
            data={activityLog}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.logEntry}>
                <Text>
                  {t(" Geofence ")}
                  {item.index}
                </Text>
                <Text>
                  {item.status === t("Enter") ? t("Entered") : t("Exited")}
                </Text>
                <Text>Time: {item.time.toString()}</Text>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlistView: {
    marginTop: 20,
  },
  safearea: {
    flex: 1,
  },
  list: {
    marginTop: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    top: 20,
    left: 20,
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
  },
  backButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: "#ACACAC",
    borderWidth: 2,
    width: "20%",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginLeft: 10, // Add some left margin to separate the button and text
  },
  logEntry: {
    marginBottom: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 8,
  },
});

export default EventLogScreen;
