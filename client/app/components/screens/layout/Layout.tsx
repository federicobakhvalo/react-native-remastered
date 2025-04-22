import { FC, PropsWithChildren } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ILayout {
  showHeader?: boolean;
  className?: string;
}

const Layout: FC<PropsWithChildren<ILayout>> = ({
  children,
  showHeader = false,
  className,
}) => {
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
    </SafeAreaView>
  );
};

export default Layout;
