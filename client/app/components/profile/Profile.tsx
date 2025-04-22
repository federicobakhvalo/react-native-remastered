import React, { FC, useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useTypedRoute } from "../../navigation/useTypedRoute";
import Layout from "../screens/layout/Layout";
import { User } from "../../types/interfaces";

const Profile: FC = () => {
  const route = useTypedRoute<"Profile">();
  const { id, isMine } = route.params;

  return (
    <>
      <Layout>
        <View>
          <Text></Text>
        </View>
      </Layout>
    </>
  );
};

export default Profile;
