import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Polygon, Marker } from "react-native-maps";
import * as Location from "expo-get-location";
import { useGeofences } from "../services/GeofenceContext";
import { useTranslation } from "react-i18next";

function GeofenceScreen({ navigation }) {
  const { t } = useTranslation();
  const { geofences, addGeofence, resetGeofences } = useGeofences();
  const [currentUserLocation, setCurrentUserLocation] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [initialRegion, setInitialRegion] = useState({
    latitude: 37.334346,
    longitude: -122.04156,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});

      setCurrentUserLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
      const userRegion = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setInitialRegion(userRegion);
    };
    getPermissions();
  }, []);

  const handleMapPress = (event) => {
    if (isDrawing) {
      const newCoordinates = [
        ...polygonCoordinates,
        event.nativeEvent.coordinate,
      ];
      setPolygonCoordinates(newCoordinates);
    }
  };

  const toggleDrawing = () => {
    console.log("Toggle drawing", isDrawing);
    setIsDrawing(!isDrawing);
    console.log("Toggle drawing2", isDrawing);
    if (isDrawing && polygonCoordinates.length > 0) {
      const closedPolygon = [...polygonCoordinates, polygonCoordinates[0]];
      addGeofence(closedPolygon);
      setPolygonCoordinates([]);
    }
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.MapView}>
          <MapView
            style={styles.map}
            initialRegion={initialRegion}
            onPress={handleMapPress}
          >
            {currentUserLocation && (
              <Marker
                coordinate={{
                  latitude: currentUserLocation.latitude,
                  longitude: currentUserLocation.longitude,
                }}
                title="Your Location"
                pinColor="red"
              />
            )}
            {geofences.map((coords, index) => (
              <Polygon
                key={index}
                coordinates={coords}
                fillColor="rgba(0,200,0,0.5)"
                strokeColor="rgba(0,0,200,0.5)"
                strokeWidth={2}
              />
            ))}
            {polygonCoordinates.length > 0 && (
              <Polygon
                coordinates={polygonCoordinates}
                fillColor="rgba(0,200,0,0.5)"
                strokeColor="rgba(0,0,200,0.5)"
                strokeWidth={2}
              />
            )}
          </MapView>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>{t("Back")}</Text>
          </TouchableOpacity>
          <View style={styles.btnView}>
            <TouchableOpacity
              style={styles.customButton}
              onPress={toggleDrawing}
            >
              <Text style={styles.buttonText}>
                {isDrawing ? t("Stop Drawing") : t("Start Drawing")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.customButton}
              onPress={resetGeofences}
            >
              <Text style={styles.buttonText}>{t("Reset Geofences")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
    width: "20%",
  },

  container: {
    flex: 1,
    backgroundColor: "#161616",
  },
  safeArea: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  MapView: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  customButton: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
  },
  btnView: {
    width: "90%",
    borderRadius: 10,
    alignSelf: "center",
    bottom: "15%",
  },
});

export default GeofenceScreen;
