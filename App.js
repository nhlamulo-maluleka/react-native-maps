import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Image, View, ListView } from "react-native";
import MapView, { Circle, MAP_TYPES, Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function App() {
  const [location, setLocation] = useState({
    latitude: -26.0956759,
    longitude: 28.0083029,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  // AIzaSyBXMOZrGAPf6q1tmFJWO0R4LTC9iJ02cQg
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{
          key: "AIzaSyBXMOZrGAPf6q1tmFJWO0R4LTC9iJ02cQg",
          language: "en",
        }}
        styles={{
          container: {
            flex: 0,
            position: "relative",
            width: "100%",
            backgroundColor: "#000",
          },
          listView: {
            backgroundColor: "white",
          },
        }}
      />

      <MapView
        provider={"google"}
        zoomEnabled={true}
        zoomControlEnabled={true}
        showsUserLocation={true}
        userInterfaceStyle="dark"
        region={location}
        style={styles.map}
        customMapStyle={MAP_TYPES.TERRAIN}
        userLocationPriority={"high"}
        showsMyLocationButton={true}
        showsCompass={true}
        showsTraffic={true}
        showsScale={true}
        showsBuildings={true}
        onUserLocationChange={(loc) => {
          console.log(loc);
        }}
      >
        <Marker
          coordinate={location}
          title="Silas"
          description="This is silas's current location..."
          draggable={true}
          onDragStart={(e) => {
            console.log("Dragging marker...");
          }}
          onDragEnd={({
            nativeEvent: {
              coordinate: { latitude, longitude },
            },
          }) => {
            // console.log(e.nativeEvent);
            setLocation({
              latitude: latitude,
              longitude: longitude,
            });
          }}
        >
          <Image
            style={{ width: 30, height: 30 }}
            source={require("./assets/point.png")}
          />
        </Marker>
        <Circle center={location} radius={1000} fillColor={"transparent"} />
      </MapView>
      {/* <StatusBar /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  // container: ,
  map: {
    width: "100%",
    height: "100%",
  },
});
