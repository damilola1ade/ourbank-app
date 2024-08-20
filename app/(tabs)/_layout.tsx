import { Tabs } from "expo-router";
import { TabBarIcon } from "@/components/TabBarIcon";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#967ECE",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 1,
          borderTopColor: "#232533",
          
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="Home"
              icon='home-outline'
              color={color}
              focused={focused}
            />
          ),
          
        }}
      />
      <Tabs.Screen
        name="cards"
        options={{
          title: "Cards",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="Cards"
              icon='card-outline'
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="Profile"
              icon='person-circle-outline'
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
