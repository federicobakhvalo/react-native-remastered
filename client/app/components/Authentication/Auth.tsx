import React, { FC, useContext, useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

import CustomButton from "../../ui/CustomButton";

import AuthFields from "./AuthFields";
import { AuthContext } from "../../providers/AuthProvider";
import { AuthForm } from "../../types/interfaces";
import { validateAuthForm } from "../../api/auth/auth.service";
const Auth: FC = () => {
  const [IsReg, SetIsReg] = useState<boolean>(false);
  const { AuthData, SetAuthData } = useContext(AuthContext);

  const onSubmit = (data: AuthForm) => {
    const validation = validateAuthForm(data, IsReg);

    if (validation !== true) {
      console.log(validation);
      SetAuthData((prev) => ({
        ...prev,
        error: validation,
      }));
      return;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          ...styles.flex,
          gap: 10,

          width: "100%",
        }}
      >
        <>
          <MaterialIcons
            name={IsReg ? "person-add" : "login"}
            size={38}
            color="white"
          />
          <Text style={styles.HugeText}>{IsReg ? "Sign Up" : "Login"}</Text>
        </>
      </View>

      <AuthFields isReg={IsReg} />

      <CustomButton
        classname="authorization"
        onPress={() => {
          onSubmit(AuthData);
        }}
      >
        {IsReg ? "Sign up" : "Login"}
      </CustomButton>
      <Pressable
        onPress={() => {
          SetIsReg(!IsReg);
        }}
      >
        <Text
          style={{
            margin: 5,
            color: "white",
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          {IsReg ? "Do you have account? " : "Don't have account ? "}
          <Text style={{ color: "#71d444" }}>
            {IsReg ? "Login" : "Register"}
          </Text>
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",

    flexDirection: "column",

    padding: 20,
  },
  HugeText: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
  },

  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 5,
  },
});
