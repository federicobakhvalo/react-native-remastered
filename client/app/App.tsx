import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CustomNavigation from "./navigation/CustomNavigation";
import AuthProvider from "./providers/AuthProvider";

export default function App() {
  return (
    <>
      <View style={{ flex: 1, backgroundColor: "#181818" }}>
        <AuthProvider>
          <SafeAreaProvider>
            <CustomNavigation />
          </SafeAreaProvider>
          <StatusBar style="dark" />
        </AuthProvider>
      </View>
    </>
  );
}
