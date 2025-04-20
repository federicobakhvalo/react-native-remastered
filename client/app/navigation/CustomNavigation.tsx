import {
  NavigationContainer,
  Theme,
  useNavigationContainerRef,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { FC, useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { RootParamList } from "./navigation";
import { routes } from "./routes";
import AuthProvider, { AuthContext } from "../providers/AuthProvider";
import Auth from "../components/Authentication/Auth";
import BottomMenu from "../ui/bottom_menu/BottomMenu";
import { SERVER_URL } from "../config/api.config";
import { useCheckAuth } from "../providers/useCheckAuth";

const Stack = createNativeStackNavigator<RootParamList>();

const CustomNavigation: FC = () => {
  const { user } = useContext(AuthContext);
  const [currentRoute, setCurrentRoute] = useState<string | undefined>(
    undefined
  );
  const navRef = useNavigationContainerRef();

  useEffect(() => {
    setCurrentRoute(navRef.getCurrentRoute()?.name);
    const listener = navRef.addListener("state", () =>
      setCurrentRoute(navRef.getCurrentRoute()?.name)
    );

    return () => {
      navRef.removeListener("state", listener);
    };
  }, []);

  useCheckAuth(currentRoute);

  return (
    <>
      <NavigationContainer ref={navRef}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "#181818",
            },
          }}
        >
          {user ? (
            <>
              {routes.map((route, key) => (
                <Stack.Screen key={route.name} {...route}></Stack.Screen>
              ))}
            </>
          ) : (
            <>
              <Stack.Screen name="Auth" component={Auth}></Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      {user && currentRoute && (
        <BottomMenu currentRoute={currentRoute} nav={navRef.navigate} />
      )}
    </>
  );
};

export default CustomNavigation;
