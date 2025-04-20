import React, { FC, useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { InputAuthProps } from "../types/interfaces";

const InputTextField: FC<InputAuthProps> = ({
  value,
  onChange,
  error,
  label,
  secureTextEntry,
  style,
  placeholder,
  classname,
  icon,
}) => {
  const [Secure, SetSecure] = useState<boolean | undefined>(secureTextEntry);

  return (
    <>
      <View style={styles.container}>
        {icon && label?.includes("password") && (
          <Pressable
            onPress={() => {
              SetSecure(!Secure);
            }}
            style={{
              position: "absolute",
              zIndex: 2,
              right: 5,
            }}
          >
            {icon}
          </Pressable>
        )}
        {/* Поле ввода */}
        <TextInput
          style={[
            styles.input,
            error?.field === label && styles.errorInput,
            style,
          ]} // добавляем стиль для ошибки
          value={value}
          onChangeText={onChange}
          secureTextEntry={Secure}
          placeholder={placeholder}
          placeholderTextColor={"#e8e8e8f7"}
        ></TextInput>

        {error?.field === label && error?.message && (
          <Text style={{ ...styles.errorText }}>{error.message}</Text>
        )}

        {/* Отображение ошибки, если она есть */}
        {/* {error && <Text style={styles.errorText}>{error}</Text>} */}
      </View>
    </>
  );
};
export default InputTextField;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    position: "relative",
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8, // отступ от метки до поля ввода
    color: "#333",
  },
  input: {
    paddingHorizontal: 12,
    paddingRight: 15,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#62626296",
    borderRadius: 12,
    fontSize: 16,

    color: "white",
    backgroundColor: "#212121",
    position: "relative",
    flexGrow: 1,
    width: "100%",
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 2,
    textAlign: "center",
  },
});
