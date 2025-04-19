import React, { FC } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Loader: FC = () => {
  return (
    <View>
      <ActivityIndicator size="large" color="#fafafa" />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  //   container: {
  //     ...StyleSheet.absoluteFillObject,
  //     justifyContent: "center",
  //     alignItems: "center",
  //     backgroundColor: "rgba(0,0,0,0.2)", // затемнение
  //     zIndex: 9999,
  //   },
});
