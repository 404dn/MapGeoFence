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

function EventLogScreen({ navigation }) {
  const { activityLog } = useGeofenceActivity();

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.header}>Geofence Events Log</Text>
        </View>

        <FlatList
          data={activityLog}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.logEntry}>
              <Text>Geofence {item.index}</Text>
              <Text>{item.status === "enter" ? "Entered" : "Exited"}</Text>
              <Text>Time: {item.time.toString()}</Text>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
