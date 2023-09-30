import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogInScreen from "./src/components/LoginScreen";
import MenuScreen from "./src/components/MenuScreen";
import EventLogScreen from "./src/components/EvenLogScreen";
import { LanguageProvider } from "./src/services/LanguageContext";
import { GeofenceProvider } from "./src/services/GeofenceContext";
import { GeofenceActivityProvider } from "../MapGeofence/src/services/GeoFenceActivityContext";

import GeofenceScreen from "./src/components/GeoFenceScreen";
import MapScreen from "./src/components/MapScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <LanguageProvider>
      <NavigationContainer>
        <GeofenceProvider>
          <GeofenceActivityProvider>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {/* <Stack.Screen name="LogIn" component={LogInScreen} /> */}
              <Stack.Screen name="Menu" component={MenuScreen} />
              <Stack.Screen name="Geofence" component={GeofenceScreen} />
              <Stack.Screen name="MapScreen" component={MapScreen} />
              <Stack.Screen name="LogScreen" component={EventLogScreen} />
            </Stack.Navigator>
          </GeofenceActivityProvider>
        </GeofenceProvider>
      </NavigationContainer>
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "red",
  },
});
