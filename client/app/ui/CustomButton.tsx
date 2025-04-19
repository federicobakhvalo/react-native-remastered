import React, { FC, PropsWithChildren } from "react";
import { Pressable, View, Text, StyleSheet, Dimensions } from "react-native";
import { Button } from "../types/interfaces";
import { ButtonStyles } from "../types/styles";

const CustomButton: FC<PropsWithChildren<Button>> = ({
  children,
  classname,
  style,
  ...rest
}) => {
  return (
    <Pressable style={[styles.btn, style]} {...rest}>
      <Text style={{ fontSize: ButtonStyles?.authorization?.fontSize }}>
        {children}
      </Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 4,
    paddingVertical: 10,
    backgroundColor: "white",
    color: "black",
    borderRadius: 12,

    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
});
