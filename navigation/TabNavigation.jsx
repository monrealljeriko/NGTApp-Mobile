import React from "react";
import { Home, Loans, Credit } from "../app/index";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "../app/component/TabBar/";

const BottomTab = createBottomTabNavigator();

function TabNavigation() {
   return (
      <BottomTab.Navigator
         screenOptions={{ headerShown: false }}
         tabBar={(props) => <TabBar {...props} />}
      >
         <BottomTab.Screen
            name="Home"
            component={Home}
            options={{
               tabBarIconName: "home",
               tabBarLabel: "Home",
            }}
         />
         <BottomTab.Screen
            name="Loans"
            component={Loans}
            options={{
               tabBarIconName: "albums",
               tabBarLabel: "Loans",
            }}
         />
         <BottomTab.Screen
            name="Credit"
            component={Credit}
            options={{
               tabBarIconName: "timer",
               tabBarLabel: "Credit",
            }}
         />
      </BottomTab.Navigator>
   );
}

export default TabNavigation;
