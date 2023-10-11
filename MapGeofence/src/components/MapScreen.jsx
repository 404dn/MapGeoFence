import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Polygon, Marker } from "react-native-maps";
import * as Location from "expo-get-location";

import { useGeofences } from "../services/GeofenceContext";
import { pointInPolygon } from "../services/GeofenceCheck";
import { useTranslation } from "react-i18next";

import {
  GeofenceActivityProvider,
  useGeofenceActivity,
} from "../services/GeoFenceActivityContext";

function MapScreen({ navigation }) {
  const { t } = useTranslation();
  const { geofences, addGeofence, resetGeofences } = useGeofences();
  const [index, setIndex] = useState();
  const [currentUserLocation, setCurrentUserLocation] = useState({});
  const [previousStates, setPreviousStates] = useState([]);
  const [initialRegion, setInitialRegion] = useState({
    latitude: 37.334346,
    longitude: -122.04156,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const { addActivityLogEntry } = useGeofenceActivity();

  const [isEnterModalVisible, setEnterModalVisible] = useState(false);
  const [isExitModalVisible, setExitModalVisible] = useState(false);

  const showEnterModal = () => {
    setEnterModalVisible(true);

    setTimeout(() => {
      setEnterModalVisible(false);
    }, 700);
  };

  const showExitModal = () => {
    setExitModalVisible(true);
    setTimeout(() => {
      setExitModalVisible(false);
    }, 700);
  };

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }

      const fetchLocation = async () => {
        try {
          const currentLocation = await Location.getCurrentPositionAsync();

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
        } catch (error) {
          console.error("Error fetching location:", error);
        }
      };
      fetchLocation();

      const locationInterval = setInterval(fetchLocation, 2000);

      return () => {
        clearInterval(locationInterval);
      };
    };
    getPermissions();
  }, []);

  useEffect(() => {
    geofences.forEach((geofence, index) => {
      const isInsidePolygon = pointInPolygon(currentUserLocation, geofence);
      const prevState = previousStates[index] || false;

      if (isInsidePolygon !== prevState) {
        if (isInsidePolygon) {
          const enterTime = new Date();
          console.log(`Point entered geofence ${index + 1} at ${enterTime}`);
          addActivityLogEntry({
            index: index + 1,
            status: "enter",
            time: enterTime,
          });
          setIndex(index);
          showEnterModal();
        } else {
          const exitTime = new Date();
          console.log(`Point exited geofence ${index + 1} at ${exitTime}`);
          addActivityLogEntry({
            index: index + 1,
            status: "exit",
            time: exitTime,
          });
          showExitModal();
        }
        previousStates[index] = isInsidePolygon;
        setPreviousStates([...previousStates]);
      }
    });
  }, [currentUserLocation, geofences, previousStates, addActivityLogEntry]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.MapView}>
          <MapView style={styles.map} initialRegion={initialRegion}>
            {currentUserLocation !== null && (
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
          </MapView>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>{t("Back")}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isEnterModalVisible}
        onRequestClose={() => {
          setEnterModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            {t("Entered")} {index}
          </Text>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isExitModalVisible}
        onRequestClose={() => {
          setExitModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            {t("Exited")} {index}
          </Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161616",
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: "#ACACACr",
    borderWidth: 2,
    width: "20%",
  },
  MapView: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  map: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalText: {
    fontSize: 24,
    color: "white",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#333",
  },
});

export default MapScreen;
