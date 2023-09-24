import { View, Text } from "react-native";
import React from "react";
import { Home, Loans, Credit } from "../app/index";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const BottomTab = createBottomTabNavigator();

function TabNavigation() {
    return (
        <BottomTab.Navigator>
            <BottomTab.Screen name="Home" component={Home} />
            <BottomTab.Screen name="Loans" component={Loans} />
            <BottomTab.Screen name="Credit" component={Credit} />
        </BottomTab.Navigator>
    );
}

export default TabNavigation;
