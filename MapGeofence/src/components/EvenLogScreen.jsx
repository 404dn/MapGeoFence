// EventLogScreen.js

import React, { useState } from "react";
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
  const [sortedLog, setSortedLog] = useState(activityLog);

  const sortLogByDate = () => {
    const sorted = [...activityLog].sort((a, b) => b.time - a.time);
    setSortedLog(sorted);
  };

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
          <TouchableOpacity style={styles.sortButton} onPress={sortLogByDate}>
            <Text style={styles.buttonText}>{t("Sort")}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.flatlistView}>
          <FlatList
            style={styles.list}
            data={sortedLog}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.logEntry}>
                <Text>
                  {t("Geofence")} {item.index}
                </Text>
                <Text>{item.status === "enter" ? "Entered" : "Exited"}</Text>
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
    alignContent: "center",
  },
  list: {
    marginTop: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    top: 20,
  },
  buttonText: {
    fontSize: 13,
    textAlign: "center",
  },
  backButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: "#ACACAC",
    borderWidth: 2,
    width: "15%",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    marginLeft: 10,
  },
  logEntry: {
    marginBottom: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 8,
  },
  sortButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: "#ACACAC",
    borderWidth: 2,
    marginLeft: 10,
  },
});

export default EventLogScreen;
