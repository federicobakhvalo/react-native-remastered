import React, { FC, useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import Button from "../../ui/CustomButton";
import CustomButton from "../../ui/CustomButton";
import InputTextField from "../../ui/InputTextField";
const Auth: FC = () => {
  const [IsReg, SetIsReg] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

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
      <View style={styles.flex}>
        <MaterialIcons name="email" size={20} color="white" />
        <InputTextField
          label="Email"
          value={email}
          onChange={setEmail}
          error={error}
          placeholder="Enter your email"
        />
      </View>
      <View style={styles.flex}>
        <MaterialIcons name="lock" size={20} color="white" />
        <InputTextField
          label="password"
          value={password}
          onChange={setPassword}
          error={error}
          secureTextEntry={true}
          placeholder="Enter your password"
        />
      </View>
      {IsReg && (
        <View style={styles.flex}>
          <MaterialIcons name="lock" size={20} color="white" />
          <InputTextField
            label="password"
            value={repeatPassword}
            onChange={setRepeatPassword}
            error={error}
            secureTextEntry={true}
            placeholder="Repeat your password"
          />
        </View>
      )}

      <CustomButton classname="authorization" onPress={() => {}}>
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
