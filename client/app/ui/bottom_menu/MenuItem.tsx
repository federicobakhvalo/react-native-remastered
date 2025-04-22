import React, { FC } from "react";
import { View, Text, Pressable, ViewStyle, StyleSheet } from "react-native";
import { ImenuItem, TypeNavigate } from "./menu.interface";
import { Feather } from "@expo/vector-icons";

interface MenuProps {
  item: ImenuItem;
  nav: TypeNavigate;
  currentRoute?: string;

  style?: ViewStyle;
}

const MenuItem: FC<MenuProps> = ({ item, nav, currentRoute, style }) => {
  const isActive = currentRoute === item.path;
  return (
    <>
      <Pressable
        onPress={() => {
          nav(item.path, item.params);
        }}
        style={[styles.menuitem, style]}
      >
        <Feather
          name={item.icon}
          size={26}
          color={isActive ? "#91ff96" : "rgb(255, 255, 255)"}
        />
      </Pressable>
    </>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  menuitem: {},
});
