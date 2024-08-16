import { View, Text } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TabIconProps } from "@/types";

export const TabBarIcon = ({
  icon,
  color,
  name,
  focused,
}: TabIconProps) => {
  return (
    <View className="items-center justify-center gap-2 mt-1">
      <Ionicons name={icon} size={18} color={color} />
      <Text
        className={`${
          focused ? "font-psemibold" : "font-pregular"
        } text-white text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};
