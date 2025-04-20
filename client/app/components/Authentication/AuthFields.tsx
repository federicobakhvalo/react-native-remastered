import React, { FC, useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputTextField from "../../ui/InputTextField";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../../providers/AuthProvider";
import { AuthFormData } from "../../types/interfaces";

type isReg = {
  isReg: boolean;
};

const AuthFields: FC<isReg> = ({ isReg = false }) => {
  const { AuthData, SetAuthData } = useContext(AuthContext);
  const handleChange = (field: keyof AuthFormData, text: string) => {
    SetAuthData((prev) => ({
      ...prev,
      [field]: text,
      error: { ...prev.error, field: null, message: null },
    }));
  };

  return (
    <>
      <View style={styles.flex}>
        <MaterialIcons name="email" size={20} color="white" />
        <InputTextField
          label="login"
          value={AuthData.login}
          onChange={(text) => {
            handleChange("login", text);
          }}
          error={AuthData.error}
          placeholder={`Enter your email${!isReg ? " or username" : ""}`}
        />
      </View>
      <View style={styles.flex}>
        <MaterialIcons name="lock" size={20} color="white" />
        <InputTextField
          label="password"
          value={AuthData.password}
          onChange={(text) => {
            handleChange("password", text);
          }}
          error={AuthData.error}
          secureTextEntry={true}
          placeholder="Enter your password"
        />
      </View>
      {isReg && (
        <View style={styles.flex}>
          <MaterialIcons name="lock" size={20} color="white" />
          <InputTextField
            label="repeat_password"
            value={AuthData?.repeat_password}
            onChange={(text) => {
              handleChange("repeat_password", text);
            }}
            error={AuthData.error}
            secureTextEntry={true}
            placeholder="Repeat your password"
          />
        </View>
      )}
    </>
  );
};

export default AuthFields;

const styles = StyleSheet.create({
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 5,
  },
});
