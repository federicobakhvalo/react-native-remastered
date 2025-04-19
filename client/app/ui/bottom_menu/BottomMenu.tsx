import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TypeNavigate } from "./menu.interface";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { menuItems } from "./menu.data";
import MenuItem from "./MenuItem";

interface IBottomMenu {
  currentRoute?: string;
  nav: TypeNavigate;
}

const BottomMenu: FC<IBottomMenu> = (props) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={styles.shadowContainer}>
      <View style={styles.menuContainer}>
        {menuItems.map((item, key) => (
          <MenuItem key={key} item={item} {...props} />
        ))}
      </View>
    </View>
  );
};

export default BottomMenu;

// const styles = StyleSheet.create({
//   bottomView: {
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     width: "100%",
//     backgroundColor: "#161616",
//     paddingVertical: 10,
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12,
//     borderTopColor: "#737373d9",
//     borderTopWidth: 2,
//   },
// });

const styles = StyleSheet.create({
  shadowContainer: {
    paddingTop: 1, // высота "границы"
    backgroundColor: "#73737345", // цвет "границы"
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },

  menuContainer: {
    backgroundColor: "#161616", // цвет меню
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
