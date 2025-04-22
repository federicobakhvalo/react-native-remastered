import React, { FC, useContext, useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

import CustomButton from "../../ui/CustomButton";

import AuthFields from "./AuthFields";
import { AuthContext } from "../../providers/AuthProvider";
import { AuthForm, Itokens } from "../../types/interfaces";
import {
  AuthService,
  decodeToken,
  validateAuthForm,
} from "../../api/auth/auth.service";
import { saveToStorage } from "../../api/auth/auth.helper";
const Auth: FC = () => {
  const [IsReg, SetIsReg] = useState<boolean>(false);
  const { AuthData, SetAuthData, setUser } = useContext(AuthContext);

  const onSubmit = async (data: AuthForm) => {
    const validation = validateAuthForm(data, IsReg);

    if (validation !== true) {
      SetAuthData((prev) => ({
        ...prev,
        error: validation,
      }));
      return;
    }

    SetAuthData((prev) => ({
      ...prev,
      isLoading: true,
      error: { field: null, message: null },
    }));

    try {
      const response = await AuthService.main(
        IsReg,
        data.login.trim(),
        data.password.trim()
      );
      const tokens = response.data as Itokens;
      if (tokens.access) {
        const user_data = decodeToken(tokens.access);

        await saveToStorage(tokens, user_data);
        setUser(user_data);
      }

      // обработка успешного ответа, например, сохраняем токены
      // или делаем редирект на другой экран
    } catch (error: any) {
      const errorData = error.response.data;
      console.log(errorData);
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
        onPress={async () => {
          await onSubmit(AuthData);
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
